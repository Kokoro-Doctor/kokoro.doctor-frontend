import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
  Image,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import NewSideNav from "../../../components/DoctorsPortalComponents/NewSideNav";
import SideImageStyle from "../../../components/DoctorsPortalComponents/SideImageStyle";
import Header from "../../../components/PatientScreenComponents/Header";
import { registerMedicalDetails } from "../../../utils/DoctorService";
import { useRoute } from "@react-navigation/native";


const DoctorMedicalRegistration = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [licenseNo, setLicenseNo] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [hospital, setHospital] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);

  // Get email from route params
  const route = useRoute();
  const { email } = route?.params?.email || "";

  const [formData, setFormData] = useState({
    email: "",
    licenseNo: "",
    experience: "",
    hospital: "",
    specialization: "Cardiologist",
  });
  const handleChange = (key, value) => {
    if (key === "licenseNo") setLicenseNo(value);
    if (key === "specialization") setSpecialization(value);
    if (key === "experience") setExperience(value);
    if (key === "hospital") setHospital(value);
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
      const doc = result.assets[0];
      setFile(doc);
      setFileName(doc.name);
    }
  };

  const handleContinue = async () => {
    if (!licenseNo || !hospital || !fileName) {
      Alert.alert(
        "Missing Information",
        "Please fill all fields and upload the document."
      );
      return;
    }

    try {
      await registerMedicalDetails(
        email,
        formData.licenseNo,
        formData.specialization,
        formData.experience,
        formData.hospital,
        file
      );

      alert("Medical registration details submitted successfully!");
      console.log("Medical registration details submitted successfully!");
      navigation.navigate("NewDoctorMedicalReg", {
        email: email,
      });
    } catch (error) {
      alert(error.message);
      console.error("Doctor registration error:", error);
    }

  };

  return (
    <>
      {Platform.OS === "web" && width > 1000 && (
        <View style={styles.wrapper}>
          {/* Left Nav */}
          <NewSideNav />

          {/* Right Side (85%) */}
          <View style={styles.rightPanel}>
            {/* Form Area (85% of Right) */}
            <ScrollView contentContainerStyle={styles.formSection}>
              <Text style={styles.heading}>
                Hang On! Medical Registration Proof
              </Text>

              <Text style={styles.label}>Medical License no</Text>
              <TextInput
                placeholder="Enter number"
                placeholderTextColor="#c0c0c0"
                keyboardType="phone-pad"
                style={[
                  styles.input,
                  { color: formData.licenseNo ? "black" : "#c0c0c0" },
                ]}
                value={formData.licenseNo}
                onChangeText={(val) => handleChange("licenseNo", val)}
              />

              {/* Upload */}
              {fileName ? (
                <View style={styles.uploadedContainer}>
                  <Text style={styles.uploadedText}>Document Uploaded</Text>
                  <AntDesign name="checkcircle" size={20} color="green" />
                  <Ionicons name="document" size={30} color="#cb6a6a" />
                  <Text style={styles.pdfText}>{fileName}</Text>
                </View>
              ) : (
                <View style={styles.browseRow}>
                  <Text style={styles.text}>
                    Please upload document for verification
                  </Text>
                  <TouchableOpacity
                    style={styles.uploadBox}
                    onPress={pickDocument}
                  >
                    <AntDesign name="cloudupload" size={22} color="#ff5d73" />
                    <Text style={styles.uploadText}>Browse File</Text>
                  </TouchableOpacity>
                </View>
              )}

              <Text style={styles.label}>Specialization</Text>
              <TouchableOpacity style={styles.dropdownBox}>
                <Text style={styles.dropdownText}>
                  {specialization || "Cardiologist"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#777" />
              </TouchableOpacity>

              {/* Year of Experience Dropdown */}
              <Text style={styles.label}>Year of Experience</Text>
              {/* <TouchableOpacity style={styles.dropdownBox}>
            <Text style={styles.dropdownText}>{experience || "22"}</Text>
            <Ionicons name="chevron-down" size={20} color="#777" />
          </TouchableOpacity> */}
              <TextInput
                placeholder="Enter year..."
                placeholderTextColor="#c0c0c0"
                keyboardType="phone-pad"
                style={[
                  styles.input,
                  { color: formData.experience ? "black" : "#c0c0c0" },
                ]}
                value={formData.experience}
                onChangeText={(val) => handleChange("experience", val)}
              />

              <Text style={styles.label}>Affiliated Hospital/Clinic</Text>
              {/* <TextInput
            style={styles.input}
            placeholder="lorem ipsum"
            value={hospital}
            onChangeText={setHospital}
          /> */}
              <TextInput
                placeholder="Enter name..."
                placeholderTextColor="#c0c0c0"
                style={[
                  styles.input,
                  { color: formData.hospital ? "black" : "#c0c0c0" },
                ]}
                value={formData.hospital}
                onChangeText={(val) => handleChange("hospital", val)}
              />

              {/* Buttons */}
              <TouchableOpacity
                style={styles.continueBtn}
                onPress={handleContinue}
              >
                <Text style={styles.continueText}>Continue</Text>
                <View style={styles.iconCon}>
                  <Ionicons name="arrow-forward" size={20} color="red" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.skipBtn}
                onPress={() => navigation.navigate("NewDoctorMedicalReg")}
              >
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            </ScrollView>

            {/* Image Stack (15% of Right Panel) */}
            <SideImageStyle />
          </View>
        </View>
      )}

      {(Platform.OS !== "web" || width < 1000) && (
        <View style={styles.wrapperAndroid}>
          <View style={[styles.header, { height: "10%" }]}>
            <Header navigation={navigation} isDoctorPortal={true} />
          </View>
          {/* Left Nav */}
          {/* NewSideNav /> */}

          <View style={styles.rightPanelAndroid}>
            <ScrollView contentContainerStyle={styles.formSectionAndroid}>
              <View style={styles.formHeader}>
                <View style={styles.headingContainer}>
                  <Text style={styles.headingAndroid}>Hang On!</Text>
                  <View>
                  <Text style={styles.headingAndroid}>
                    Medical Registration
                  </Text>
                  <Text style = {styles.headingAndroid}>Proof</Text>
                  </View>
                </View>

                <Image
                  source={require("../../../assets/DoctorsPortal/Icons/doctorMedicalRegistration.png")}
                  style={styles.headerImage}
                />
              </View>

              <Text style={styles.labelAndroid}>Medical License no</Text>
              <TextInput
                placeholder="Enter number"
                placeholderTextColor="#c0c0c0"
                keyboardType="phone-pad"
                style={[
                  styles.inputAndroid,
                  { color: formData.licenseNo ? "black" : "#c0c0c0" },
                ]}
                value={formData.licenseNo}
                onChangeText={(val) => handleChange("licenseNo", val)}
              />

              {/* Upload */}
              {fileName ? (
                <View style={styles.uploadedContainer}>
                  <Text style={styles.uploadedText}>Document Uploaded</Text>
                  <AntDesign name="checkcircle" size={20} color="green" />
                  <Ionicons name="document" size={30} color="#cb6a6a" />
                  <Text style={styles.pdfText}>{fileName}</Text>
                </View>
              ) : (
                <View style={styles.browseRowAndroid}>
                  <Text style={styles.text}>
                    Please upload document for verification
                  </Text>
                  <TouchableOpacity
                    style={styles.uploadBox}
                    onPress={pickDocument}
                  >
                    <AntDesign name="cloudupload" size={30} color="#ff5d73" />
                    <Text style={styles.uploadText}>Browse File</Text>
                  </TouchableOpacity>
                </View>
              )}

              <Text style={styles.labelAndroid}>Specialization</Text>
              <TouchableOpacity style={styles.dropdownBoxAndroid}>
                <Text style={styles.dropdownText}>
                  {specialization || "Cardiologist"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#777" />
              </TouchableOpacity>

              {/* Year of Experience Dropdown */}
              <Text style={styles.labelAndroid}>Year of Experience</Text>
              {/* <TouchableOpacity style={styles.dropdownBox}>
            <Text style={styles.dropdownText}>{experience || "22"}</Text>
            <Ionicons name="chevron-down" size={20} color="#777" />
          </TouchableOpacity> */}
              <TextInput
                placeholder="Enter year..."
                placeholderTextColor="#c0c0c0"
                keyboardType="phone-pad"
                style={[
                  styles.inputAndroid,
                  { color: formData.experience ? "black" : "#c0c0c0" },
                ]}
                value={formData.experience}
                onChangeText={(val) => handleChange("experience", val)}
              />

              <Text style={styles.labelAndroid}>
                Affiliated Hospital/Clinic
              </Text>
              {/* <TextInput
            style={styles.input}
            placeholder="lorem ipsum"
            value={hospital}
            onChangeText={setHospital}
          /> */}
              <TextInput
                placeholder="Enter name..."
                placeholderTextColor="#c0c0c0"
                style={[
                  styles.inputAndroid,
                  { color: formData.hospital ? "black" : "#c0c0c0" },
                ]}
                value={formData.hospital}
                onChangeText={(val) => handleChange("hospital", val)}
              />

              {/* Buttons */}
              <View style={styles.continueBtnContainerAndroid}>
                <TouchableOpacity
                  style={styles.continueBtnAndroid}
                  onPress={handleContinue}
                >
                  <Text style={styles.continueTextAndroid}>Continue</Text>
                  <View style={styles.iconCon}>
                    <Ionicons name="arrow-forward" size={20} color="red" />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.skipBtnContainer}>
                <TouchableOpacity
                  style={styles.skipBtnAndroid}
                  onPress={() => navigation.navigate("NewDoctorMedicalReg")}
                >
                  <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </>

  );
};

export default DoctorMedicalRegistration;

const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    backgroundColor: "#FCF5F7",
  },
  wrapperAndroid: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FCF5F7",
    flexDirection: "column",
    marginTop: 4,
    padding: 10,
  },

  rightPanel: {
    width: "85%",
    flexDirection: "row",
    backgroundColor: "#FCF5F7",
  },

  rightPanelAndroid: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#FCF5F7",
    flex: 1,
  },

  header: {
    width: "100%",
  },

  formSection: {
    width: "85%",
    paddingLeft: "5%",
    paddingTop: "6%",
    paddingRight: 20,
  },
  formSectionAndroid: {
    width: "100%",
    minHeight: "100%",
    paddingBottom: 70,
    paddingLeft: "2%",
    paddingRight : "2%",
    flexGrow: 1,
    gap : 5
  },

  formHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headingContainer: {
    display: "flex",
    flexDirection: "column",
    gap : 40
  },

  heading: {
    marginTop: "6%",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
  },
  headingAndroid: {
    marginTop: "6%",
    fontWeight: "semibold",
    fontSize: windowWidth < 550 ? 20 : 30,
    marginTop: 0,
    width: windowWidth * 0.5,
    
    ...Platform.select({
      web: {
        width: windowWidth < 550 ? "55vw" : "50vw",
      },  
    }),
  },

  headerImage : {
    width: windowWidth < 400 ? 130 : 150, 
    height: windowWidth < 400 ? 130 : 150
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    color: "#000",
  },
  labelAndroid: {
    marginTop : 10,
    fontSize: windowWidth < 500  ? 14 : 22,
    fontWeight: "400",
    marginBottom: 4,
    color: "#000",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
    width: "34%",
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
    width: "100%",
  },

  browseRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
    marginBottom: 16,
    width: "34%",
  },
  browseRowAndroid: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
    marginBottom: 16,
    width: "100%",
    justifyContent: "space-between",
  },

  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },

  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#9B9A9A",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  uploadText: {
    color: "#333",
    backgroundColor: "#FBF5F6",
    borderWidth: 1,
    borderColor: "#cb6a6a",
    paddingHorizontal: 8,
    marginLeft: 6,
    fontSize: 13,
  },

  uploadedContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },

  uploadedText: {
    fontSize: 12,
    fontWeight: "500",
  },

  pdfText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#cb6a6a",
  },

  continueBtnContainerAndroid: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
  },

  continueBtn: {
    flexDirection: "row",
    backgroundColor: "#ff5d73",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    elevation: 2,
    width: "25%",
    height: "6%",
    marginBottom: 20,
    marginTop: 10,
    justifyContent: "center",
    overflow: "hidden",
  },
  continueBtnAndroid: {
    backgroundColor: "#ff5d73",
    width: 300,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    justifyContent: "center",
    
    marginBottom: 20,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    overflow: "hidden",
  },

  continueText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 15,
  },
  continueTextAndroid: {
    color: "white",
    fontWeight: "semibold",
    fontSize: 25,
    marginLeft: 70,
  },

  iconCon: {
    marginLeft: windowWidth < 1000 ? "23%" : "30%",
    width: 34,
    height: 34,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  // continueBtn: {
  //   flexDirection: "row",
  //   backgroundColor: "#ff5d73",
  //   paddingVertical: 12,
  //   paddingHorizontal: 24,
  //   borderRadius: 30,
  //   alignItems: "center",
  //   elevation: 2,
  //   width: "25%",
  //   marginTop: 10,
  //   marginBottom: 16,
  // },
  // continueText: {
  //   color: "white",
  //   fontWeight: "bold",
  // },
  // iconCon: {
  //   marginLeft: "auto",
  //   width: 34,
  //   height: 34,
  //   backgroundColor: "white",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 17,
  //   elevation: 3,
  //   marginLeft: 20,
  // },

  skipBtnContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  skipBtn: {
    backgroundColor: "#23c16b",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    width: "15%",
    marginLeft: "3%",
  },
  skipBtnAndroid: {
    backgroundColor: "#23c16b",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    width: 200,
  },

  skipText: {
    color: "white",
    fontWeight: "bold",
  },

  dropdownBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    width: "34%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownBoxAndroid: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  dropdownText: {
    fontSize: 14,
    color: "#333",
  },
});

// specialization ||
//  experience ||
