import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";

import { Dimensions } from 'react-native';




import NewSideNav from "../../../components/DoctorsPortalComponents/NewSideNav";
import SideImageStyle from "../../../components/DoctorsPortalComponents/SideImageStyle";
import Header from "../../../components/PatientScreenComponents/Header";

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useFocusEffect } from '@react-navigation/native';





const EstablishmentTiming = ({ navigation }) => {
  const { width } = Dimensions.get('window');

  const [fromTime, setFromTime] = useState('');
const [fromPeriod, setFromPeriod] = useState('AM');

const [toTime, setToTime] = useState('');
const [toPeriod, setToPeriod] = useState('AM');

const [sessionsByDay, setSessionsByDay] = useState({
  0: [], 
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
});



  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

   




const handleAddSession = () => {
  const sessionLabel = `${fromTime} ${fromPeriod}`.trim();



  if (!fromTime || !toTime) {
    alert('Please enter both From and To times');
    return;
  }

  const currentSessions = sessionsByDay[selectedDayIndex] || [];

  if (currentSessions.includes(sessionLabel)) {
    alert('This session is already added');
    return;
  }

  const updatedSessions = {
    ...sessionsByDay,
    [selectedDayIndex]: [...currentSessions, sessionLabel],
  };

  setSessionsByDay(updatedSessions);

  setFromTime('');
  setToTime('');
  setFromPeriod('AM');
  setToPeriod('AM');
};






  const handleFromTimeChange = (text) => {
  setFromTime(text); 
};

const handleToTimeChange = (text) => {
  setToTime(text);  
};


const toggleFromPeriod = () => {
  setFromPeriod(prev => (prev === 'AM' ? 'PM' : 'AM'));
};

const toggleToPeriod = () => {
  setToPeriod(prev => (prev === 'AM' ? 'PM' : 'AM'));
};

useFocusEffect(
  React.useCallback(() => {
    setSessionsByDay({
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
});

    setFromTime('');
    setToTime('');
    setFromPeriod('AM');
    setToPeriod('AM');
    setSelectedDayIndex(0);
  }, [])
);


  if (Platform.OS === "web" && width >= 1000) {
    
    return (
      <View style={styles.container}>
        <NewSideNav />

        <View style={styles.rightSection}>
          <ScrollView contentContainerStyle={styles.formContainer}>
            <Text style={styles.heading}>Establishment Timings</Text>

            <Text style={styles.label}>Days</Text>
            <View style={styles.dayRow}>
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                (day, index) => (
                  <TouchableOpacity key={index} style={styles.dayButton}>
                    <Text>{day}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>

            <Text style={styles.label}>Session 1</Text>
            <View style={styles.inputRow}>
              <TextInput placeholder="From" style={styles.inputBox} />
              <TextInput placeholder="To" style={styles.inputBox} />
            </View>

            <Text style={styles.label}>Session 2</Text>
            <View style={styles.inputRow}>
              <TextInput placeholder="From" style={styles.inputBox} />
              <TextInput placeholder="To" style={styles.inputBox} />
            </View>

            <Text style={styles.label}>Fees</Text>
            <TextInput placeholder="₹" style={styles.fullInput} />

            <TouchableOpacity
              style={styles.continueBtn}
              onPress={() => navigation.navigate("DoctorCongrats")}
            >
              <Text style={styles.continueText}>Continue</Text>
              <View style={styles.iconCon}>
                <Ionicons name="arrow-forward" size={20} color="red" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipBtn}
              onPress={() => navigation.navigate("DoctorCongrats")}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </ScrollView>

          <SideImageStyle />
        </View>
      </View>
    );
  } else if(Platform.OS !== 'web' || width < 1000) {
    
    return (
     
     <View style={{ flex: 1 , backgroundColor: '#FCF5F7', }}>
      <Header navigation={navigation} isDoctorPortal={true} />
         
<ScrollView contentContainerStyle={mobileStyles.content}>
  <View style={mobileStyles.header}>
    <View style={mobileStyles.makecolumn}>
    <Text style={mobileStyles.headerTitle}>Hang On!</Text>
    <Text style={mobileStyles.headerSubtitle}>Establishment </Text>
    <Text style={mobileStyles.headerSubtitle}>timing</Text>
    </View>

      <View style={mobileStyles.makecolumn}>
     <Image style={mobileStyles.image} source={require("../../../assets/Images/Calender_bro1.png")}
      ></Image>
    </View>
   
  </View>

  
    

      <Text style={mobileStyles.label}>Choose Days</Text>
      <View style={mobileStyles.dayRow}>
  {["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"].map((day, index) => (
    <TouchableOpacity
      key={index}
      style={[
        mobileStyles.dayButton,
        selectedDayIndex === index && mobileStyles.dayButtonSelected
      ]}
      onPress={() => setSelectedDayIndex(index)}
    >
      <Text
        style={[
          mobileStyles.dayText,
          selectedDayIndex === index && mobileStyles.dayTextSelected
        ]}
      >
        {day}
      </Text>
    </TouchableOpacity>
  ))}
</View>


      <Text style={mobileStyles.label}>Choose Session</Text>
      <View style={mobileStyles.sessionRow}>
        <View style={mobileStyles.sessionColumn}>
  <Text style={mobileStyles.smallLabel}>From</Text>
  <View style={mobileStyles.inputWithSelector}>
    <TextInput
  value={fromTime}
  onChangeText={handleFromTimeChange}
  placeholder="10:00"
  placeholderTextColor="#aaa"
  style={mobileStyles.inputField}
/>
    <TouchableOpacity style={mobileStyles.selectorBox} onPress={toggleFromPeriod}>
      <Text style={mobileStyles.selectorText}>{fromPeriod}</Text>
    </TouchableOpacity>
  </View>
</View>

<View style={mobileStyles.sessionColumn}>
  <Text style={mobileStyles.smallLabel}>To</Text>
  <View style={mobileStyles.inputWithSelector}>
    <TextInput
  value={toTime}
  onChangeText={handleToTimeChange}
  placeholder="11:00"
  placeholderTextColor="#aaa"
  style={mobileStyles.inputField}
/>

    <TouchableOpacity style={mobileStyles.selectorBox} onPress={toggleToPeriod}>
      <Text style={mobileStyles.selectorText}>{toPeriod}</Text>
    </TouchableOpacity>
  </View>
</View>

        <View style={mobileStyles.sessionColumn}>
        <TouchableOpacity style={mobileStyles.addButton} onPress={handleAddSession}>
  <Text style={mobileStyles.addText}>Add</Text>
</TouchableOpacity>


        </View>
      </View>
      
      {(sessionsByDay[selectedDayIndex] || []).length > 0 && (
  <>
    <Text style={mobileStyles.smallLabel}>Sessions Added</Text>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {sessionsByDay[selectedDayIndex].map((session, index) => (
        <View key={index} style={mobileStyles.sessionTag}>
          <Text style={mobileStyles.sessionText}>{session}</Text>
        </View>
      ))}
    </View>
  </>
)}



  


      <Text style={mobileStyles.label}>Subscribers Fees</Text>
      <TextInput placeholder="₹" style={mobileStyles.inputBox} keyboardType="numeric" />

      <TouchableOpacity style={mobileStyles.continueButton}>
        <Text style={mobileStyles.continueText}>Continue</Text>
        <Text style={mobileStyles.arrowIcon}>→</Text>
      </TouchableOpacity>

    </ScrollView>
  </View>




    );
  }
};

