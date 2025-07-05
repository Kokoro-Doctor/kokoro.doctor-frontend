import React, { useState } from "react";
import {
  View,
  Text,
    Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  Dimensions,
  StatusBar,
    Button
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import NewSideNav from "../../../components/DoctorsPortalComponents/NewSideNav";
import SideImageStyle from "../../../components/DoctorsPortalComponents/SideImageStyle";

const { width, height } = Dimensions.get("window");

const NewDoctorMedicalReg = ({ navigation }) => {
  const [licenseNo, setLicenseNo] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [hospital, setHospital] = useState("");

  const [documents, setDocuments] = useState({
    medicalCouncil: null,
    degreeCertificate: null,
    govID: null,
  });

  const pickDocument = async (type) => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
      setDocuments((prev) => ({
        ...prev,
        [type]: result.assets[0].name,
      }));
    }
  };

  const handleContinue = () => {
    const { medicalCouncil, degreeCertificate, govID } = documents;
    if (
      !medicalCouncil ||
      !degreeCertificate ||
      !govID
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill all fields and upload all documents."
      );
      return;
    }
    navigation.navigate("NextScreen");
  };
    const removeDocument = (type) => {
        setDocuments((prev) => ({
            ...prev,
            [type]: null,
        }));
    };

  return (
      <>
      {Platform.OS==="web" && width>1000 &&(

    <View style={styles.wrapper}>
      {/* Left Nav */}
      <NewSideNav />

      {/* Right Panel */}
      <View style={styles.rightPanel}>
        <ScrollView contentContainerStyle={styles.formSection}>
          <Text style={styles.heading}>
            Hang On! Medical Registration Proof
          </Text>

          <Text style={styles.label}>Medical Council Registration Id</Text>
          {documents.medicalCouncil ? (
              <View style={styles.uploadedContainerParent}>
                  <View style={styles.uploadedContainer}>
                      <Text style={styles.uploadedText}>Document Uploaded</Text>
                      <TouchableOpacity style={styles.removeBtn} onPress={() => removeDocument("medicalCouncil")}>
                          <Text style={styles.removeBtnText}>Remove</Text>
                      </TouchableOpacity>

                  </View>
                  <View style={styles.attachedIcons}>

                      <Ionicons name="document" size={30} color="#cb6a6a" />
                      <Text style={styles.uploadedText}>{documents.medicalCouncil}</Text>
                  </View>
              </View>
          ) : (
            <View style={styles.browseRow}>
              <Text style={styles.text}>
                Please upload document for verification
              </Text>
              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() => pickDocument("medicalCouncil")}
              >
                <AntDesign name="cloudupload" size={22} color="#ff5d73" />
                <Text style={styles.uploadText}>Browse File</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.label}>Degree Certificate</Text>
          {documents.degreeCertificate ? (
              <View style={styles.uploadedContainerParent}>
                  <View style={styles.uploadedContainer}>
                      <Text style={styles.uploadedText}>Document Uploaded</Text>
                      <TouchableOpacity style={styles.removeBtn} onPress={() => removeDocument("degreeCertificate")}>
                          <Text style={styles.removeBtnText}>Remove</Text>
                      </TouchableOpacity>

                  </View>
                  <View style={styles.attachedIcons}>

                      <Ionicons name="document" size={30} color="#cb6a6a" />
                      <Text style={styles.uploadedText}>{documents.degreeCertificate}</Text>
                  </View>
              </View>
          ) : (
            <View style={styles.browseRow}>
              <Text style={styles.text}>
                Please upload document for verification
              </Text>
              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() => pickDocument("degreeCertificate")}
              >
                <AntDesign name="cloudupload" size={22} color="#ff5d73" />
                <Text style={styles.uploadText}>Browse File</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.label}>Government ID Proof</Text>
          {documents.govID ? (
              <View style={styles.uploadedContainerParent}>
                  <View style={styles.uploadedContainer}>
                      <Text style={styles.uploadedText}>Document Uploaded</Text>
                      <TouchableOpacity style={styles.removeBtn} onPress={() => removeDocument("govID")}>
                          <Text style={styles.removeBtnText}>Remove</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.attachedIcons}>

                      <Ionicons name="document" size={30} color="#cb6a6a" />
                      <Text style={styles.uploadedText}>{documents.govID}</Text>
                  </View>
              </View>
          ) : (
            <View style={styles.browseRow}>
              <Text style={styles.text}>
                Please upload document for verification
              </Text>
              <TouchableOpacity
                style={styles.uploadBox}
                onPress={() => pickDocument("govID")}
              >
                <AntDesign name="cloudupload" size={22} color="#ff5d73" />
                <Text style={styles.uploadText}>Browse File</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Buttons */}

          <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
            <Text style={styles.continueText}>Continue</Text>
            <View style={styles.iconCon}>
              <Ionicons name="arrow-forward" size={20} color="red" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => navigation.navigate("EstablishmentTiming")}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

        </ScrollView>

        <SideImageStyle />
      </View>
    </View>
      )}

        {(Platform.OS !== "web" || width < 1000) && (
                <View style={styles.wrapper}>


                  <StatusBar barStyle="dark-content" backgroundColor="#fff" />

                    <ScrollView contentContainerStyle={styles.formSection}>
                        {/* Navbar */}
                        {/*<NewSideNav />*/}
                        <View style={styles.navbar}>
                          <TouchableOpacity>
                            <Ionicons name="menu" size={32} color="black" />
                          </TouchableOpacity>
                            <Image
                                source={require("../../../assets/Images/KokoroLogo.png")}
                                style={styles.kokoroLogo}
                                resizeMode="contain"
                            />
                            <Text style={styles.title}>Kokoro.Doctor</Text>
                            <TouchableOpacity style={styles.navIconProfile}>
                            <Ionicons name="person" size={32} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                            <Ionicons name="notifications-outline" size={32} color="black" />
                            </TouchableOpacity>
                        </View>
                      <View style={styles.headingBox}>
                        <Text style={styles.heading}>
                        Hang On!
                          </Text>

                          <View style={styles.mainHeadingBox}>
                              <View style={styles.mainHeading}>
                                  <Text style={styles.subHeading}>Medical</Text>
                                  <Text style={styles.subHeading2}>Registration Proof</Text>
                              </View>

                              <Image
                                  source={require("../../../assets/Images/regLogo.png")}
                                  style={styles.regLogo}
                                  resizeMode="contain"
                              />
                          </View>

                      </View>
                      <View style={styles.councilRegistrationBox}>
                      <Text style={styles.label}>Medical Council Registration Id</Text>
                      {documents.medicalCouncil ? (
                          <View style={styles.uploadedContainerParent}>
                              <View style={styles.uploadedContainer}>
                                  <Text style={styles.uploadedText}>Document Uploaded</Text>
                                <TouchableOpacity style={styles.removeBtn} onPress={() => removeDocument("medicalCouncil")}>
                                  <Text style={styles.removeBtnText}>Remove</Text>
                                </TouchableOpacity>

                              </View>
                              <View style={styles.attachedIcons}>

                                  <Ionicons name="document" size={30} color="#cb6a6a" />
                                  <Text style={styles.uploadedText}>{documents.medicalCouncil}</Text>
                              </View>
                          </View>
                      ) : (
                          <View style={styles.browseRow}>
                            <Text style={styles.text}>
                              Please upload document{"\n"}for verification
                            </Text>
                            <TouchableOpacity
                                style={styles.uploadBox}
                                onPress={() => pickDocument("medicalCouncil")}
                            >
                              <AntDesign name="cloudupload" size={22} color="#ff5d73" />
                              <Text style={styles.uploadText}>Browse File</Text>
                            </TouchableOpacity>

                          </View>
                      )}
                        <View style={styles.divider} />
                      </View>
                      <View style={styles.councilRegistrationBox}>
                      <Text style={styles.label}>Degree Certificate</Text>
                      {documents.degreeCertificate ? (
                          <View style={styles.uploadedContainerParent}>
                          <View style={styles.uploadedContainer}>
                            <Text style={styles.uploadedText}>Document Uploaded</Text>
                            <TouchableOpacity style={styles.removeBtn} onPress={() => removeDocument("degreeCertificate")}>
                              <Text style={styles.removeBtnText}>Remove</Text>
                            </TouchableOpacity>

                          </View>
                          <View style={styles.attachedIcons}>

                          <Ionicons name="document" size={30} color="#cb6a6a" />
                          <Text style={styles.uploadedText}>{documents.degreeCertificate}</Text>
                          </View>
                          </View>
                      ) : (
                          <View style={styles.browseRow}>
                            <Text style={styles.text}>
                              Please upload document{"\n"}for verification
                            </Text>
                            <TouchableOpacity
                                style={styles.uploadBox}
                                onPress={() => pickDocument("degreeCertificate")}
                            >
                              <AntDesign name="cloudupload" size={22} color="#ff5d73" />
                              <Text style={styles.uploadText}>Browse File</Text>
                            </TouchableOpacity>
                          </View>
                      )}
                        <View style={styles.divider} />
                      </View>
                      <View style={styles.councilRegistrationBox}>
                      <Text style={styles.label}>Government ID Proof</Text>
                      {documents.govID ? (
                          <View style={styles.uploadedContainerParent}>
                              <View style={styles.uploadedContainer}>
                                  <Text style={styles.uploadedText}>Document Uploaded</Text>
                                <TouchableOpacity style={styles.removeBtn} onPress={() => removeDocument("govID")}>
                                  <Text style={styles.removeBtnText}>Remove</Text>
                                </TouchableOpacity>
                              </View>
                              <View style={styles.attachedIcons}>

                                  <Ionicons name="document" size={30} color="#cb6a6a" />
                                  <Text style={styles.uploadedText}>{documents.govID}</Text>
                              </View>
                          </View>
                      ) : (
                          <View style={styles.browseRow}>
                            <Text style={styles.text}>
                              Please upload document{"\n"}for verification
                            </Text>

                            <TouchableOpacity
                                style={styles.uploadBox}
                                onPress={() => pickDocument("govID")}
                            >
                              <AntDesign name="cloudupload" size={22} color="#ff5d73" />
                              <Text style={styles.uploadText}>Browse File</Text>
                            </TouchableOpacity>
                          </View>
                      )}
                        <View style={styles.divider} />
                        </View>
                      {/* Buttons */}
                        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
                            <Text style={styles.continueText}>Continue</Text>
                            <View style={styles.iconCon}>
                                <Ionicons name="arrow-forward" size={20} color="red" />
                            </View>
                        </TouchableOpacity>

                      <TouchableOpacity
                          style={styles.skipBtn}
                          onPress={() => navigation.navigate("EstablishmentTiming")}
                      >
                        <Text style={styles.skipText}>Skip</Text>
                      </TouchableOpacity>


                    </ScrollView>

                     {/*<SideImageStyle /> (optional for app) */}
                  </View>
        )}
          </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding:'3%',
    height:"100%",
    width:"100%",

    ...Platform.select({
      web: {
        flexDirection: "row",
        width: "100%",
        height: "100%",
        backgroundColor: "#FCF5F7",
      },
    }),
  },
  rightPanel: {
    ...Platform.select({
      web: {
        width: "85%",
        flexDirection: "row",
        backgroundColor: "#FCF5F7",
      },
    }),
  },

  removeBtn: {
    backgroundColor: '#ff4d4f',
    borderRadius: 10,
    paddingVertical: '1.5%',
    paddingHorizontal: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '8%',
    minHeight: '6%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 1.5,
    marginTop: "6%",
  },
  removeBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  kokoroLogo: {
    width: 30,
    height: 30,
    marginRight: 12,
    marginLeft:"4%",
  },
  navbar: {
    flexDirection: "row",

      width:'100%',

  },
    navIconProfile:{

      marginRight:18,
        flexDirection: "row",
    },
    title: {
      fontSize: 18,
        fontFamily: "Montserrat",
        fontWeight: 900,
       paddingTop:"1%",
        lineHeight:20,
        marginRight:"20%",
    },
  formSection: {
    ...Platform.select({
      web: {
        width: "85%",
        paddingLeft: "5%",
        paddingTop: "6%",
        paddingRight: 20,
      },
    }),
  },
