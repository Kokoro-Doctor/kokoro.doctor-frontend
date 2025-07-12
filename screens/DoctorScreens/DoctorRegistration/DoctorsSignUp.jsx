import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NewSideNav from "../../../components/DoctorsPortalComponents/NewSideNav";
import { useNavigation } from "@react-navigation/native";
import SideImageStyle from "../../../components/DoctorsPortalComponents/SideImageStyle";
import { registerDoctor } from "../../../utils/AuthService";

const DoctorsSignUp = () => {
  const navigation = useNavigation();
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    location: "",
    phoneNumber: "",
    password: "",
    otp: ["", "", "", ""],
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleSignup = async () => {
    try {
      await registerDoctor({
        doctorname: `${formData.firstname} ${formData.lastname}`,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        location: formData.location,
      });
      alert("Doctor registered successfully!");
      navigation.navigate("DoctorMedicalRegistration" , {
        email: formData.email,
      });
    } catch (error) {
      alert(error.message);
      console.error("Doctor registration error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <NewSideNav navigation={navigation} />
      <View style={styles.content}>
        <View style={styles.detail_container}>
          <Text style={styles.heading}>Sign Up</Text>
          <View style={styles.details}>
            <Text style={styles.inputHeading}>First Name</Text>
            <TextInput
              placeholder="Enter your first name..."
              placeholderTextColor="#c0c0c0"
              style={[
                styles.inputContainer,
                { color: formData.firstname ? "black" : "#c0c0c0" },
              ]}
              value={formData.name}
              onChangeText={(val) => handleChange("firstname", val)}
            />
            <Text style={styles.inputHeading}>Last Name</Text>
            <TextInput
              placeholder="Enter your last name..."
              placeholderTextColor="#c0c0c0"
              style={[
                styles.inputContainer,
                { color: formData.lastname ? "black" : "#c0c0c0" },
              ]}
              value={formData.name}
              onChangeText={(val) => handleChange("lastname", val)}
            />
            <Text style={styles.inputHeading}>Email Id</Text>
            <TextInput
              placeholder="Enter your email..."
              placeholderTextColor="#c0c0c0"
              style={[
                styles.inputContainer,
                { color: formData.email ? "black" : "#c0c0c0" },
              ]}
              value={formData.email}
              onChangeText={(val) => handleChange("email", val)}
            />
            <Text style={styles.inputHeading}>Establishment Location</Text>
            <TextInput
              placeholder="Enter your location..."
              placeholderTextColor="#c0c0c0"
              style={[
                styles.inputContainer,
                { color: formData.location ? "black" : "#c0c0c0" },
              ]}
              value={formData.location}
              onChangeText={(val) => handleChange("location", val)}
            />
            <Text style={styles.inputHeading}>Phone No</Text>
            <TextInput
              placeholder="Enter your phone number..."
              placeholderTextColor="#c0c0c0"
              keyboardType="phone-pad"
              style={[
                styles.inputContainer,
                { color: formData.phoneNumber ? "black" : "#c0c0c0" },
              ]}
              value={formData.phone}
              onChangeText={(val) => handleChange("phoneNumber", val)}
            />
            <Text style={styles.inputHeading}>Password</Text>
            <TextInput
              placeholder="Enter your password..."
              placeholderTextColor="#c0c0c0"
              secureTextEntry
              style={[
                styles.inputContainer,
                { color: formData.password ? "black" : "#c0c0c0" },
              ]}
              value={formData.password}
              onChangeText={(val) => handleChange("password", val)}
            />
            <View style={styles.rememberForgotRow}>
              <View style={styles.rememberMeContainer}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={toggleRememberMe}
                >
                  <View
                    style={[styles.checkbox, rememberMe && styles.checkedBox]}
                  >
                    {rememberMe && (
                      <Ionicons name="checkmark" size={12} color="#fff" />
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.continueContainer}
              onPress={handleSignup}
            >
              <Text style={styles.continueText}>SignUp</Text>
              <Image
                style={styles.arrowIcon}
                source={require("../../../assets/DoctorsPortal/Icons/ArrowIcon.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.skipContainer}
              onPress={() => navigation.navigate("DoctorMedicalRegistration")}
            >
              <Text style={styles.continueText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <SideImageStyle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  content: {
    width: "65%",
    height: "100%",
    backgroundColor: "#FCF5F7",
    overflow: "hidden",
    flexDirection: "row",
  },
  detail_container: {
    width: "80%",
    height: "100%",
    paddingTop: "5%",
    paddingLeft: "5%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 20,
  },
  details: {
    width: "60%",
    gap: 5,
  },
  inputHeading: {
    fontSize: 16,
    marginTop: "2%",
  },
  inputContainer: {
    width: "70%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    //color:"#c0c0c0"
    borderColor: "#000",
  },
  note: {
    fontSize: 13,
    fontWeight: "500",
    marginTop: "3%",
  },
  // otpContainer: {
  //   width: "70%",
  //   height: 45,
  //   marginTop: "2%",
  //   backgroundColor: "#1FBF86",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 5,
  //   shadowColor: "#00000040",
  //   shadowOffset: {
  //     width: 0,
  //     height: 4,
  //   },
  //   shadowOpacity: 0.8,
  //   shadowRadius: 8,
  //   elevation: 5,
  // },
  // otpText: {
  //   color: "white",
  //   fontWeight: "bold",
  // },
  // otpInputContainer: {
  //   flexDirection: "row",
  //   gap: 10,
  //   marginTop: 15,
  // },
  // otpInput: {
  //   width: 40,
  //   height: 40,
  //   borderWidth: 1,
  //   borderColor: "#ccc",
  //   textAlign: "center",
  //   fontSize: 18,
  //   borderRadius: 8,
  //   backgroundColor: "#fff",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  //   elevation: 3,
  // },
  // verificationContainer: {
  //   flexDirection: "row",
  //   marginTop: "5%",
  //   alignItems: "center",
  // },
  rememberForgotRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "2%",
    marginTop: "1%",
  },
  rememberForgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },
  rememberMeText: {
    fontSize: 14,
    color: "#666",
  },
  continueContainer: {
    marginLeft: "1%",
    width: "70%",
    height: 40,
    marginTop: "5%",
    backgroundColor: "#1FBF86",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    gap: 20,
    shadowColor: "#00000040",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  skipContainer: {
    marginLeft: "15%",
    width: "30%",
    height: 40,
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    gap: 20,
    backgroundColor: "#1FBF86",
  },
  continueText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  arrowIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    backgroundColor: "white",
    borderRadius: 12.5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DoctorsSignUp;
