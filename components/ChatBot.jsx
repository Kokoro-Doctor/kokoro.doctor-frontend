import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  TextInput,
  Keyboard,
  Text,
  FlatList,
  Animated,
  Dimensions,
  Pressable
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker as RNPickerSelect } from '@react-native-picker/picker';
import { useChatbot } from '../contexts/ChatbotContext';
import * as Speech from 'expo-speech';
import { getCurrentUser } from '../utils/AuthService';

const { width } = Dimensions.get("window");

const ChatBot = () => {
    const { chatbotConfig, isChatExpanded, setIsChatExpanded } = useChatbot();
    const [userId, setUserId] = useState("dummy_user@gmail.com"); 
    const [messages, setMessages] = useState([{ sender: 'bot', text: "Hello, How may I help you today?" }]); 
    const [userMessage, setUserMessage] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const [playingMessage, setPlayingMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const typingDots = new Animated.Value(0);
    const [typingText, setTypingText] = useState(".");
    
    // Fetch User
    const fetchUser = async () => {
        const user = await getCurrentUser();
        if(user){
            setUserId(loggedInUser.email);
        }
    };
    
    // useEffect to fetch user
    useEffect(
        useCallback(() => {
            fetchUser();
        }, [])
    );

    // Loading Typing animation
    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setTypingText(prev => (prev === "." ? ".." : prev === ".." ? "..." : "."));
            }, 500); // Change every 500ms

            return () => clearInterval(interval);
        }
    }, [isLoading]);

    const sendMessageToBot = async () => {
        if (!userMessage.trim()) return;
        const messageToSend = userMessage;
        setUserMessage("");
    
        setMessages(prevMessages => [
            ...prevMessages,
            { sender: 'user', text: messageToSend }
        ]);
        setIsLoading(true);
    
        try {
            const response = await fetch("http://127.0.0.1:5000/chat/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({user_id:userId, message: messageToSend, language: selectedLanguage }),
            })
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
            const botReply = await response.json(); 
    
            setMessages(prevMessages => {
                const updatedMessages = [...prevMessages, { sender: 'bot', text: botReply.text }];
                const newMessageIndex = updatedMessages.length - 1; // Get the index of the latest bot message
                setPlayingMessage(newMessageIndex); // Set playingMessage to the new message index
                Speech.speak(botReply.text, {
                    language: selectedLanguage,
                    onDone: () => setPlayingMessage(null),
                    onStopped: () => setPlayingMessage(null),
                });
                return updatedMessages;
            });
    
        } catch (error) {
            console.error("Error communicating with Bot:", error);
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'bot', text: (error).message },
            ]);
        }
        
        setIsLoading(false);
        Keyboard.dismiss();
    }; 
    
    const getChatHistory = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/chat/history/${userId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
            const botReply = await response.json(); 
    
            console.log(botReply);
    
        } catch (error) {
            console.error("Error communicating with Bot:", error);
        }
    };
    
    const toggleTTS = (index, text) => {
        if (playingMessage === index) {
            Speech.stop();
            setPlayingMessage(null);
        } else {
            Speech.speak(text, {
                language: selectedLanguage,
                onDone: () => setPlayingMessage(null),
                onStopped: () => setPlayingMessage(null)
            });
            setPlayingMessage(index);
        }
    };
    
    const renderItem = ({ item, index }) => {
        if (isLoading && index === messages.length) {
            return (
                <View style={[styles.messageContainer, styles.botMessage]}>
                    <Image source={require("../assets/Images/NewLogo.png")} style={styles.avatar} />
                    <View style={styles.botMessageBox}>
                        <Animated.Text style={styles.typingDots}>{typingText}</Animated.Text>
                    </View>
                </View>
            );
        }
    
        return (
            <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
                <Image 
                    source={item.sender === 'user' ? require("../assets/Images/user-icon.jpg") : require("../assets/Images/NewLogo.png")}
                    style={styles.avatar}
                />
                <View style={item.sender === 'user' ? styles.userMessageBox : styles.botMessageBox}>
                    <Text style={item.sender === 'user' ? styles.userMessageText : styles.botMessageText}>{item.text}</Text>
                    {item.sender === 'bot' && !isLoading && ( 
                        <View style={styles.botIcons}>
                            <TouchableOpacity onPress={() => toggleTTS(index, item.text)}>
                                <MaterialIcons name={playingMessage === index ? "pause" : "volume-up"} size={16} color="gray" />
                            </TouchableOpacity>
                            <TouchableOpacity><MaterialIcons name="thumb-up" size={16} color="gray" /></TouchableOpacity>
                            <TouchableOpacity><MaterialIcons name="thumb-down" size={16} color="gray" /></TouchableOpacity>
                            <TouchableOpacity><MaterialIcons name="share" size={16} color="gray" /></TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        );
    };  
    
    const handleFocus = () => {
        setIsChatExpanded(true);
    };

    const handleBlur = () => {
        setIsChatExpanded(false);
        Keyboard.dismiss();
    };
    
    return (
        <View style={[styles.chatContainer, { height: isChatExpanded ? (chatbotConfig.height || "50%") : "10%", left: chatbotConfig.left || "17%" }]}>           
        {isChatExpanded && (
        <>
            <View style={styles.languageSelector}>
                <Text style={{alignSelf:"center"}}>Select the language in which you want to chat: </Text>
                <RNPickerSelect
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue) => {
                        console.log(itemValue);
                        setSelectedLanguage(itemValue)}}
                    style={styles.picker}>
                    <RNPickerSelect.Item label="English" value="en" />
                    <RNPickerSelect.Item label="Hindi" value="hi" />
                    <RNPickerSelect.Item label="Spanish" value="es" />
                    <RNPickerSelect.Item label="Telugu" value="te" />
                </RNPickerSelect>
                <Pressable onPress={() => handleBlur()} style={styles.closeIcon}>
                    <MaterialIcons name="cancel" size={32} color="#9c3535" />
                </Pressable>
            </View>           
            <FlatList
                data={isLoading ? [...messages, { sender: 'bot', text: "" }] : messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.messageList}
            />
        </>
        )}

        <View style={styles.chatBox}>
            <TouchableOpacity> 
                <MaterialIcons name="mic" size={24} color="black" style={styles.voiceIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert("Attach Photo")}> 
                <Image source={require("../assets/Icons/photo.png")} style={styles.chatIcon}/>
            </TouchableOpacity>
            <TextInput
                value={userMessage}
                onChangeText={setUserMessage}
                style={styles.input}
                onFocus={handleFocus}
                placeholderTextColor={"#aaa"}
                placeholder="Type your message..."
                onSubmitEditing={sendMessageToBot} 
                enterKeyHint="send"
            />
            <TouchableOpacity onPress={sendMessageToBot}> 
                <Image source={require("../assets/Icons/send.png")} style={styles.sendIcon}/>
            </TouchableOpacity>
        </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    chatContainer: {
        width: width > 1024 ? "80%" : width > 768 ? "70%" : "90%",
        // maxWidth: 1000,
        minWidth: 300,
        borderWidth: 3,
        borderColor: "#6495ed",
        backgroundColor: "#fff",
        position: "absolute",
        left: width > 1024 ? "28%" : width > 768 ? "15%" : "5%", // Center it dynamically
        bottom: 10,
        borderRadius: 15,
        padding: 10,
    },
    messageList: {
        flexGrow: 1,
        paddingBottom: 60,  
    },
    chatBox: {
        height: 50,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        paddingHorizontal: 15,
        backgroundColor: "#f8f8f8",
        borderTopWidth: 1,
        borderColor: "#ccc",
    },
    iconContainer: {
        padding: 5,
    },
    icon: {
        height: 24,
        width: 24,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: "flex-start",
        marginBottom: 10,
        gap: 10,
    },
    botMessage: {
        alignSelf: 'flex-start',
    },
    userMessage: {
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
    },
    userMessageBox: {
        maxWidth: '70%',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "pink",
    },
    botMessageBox: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#f9f9f9",
    },
    userMessageText: {
        fontSize: 14,
        color: "#000",
    },
    botMessageText: {
        fontSize: 14,
        color: "#333",
    },
    botIcons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 5,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 8,
    },
    voiceIcon: {
        height: 25,
        width: 25,
    },
    chatIcon: {
        height: 20,
        width: 20,
    },
    input: {
        flex: 1,
        height: 40,
        width : "60%",
        fontSize: 16,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        ...Platform.select({
            web: { outlineStyle: 'none' },
        }),
    },
    sendIcon: {
        height: 30,
        width: 30,
    },
    languageSelector: {
        flexDirection: "row",
        alignItems: "flex-start",
        alignSelf: "flex-end",
        marginBottom: 10,
        gap: 10,
    },
    languageLabel: {
        fontSize: 16,
        marginRight: 10,
    },
    picker: {
        height: 40,
        width: 150,
    },
    closeIcon: {
        alignSelf: "center",
    },
    typingDots: {
        fontSize: 18,
        letterSpacing: 2,
        color: "#555",
    },
});

export default ChatBot;