uploadedContainerParent:{
      flexDirection:"row",
},
  headingBox:{
    marginLeft:'6%',
    marginTop:'5%',
    marginBottom:'2%',
    flex:1,
  },
  heading: {
    fontSize:24,
    fontWeight:700,
    fontFamily:"Poppins",
    marginBottom:'1%',
    ...Platform.select({
      web: {
        marginTop: "6%",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 32,
      },
    }),
  },
  mainHeadingBox:{
      flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
      marginRight: '6%',
  },
    mainHeading: {
    flexDirection: "column",
    },
  subHeading:{
    fontSize:24,
    fontWeight:700,
    fontFamily:"Poppins",
      ...Platform.select({
          web:{
                marginTop:-100,
          },
      }),
  },
   regLogo: {
      width: 125,
      height: 115,
      marginLeft: 10,
   },
  subHeading2:{
    fontSize:24,
    fontWeight:700,
    fontFamily:"Poppins",
  },
    councilRegistrationBox: {
      marginLeft:'4%',
      flex:1,
      marginBottom:'5%',
      width: "100%",
    },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginTop: "6%",
  },
  label: {
    fontSize:20,
    fontWeight: "500",
    marginBottom:'2%',
    fontFamily: "Poppins",
    ...Platform.select({
      web: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 4,
        color: "#000",
      },
    }),
  },
  input: {
    ...Platform.select({
      web: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        backgroundColor: "#fff",
        width: "34%",
      },
    }),
  },
  browseRow: {
    flex:1,
    flexDirection:"row",
    ...Platform.select({
      web: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        width: "34%",
      },
    }),
  },
  text: {
    paddingRight:"8%",
    fontSize: 15,
    fontWeight:"500",
    color: "#333",
    fontFamily: "Poppins",
    ...Platform.select({
      web: {
        fontSize: 12,
        fontWeight: "500",
        color: "#333",
        flex: 1,
      },
    }),
  },
  uploadBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#9B9A9A",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: "6%",
    paddingVertical: "2%",
    gap:8,
    ...Platform.select({
      web: {
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
    }),
  },
  uploadText: {
      flexDirection:"row",

    ...Platform.select({
      web: {
        color: "#333",
        backgroundColor: "#FBF5F6",
        borderWidth: 1,
        borderColor: "#cb6a6a",
        paddingHorizontal: 8,
        marginLeft: 6,
        fontSize: 13,
      },
    }),
  },
  uploadedContainer: {
      flexDirection:"column",

    ...Platform.select({
      web: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        width: "34%",
        gap: 8,
      },
    }),
  },
  uploadedText: {
      marginRight: "8%",
    ...Platform.select({
      web: {
        fontSize: 12,
        fontWeight: "500",
        color: "green",
      },
    }),
  },
  pdfText: {
    ...Platform.select({
      web: {
        fontSize: 12,
        fontWeight: "500",
        color: "#cb6a6a",
        marginLeft: 4,
      },
    }),
  },
  continueBtn: {
    flexDirection: "row",
    backgroundColor: "#ff5d73",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    elevation: 2,
    width: "65%",
    height: "8%",
    marginBottom: "2%",
    marginTop: "4%",
    marginLeft:"20%",
    justifyContent: "center",
    overflow: "hidden",
    ...Platform.select({
      web: {
        flexDirection: "row",
        backgroundColor: "#ff5d73",
        paddingVertical: 12,
        borderRadius: 30,
        elevation: 2,
        width: "35%",
        height: "8%",
          minWidth:180,
          maxWidth:200,
        marginBottom: 20,
        marginTop: 35,
        alignSelf:"flex-start",
          marginLeft:"0%",
      },
    }),
  },
  continueText: {
    color: "white",
      fontSize: 20,
      lineHeight:30,
    fontWeight: 600,
    paddingLeft: 45,
    paddingRight:10,
    ...Platform.select({
      web: {
        color: "white",
        fontWeight: "bold",
        paddingLeft: 45,
      },
    }),
  },
  iconCon: {
    width: 34,
    height: 34,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    marginLeft: "14%",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    ...Platform.select({
      web: {
        width: 34,
        height: 34,
        backgroundColor: "white",
        justifyContent: "center",
        borderRadius: 17,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  skipBtn: {
    backgroundColor: "#23c16b",
    padding:"4%",
    borderRadius: 8,
    alignItems: "center",
    width:168,
   alignSelf:"center",
    marginTop: "10%",
    ...Platform.select({
      web: {
        backgroundColor: "#23c16b",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        width: "12%",
        height: "8%",
          minWidth:150,
          maxWidth:300,
        marginTop: 10,
          alignSelf:"flex-start",
          alignItems: "center",
          justifyContent: "center",
      },
    }),
  },
  skipText: {
    color: "white",
    fontWeight: "bold",
    fontSize:18,
    lineHeight:24,
    ...Platform.select({
      web: {
        color: "white",
        fontWeight: "bold",

          fontSize:18,
      },
    }),
  },
  dropdownBox: {
    ...Platform.select({
      web: {
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
    }),
  },
  dropdownText: {
    ...Platform.select({
      web: {
        fontSize: 14,
        color: "#333",
      },
    }),
  },
  attachedIcons:{
    marginLeft:"6%",
  },
});

export default NewDoctorMedicalReg;