export default EstablishmentTiming;



const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "100%",
    backgroundColor: "#FCF5F7",
  },
  rightSection: {
    width: "85%",
    flexDirection: "row",
    backgroundColor: "#FCF5F7",
  },
  formContainer: {
    width: "85%",
    padding: 30,
  },
  heading: {
    marginTop: "8%",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 8,
    fontWeight: "500",
    color: "#000",
  },
  dayRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  dayButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginRight: 10,
    marginBottom: 10,
    elevation: 1,
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
    width: "35%",
  },
  inputBox: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "#ccc",
    marginBottom: 10,
    width: "40%",
  },
  fullInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "#ccc",
    marginBottom: 20,
    width: "28%",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 15,
    marginTop: 10,
  },

  continueBtn: {
    flexDirection: "row",
    backgroundColor: "#ff5d73",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    elevation: 2,
    width: "22%",
    height: "6%",
    marginBottom: 20,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  continueText: {
    color: "white",
    fontWeight: "bold",
  },
  iconCon: {
    marginLeft: "10%",
    width: 34,
    height: 34,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    marginLeft: "35%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  skipBtn: {
    width: "15%",
    height: "6%",
    backgroundColor: "#20C997",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginLeft: "3%",
    justifyContent: "center",
  },
  skipText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 15,
  },

});

const mobileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF5F7',
  },

  header: {
    paddingHorizontal: '0%',
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  image:{
    width: 150,
    height: 150,
    marginTop: '5%',
    
  },
  makecolumn:{
  
    flexDirection: 'column',
    align: 'center',
    marginTop: '-10%',    
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000',
    marginBottom: '2%',
    marginTop: '20%',   
  },
  headerSubtitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000',
    marginBottom: '-3%',
  },
  
  content: {
    padding: '5%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: '3%',
  },
  dayRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2%',
    marginBottom: 20,
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    borderRadius: 10,
    backgroundColor: '#FFE7EB',
  },
  dayButton: {
    backgroundColor: '#fff',
    paddingVertical: '7%',
    paddingHorizontal: '3%',
    borderRadius: 15,
  },
  dayButtonSelected: {
    backgroundColor: '#FF5D73',
  },
  dayText: {
    fontWeight: 'bold',
    color: '#000',
  },
  dayTextSelected: {
    color: '#fff',
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 16,
  },
  sessionColumn: {
    flexDirection: 'column',
  },
  smallLabel: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
    
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    alignContent: 'right',
    borderRadius: 6,
    paddingHorizontal: '2%',
    paddingVertical: 8,
    minWidth: '33%',
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#FF5D73',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: '4%',
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  sessionTag: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: '3%',
  },
  sessionText: {
    color: '#007AFF',
    fontWeight: '400',
  },
  continueButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FF5D73',
    borderRadius: 40,
    paddingVertical: '4%',
    marginTop: '40%',
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  arrowIcon: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  inputWithSelector: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 6,
  backgroundColor: '#fff',
  width: 120,
  height: 40,
  overflow: 'hidden',
},

inputField: {
  flex: 1,
  paddingHorizontal: 10,
  paddingVertical: 8,
  color: '#000',
},

selectorBox: {
  paddingHorizontal: 10,
  paddingVertical: 8,
  borderLeftWidth: 1,
  borderLeftColor: '#ccc',
},

selectorText: {
  fontSize: 12,
  fontWeight: '600',
  color: '#000',
},

});