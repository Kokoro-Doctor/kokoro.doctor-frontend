import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  Keyboard,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Speech from "expo-speech";
import { AuthContext } from "../contexts/AuthContext";

const API_URL = "https://mphzlicqj3.execute-api.ap-south-1.amazonaws.com/prod";

const languages = [
  { label: "English (In)", value: "en" },
  { label: "Hindi", value: "hi" },
  { label: "Spanish", value: "es" },
  { label: "Tamil", value: "ta" },
];

const MobileChatbot = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "bot",
      text: "Hello, How may I help you today?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [userId, setUserId] = useState("dummy_user@gmail.com");
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [playingMessage, setPlayingMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [typingText, setTypingText] = useState(".");
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const { user, setUser } = useContext(AuthContext);

  // Set userID
  useEffect(() => {
    if (user) {
      setUserId(user?.email);
    }
  }, [user]);

  // Stop speaking when user refreshes the page
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  //Loading animation
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setTypingText((prev) =>
          prev === "." ? ".." : prev === ".." ? "..." : "."
        );
      }, 500); // Change every 500ms

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const sendMessageToBot = async () => {
    if (!userMessage.trim()) return;
    const messageToSend = userMessage;

    const newMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setUserMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          message: messageToSend,
          language: selectedLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const botReply = await response.json();
      const botMessage = {
        id: Date.now().toString(),
        sender: "bot",
        text: botReply.text || "Sorry, I couldn’t process that.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages(prevMessages => {
          const updatedMessages = [...prevMessages, botMessage];
          const newMessageIndex = updatedMessages.length - 1; // Get the index of the latest bot message
          setPlayingMessage(newMessageIndex); // Set playingMessage to the new message index
          Speech.speak(botReply.text, {
              language: selectedLanguage.value,
              onDone: () => setPlayingMessage(null),
              onStopped: () => setPlayingMessage(null),
          });
          return updatedMessages;
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: error.message,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
      Keyboard.dismiss();
    }
  };

  const getChatHistory = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/chat/history/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const botReply = await response.json();

      // console.log(botReply);
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
        language: selectedLanguage.value,
        onDone: () => setPlayingMessage(null),
        onStopped: () => setPlayingMessage(null),
      });
      setPlayingMessage(index);
    }
  };

  const renderItem = ({ item, index }) => {
    if (isLoading && index === messages.length) {
      return (
        <View style={[styles.messageBubble, styles.botMessage]}>
          <Image
            source={require("../assets/Images/KokoroLogo.png")}
            style={styles.avatar}
          />
          <View style={styles.botMessageBox}>
            <Animated.Text style={styles.typingDots}>
              {typingText}
            </Animated.Text>
          </View>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageBubble,
          item.sender === "bot" ? styles.botMessage : styles.userMessage,
        ]}
      >
        <Image
          source={
            item.sender === "user"
              ? require("../assets/Images/user-icon.jpg")
              : require("../assets/Images/KokoroLogo.png")
          }
          style={styles.avatar}
        />

        <View
          style={
            item.sender === "user"
              ? styles.userMessageBox
              : styles.botMessageBox
          }
        >
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
          {item.sender === "bot" && !isLoading && (
            <View style={styles.botIcons}>
              <Pressable onPress={() => toggleTTS(index, item.text)}>
                <MaterialIcons
                  name={playingMessage === index ? "pause" : "volume-up"}
                  size={16}
                  color="gray"
                />
              </Pressable>
              <Pressable>
                <MaterialIcons name="thumb-up" size={16} color="gray" />
              </Pressable>
              <Pressable>
                <MaterialIcons name="thumb-down" size={16} color="gray" />
              </Pressable>
              <Pressable>
                <MaterialIcons name="share" size={16} color="gray" />
              </Pressable>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.arrowContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </Pressable>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Ask anything</Text>
        </View>

        <View style={styles.languageContainer}>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Image
              source={require("../assets/Icons/languageSelector.png")}
              style={{ width: 30, height: 30 }}
            />
          </Pressable>

          {modalVisible && (
            <View style={styles.dropdown}>
              {languages.map((lang) => (
                <Pressable
                  key={lang.value}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedLanguage(lang);
                    setModalVisible(false);
                  }}
                >
                  <View style={styles.radioContainer}>
                    <View
                      style={[
                        styles.radioButton,
                        selectedLanguage.value === lang.value &&
                          styles.radioSelected,
                      ]}
                    />
                  </View>
                  <Text style={styles.dropdownText}>{lang.label}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
      <FlatList
        data={
          isLoading
            ? [...messages, { id: "loading", sender: "bot", text: "" }]
            : messages
        }
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <View style={styles.inputIcons}>
          <Pressable>
            <MaterialIcons name="mic" size={24} color="#333" />
          </Pressable>
          <Pressable>
            <MaterialIcons name="camera-alt" size={24} color="#333" />
          </Pressable>
        </View>
        <TextInput
          value={userMessage}
          onChangeText={setUserMessage}
          style={styles.input}
          placeholder="Type message"
          placeholderTextColor="#aaa"
          onSubmitEditing={sendMessageToBot}
          enterKeyHint="send"
        />
        <Pressable onPress={sendMessageToBot}>
          <MaterialIcons
            name="send"
            size={24}
            color="#333"
            style={styles.sendIcon}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 10,
    paddingLeft: 20,
    justifyContent: "space-between",
  },
  arrowContainer: {
    width: 40,
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  languageContainer: {
    position: "relative",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  dropdown: {
    position: "absolute",
    top: 40,
    right: 0,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 100,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownText: {
    fontSize: 16,
  },
  radioContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D4D4D4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  radioSelected: {
    backgroundColor: "#FF7072",
  },
  messageList: {
    padding: 10,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  messageBubble: {
    marginVertical: 5,
    maxWidth: "80%",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  botMessage: {
    // Align bot messages to the left
  },
  userMessage: {
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
  },
  userMessageBox: {
    maxWidth: "70%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "pink",
  },
  botMessageBox: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  messageContent: {
    maxWidth: "70%",
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 5,
  },
  botIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderWidth: 2,
    borderColor: "#577CEF",
    borderRadius: 5,
  },
  inputIcons: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    minHeight: 40,
    maxHeight: 100,
    ...Platform.select({
      web: {
        outlineStyle: "none",
        borderWidth: 0,
      },
    }),
  },
  sendIcon: {
    borderRadius: 12,
    padding: 5,
  },
});

export default MobileChatbot;
