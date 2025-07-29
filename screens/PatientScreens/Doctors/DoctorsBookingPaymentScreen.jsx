import { useCallback, useState, useEffect, useContext } from "react";
import {
  Alert,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
  ScrollView,
  Linking,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useChatbot } from "../../../contexts/ChatbotContext";
import { useFocusEffect } from "@react-navigation/native";
import SideBarNavigation from "../../../components/PatientScreenComponents/SideBarNavigation";
import { AuthContext } from "../../../contexts/AuthContext";
import { payment_api } from "../../../utils/PaymentService";
import Header from "../../../components/PatientScreenComponents/Header";
import Icon from "react-native-vector-icons/MaterialIcons";
import { API_URL } from "../../../env-vars";
// import Icon from 'react-native-vector-icons/FontAwesome';

const DoctorsBookingPaymentScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { setChatbotConfig } = useChatbot();
  const { width } = useWindowDimensions();
  const { user } = useContext(AuthContext);
  // const doctors = route?.params?.doctors || {};
  // const {selectedDate} = route?.params?.selectedDate || {};
  // const {selectedTimeSlot} = route?.params?.selectedTimeSlot || {};e
  const [booking, setBookings ] = useState();

  const { doctors, selectedDate, selectedTimeSlot } = route?.params;
  console.log("screen params →", route.params);

  const [freeConsultationUsed, setFreeConsultationUsed] = useState(false);
  const [consultationFee, setConsultationFee] = useState(0);

// Add this at the start of DoctorsBookingPaymentScreen
if (!doctors || !doctors.email) {
  return <Text>Error: Doctor information not available.</Text>;
}
  // useEffect(() => {
  //   if (!doctors) return;

  //   const fetchDoctorBookings = async () => {
  //     try {
  //       const res = await fetch(`${API_URL}/doctorBookings/fetchBookings`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           id: doctors.email,
  //           type: "doctor",
  //           days: 3,
  //         }),
  //       });

  //       const data = await res.json();
  //       if (res.ok) {
  //         setBookings(data.bookings || []);
  //       } else {
  //         console.error("Error fetching bookings", data.detail);
  //       }
  //     } catch (err) {
  //       console.error("Fetch error", err);
  //     } 
  //   };

  //   fetchDoctorBookings();
  // }, [doctors]);

  useFocusEffect(
    useCallback(() => {
      // Reset chatbot height when this screen is focused
      setChatbotConfig({ height: "32%" });
    }, [])
  );
  
  const handleContinuePayment = async () => {
    const amount = freeConsultationUsed ? consultationFee : 0;
    if (amount === 0) {
      setFreeConsultationUsed(true);
      // Navigate to next screen if no payment is required
      navigation.navigate("BookingConfirmationScreen", { slotBooked: true });
      return;
    }
    // Otherwise, proceed with payment
    Alert.alert("Processing Payment", "Redirecting to payment gateway...");
    try {
      await createBooking(bookingPayload);
      const paymentLink = await payment_api(amount);
      if (paymentLink) {
        Linking.openURL(paymentLink).catch((err) => {
          console.error("Failed to open payment link", err);
          Alert.alert(
            "Error",
            "Unable to open payment link. Please try again."
          );
        });
      }
    } catch (error) {
      Alert.alert("Payment Failed", error.message);
    }
  };

  return (
    <>
      {Platform.OS === "web" && width > 1000 && (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("../../../assets/Images/MedicineBackground.png")}
              style={styles.imageBackground}
            >
              <View
                style={[
                  styles.overlay,
                  { backgroundColor: "rgba(16, 16, 16, 0.3)" },
                ]}
              />

              <View style={styles.parent}>
                {/* Sidebar navigation */}
                <View style={styles.Left}>
                  <SideBarNavigation navigation={navigation} />
                </View>

                <View style={styles.Right}>
                  {/* Header section */}
                  <View style={styles.header}>
                    <Header navigation={navigation} />
                  </View>

                  {/* Main content area */}
                  <View style={styles.contentContainer}>
                    {/* Payment confirmation card */}
                    <View style={styles.paymentCard}>
                      <View style={styles.leftHalf}>
                        <View style={styles.paymentHeader}>
                          <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                          >
                            <MaterialIcons
                              name="arrow-back"
                              size={24}
                              color="#000"
                            />
                          </TouchableOpacity>
                          <Text style={styles.paymentTitle}>
                            Confirm and Pay
                          </Text>
                        </View>

                        <View style={styles.doctorSection}>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={styles.sectionLabel}>
                              Verified cardiologist online now
                            </Text>
                            <View
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: "green",
                                marginLeft: 6,
                                marginTop: 7,
                              }}
                            />
                          </View>
                          <View style={styles.doctorRow}>
                            <View style={styles.doctorAvatars}>
                              <Image
                                source={{ uri: doctors.profilePhoto }}
                                style={styles.doctorAvatarImage}
                                //resizeMode="cover"
                              />
                            </View>
                            <View style={styles.doctorInfo}>
                              <Text style={styles.doctorFullName}>
                                {doctors.doctorname}
                              </Text>
                              <Text style={styles.doctorSpecialization}>
                                {doctors.specialization}
                              </Text>
                              <Text style={styles.doctorExperience}>
                                {doctors.experience}
                              </Text>
                              <View style={styles.locationSection}>
                                <Icon
                                  name="location-on"
                                  size={18}
                                  color="rgba(22, 128, 236, 0.75)"
                                  style={styles.icon}
                                />
                                <Text style={styles.locationText}>
                                  {doctors.location}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={styles.doctorAppointmentSection}>
                            <Text style={styles.AppointmentLabel}>
                              Appointment Details
                            </Text>
                            <View style={styles.divider} />
                            <View style={styles.appointmentBox}>
                              <Icon
                                name="event" 
                                size={18}
                                color="rgba(255, 0, 0, 0.75)"
                                style={styles.appointmentIcon}
                              />
                              <View style={styles.date}>
                                <Text style={styles.dateText}>
                                  Appointment Date
                                </Text>
                                <Text style={styles.dateTimeText}>
                                  Date: {selectedDate || "N/A"}| Time:{" "}
                                  {selectedTimeSlot?.time || "N/A"}
                                </Text>
                              </View>
                            </View>
                            {/* <View style={styles.appointmentBox}>
                              <Icon
                                name="medical-services"
                                size={18}
                                color="rgba(255, 0, 0, 0.75)"
                                style={styles.appointmentIcon}
                              />
                              <View style={styles.date}>
                                <Text style={styles.dateText}>
                                  Appointment Mode
                                </Text>
                                <Text style={styles.dateTimeText}>
                                  {appointmentMode
                                    ? appointmentMode.charAt(0).toUpperCase() +
                                      appointmentMode.slice(1)
                                    : "N/A"}
                            
                                </Text>
                              </View>
                            </View> */}
                            {/* <View style={styles.appointmentBox}>
                              <Icon
                                name="medical-services"
                                size={18}
                                color="rgba(255, 0, 0, 0.75)"
                                style={styles.appointmentIcon}
                              />
                              <View style={styles.date}>
                                <Text style={styles.dateText}>
                                  {appointmentMode === "offline"
                                    ? "Address"
                                    : "Meeting Link"}
                                </Text>
                                <Text
                                  style={[
                                    styles.dateTimeText,
                                    { flexWrap: "wrap", width: 250 },
                                  ]}
                                >
                                  {appointmentMode === "offline"
                                    ? address || "N/A"
                                    : meetingLink || "N/A"}
                                  
                                </Text>
                              </View>
                            </View> */}
                          </View>
                        </View>
                      </View>
                      <View style={styles.verticalDivider} />
                      <View style={styles.rightHalf}>
                        <Text style={styles.rightHeading}>Booking Summary</Text>
                        <View style={styles.formSection}>
                          <View style={styles.freeBox}>
                            <View style={styles.freeText}>
                              <Text style={styles.freeConsultationText}>
                                Consultation Fee
                              </Text>
                              <Text style={styles.subConsultationText}>
                                {freeConsultationUsed
                                  ? `₹${consultationFee} / Per month`
                                  : "Free First Consultation"}
                              </Text>
                            </View>
                            <View style={styles.freeWord}>
                              <Text style={styles.freeWordText}>
                                {freeConsultationUsed
                                  ? `₹${consultationFee}`
                                  : "Free"}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.rightDivider} />
                          <View style={styles.totalBox}>
                            <View style={styles.totalText}>
                              <Text style={styles.totalConsultationText}>
                                Total
                              </Text>
                              <Text style={styles.subTotalConsultationText}>
                                All Tax Include
                              </Text>
                            </View>
                            <View style={styles.zeroWord}>
                              <Text style={styles.zeroWordText}>00.00</Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.policyBox}>
                          <Text style={styles.policyText}>
                            By booking Appointment, you are agreeing to&nbsp;
                            <Text
                              style={styles.linkText}
                              onPress={() =>
                                navigation.navigate("Terms and Conditions")
                              }
                            >
                              Terms and Conditions
                            </Text>
                            &nbsp;of the usage of 24x7&nbsp;
                            <Text
                              style={styles.linkText}
                              onPress={() =>
                                navigation.navigate("Privacy Policy")
                              }
                            >
                              Privacy Policy
                            </Text>
                            ,&nbsp;
                            <Text
                              style={styles.linkText}
                              onPress={() =>
                                navigation.navigate("Refund Policy")
                              }
                            >
                              Refund Policy
                            </Text>
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.paymentButton}
                          onPress={handleContinuePayment}
                        >
                          <Text style={styles.paymentButtonText}>
                            Continue to Book
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      )}

      {(Platform.OS !== "web" || width < 1000) && (
        <View style={styles.mobileContainerWrapper}>
          <StatusBar barStyle="light-content" backgroundColor="#fff" />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.mobileContainer}>
              {/* Header with back button and title */}
              <View style={styles.doctorInfoContainer}>
                <TouchableOpacity style={styles.profileButton}>
                  <Image
                    source={{ uri: doctors.profilePhoto }}
                    style={styles.profileImagei}
                  />
                  <MaterialIcons
                    name="arrow-drop-down"
                    size={24}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Text style={styles.doctorName}>{doctors.doctorname}</Text>
                <Text style={styles.doctorSpecialty}>
                  ({doctors.doctorSpecialization})
                </Text>
              </View>

              {/* Doctor Info Section */}
              <View style={styles.mobileHeader}>
                <Text style={styles.sectionTitle}>Appointment</Text>
              </View>

              {/* Patient Info Section */}
              <View style={styles.patientInfoCard}>
                <Text style={styles.sectionTitle}>Patient Info</Text>
                <View style={styles.patientInfo}>
                  <View style={styles.patientInfoRow}>
                    <Image
                      source={
                        user?.picture
                          ? { uri: user.picture }
                          : require("../../../assets/Images/user-icon.jpg")
                      }
                      style={styles.patientImage}
                    />
                    <View style={styles.patientDetails}>
                      <Text style={styles.patientName}>
                        {user?.name ? user?.name : "User"}
                      </Text>
                      <Text style={styles.noteText}>
                        Note: Please Upload Patient Details In the Drop Link
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.uploadButton}>
                    <Image
                      source={require("../../../assets/Images/Medilockerfile.jpg")}
                      style={{ width: 18, height: 18 }}
                    />

                    <Text style={styles.uploadButtonText}>
                      Upload from Medilocker
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Schedule Section */}
              <Text style={styles.sectionTitleOutside}>Schedule</Text>
              <View style={styles.scheduleContainer}>
                <View style={styles.scheduleHeader}>
                  <Text style={styles.scheduleHeaderText}>Time</Text>
                  <Text style={styles.scheduleHeaderText}>Date</Text>
                </View>
                <View style={styles.scheduleContent}>
                  <View style={styles.scheduleTimeContainer}>
                    <MaterialIcons name="access-time" size={18} color="#555" />
                    <Text style={styles.scheduleTimeText}>
                      {time ? time : "Time N/A"}
                    </Text>
                  </View>
                  <View style={styles.scheduleDateContainer}>
                    <MaterialIcons name="event" size={18} color="#555" />
                    <Text style={styles.scheduleDateText}>
                      {date ? date : "Date N/A"}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Payment Section */}
              <Text style={styles.sectionTitleOutside}>Payment</Text>
              <View style={styles.billDetails}>
                <Text style={styles.billTitle}>Bill Details</Text>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Consultation fees:</Text>
                  <Text style={styles.billValue}>₹{doctors.fee}</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Booking Fee</Text>
                  <Text style={styles.billValue}>₹50</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Promo Applied:</Text>
                  <Text style={styles.billValue}>₹0</Text>
                </View>
                <View style={[styles.billRow, styles.totalRow]}>
                  <Text style={[styles.billLabel, styles.totalLabel]}>
                    Total Pay
                  </Text>
                  <Text style={[styles.billValue, styles.totalValue]}>
                    ₹{doctors.fee + 50}
                  </Text>
                </View>
              </View>

              {/* Continue Button */}
              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => {
                  handleContinuePayment(doctors.fee + 50);
                }}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    height: "100%",
    width: "100%",
  },
  imageBackground: {
    flex: 1,
    height: "100%",
    width: "100%",
    borderWidth: 1,
    opacity: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  parent: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  Left: {
    height: "100%",
    width: "15%",
    backgroundColor: "#f5f5f5",
  },
  Right: {
    height: "100%",
    width: "85%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    // borderWidth: 5,
    // borderColor: "black",
    zIndex: 2,
    ...Platform.select({
      web: {
        width: "100%",
        marginBottom: 20,
      },
    }),
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  profileImagei: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(138, 112, 255, 0.8)",
    marginLeft: "8%",
    marginRight: "8%",
    marginBottom: "8%",
  },
  paymentCard: {
    width: "70%",
    height: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between", // Distribute space between left and right halves
    alignItems: "stretch",
  },
  paymentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  doctorSection: {
    marginBottom: "2%",
  },
  doctorRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  sectionLabel: {
    fontSize: 15,
    color: "rgb(0,0,0)",
    marginBottom: 10,
  },
  // doctorAvatars: {
  //   height: 50,
  //   width: 50,
  //   borderWidth: 1,
  //   borderRadius: 25,
  // },
  doctorAvatar: {
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#ff7072",
    overflow: "hidden",
  },
  doctorAvatarImage: {
    width: 50,
    height: 50,
    borderRadius:50
  },
  doctorInfo: {
    marginLeft: "5%",
    marginTop: "0%",
    flexDirection: "column",
  },
  doctorFullName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: "1%",
  },
  doctorSpecialization: {
    fontFamily: "Poppins",
    weight: 400,
    fontSize: 14,
    color: "#888888",
    marginTop: "2%",
    marginBottom: "2%",
    marginLeft: "2%",
  },
  doctorExperience: {
    fontFamily: "Poppins",
    weight: 400,
    fontSize: 14,
    color: "#888888",
    marginLeft: "2%",
  },
  locationSection: {
    //borderWidth: 1,
    height: "30%",
    width: "90%",
    marginTop: "3%",
    flexDirection: "row",
  },
  AppointmentLabel: {
    weight: 300,
    fontSize: 16,
    marginTop: "3%",
  },
  doctorAppointmentSection: {
    marginLeft: "6%",
    marginTop: "6%",
  },
  dateTimeText: {
    fontFamily: "Poppins",
    fontWeight: 200,
  },
  appointmentBox: {
    flexDirection: "row",
    marginBottom: "4%",
  },
  icon: {
    marginTop: "1%",
  },
  locationText: {
    fontSize: 14,
    fontWeight: 500,
    color: "rgba(136, 136, 136, 1)",
    marginLeft: "2%",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    width: "80%",
    marginTop: 8,
    marginBottom: "3%",
    marginLeft: "4%",
  },
  appointmentIcon: {
    size: 18,
    marginLeft: "5%",
  },
  dateText: {
    fontFamily: "Poppins",
    weight: 400,
    fontSize: 14,
    color: "#888888",
    marginBottom: 4,
  },
  rightHeading: {
    fontSize: 15,
    color: "#FF7072",
    marginLeft: "15%",
    marginTop: "25%",
    fontWeight: 400,
  },
  date: {
    marginLeft: "3%",
  },
  leftHalf: {
    flex: 1, // This makes it take up half the available space
    // Add padding inside leftHalf if needed
    paddingRight: 10, // Add some padding to separate from the vertical divider
  },
  verticalDivider: {
    width: 1,
    backgroundColor: "#bdbdbd",
    marginHorizontal: 10, // Adjust as needed for spacing around the divider
    height: "100%", // Make the divider span the full height of the card
    alignSelf: "stretch", // Ensure it stretches vertically
  },
  rightHalf: {
    flex: 1, // This makes it take up the other half of the available space
    flexDirection: "column", // Keep as column for vertical stacking within rightHalf
    // Push "Booking Summary" to top, button to bottom// Align contents to the right
    // Add padding inside rightHalf if needed
    paddingLeft: 10, // Add some padding to separate from the vertical divider
  },
  freeBox: {
    flexDirection: "row",
    marginLeft: "15%",
    marginTop: "5%",
  },
  freeConsultationText: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 15,
  },
  subConsultationText: {
    color: "#888888",
  },
  freeWord: {
    marginLeft: "20%",
  },
  freeWordText: {
    fontSize: 15,
    fontFamily: "Poppins",
  },
  totalBox: {
    flexDirection: "row",
    marginLeft: "15%",
    marginTop: "4%",
  },
  totalConsultationText: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: 15,
  },
  subTotalConsultationText: {
    color: "#888888",
  },
  zeroWord: {
    marginLeft: "35%",
  },
  zeroWordText: {
    fontSize: 15,
    fontFamily: "Poppins",
  },
  rightDivider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    width: "80%",
    marginTop: "5%",
    marginBottom: "3%",
    marginLeft: "7%",
  },
  policyText: {
    fontSize: 12,
    fontFamily: "Poppins",
    color: "#888888",
  },
  policyBox: {
    width: "60%",
    marginLeft: "20%",
    marginBottom: "6%",
  },
  linkText: {
    textDecorationLine: "underline",
  },
  formSection: {
    flexDirection: "column",
    flex: 1,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    color: "#000",
    marginBottom: 8,
  },
  applicableText: {
    marginBottom: "4%",
    color: "#888888",
    fontSize: 10,
    fontWeight: 400,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 14,
  },
  feeAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  paymentButton: {
    backgroundColor: "#ff7072",
    paddingVertical: 12,
    alignItems: "center",
    width: "60%",
    alignSelf: "center",
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  // Mobile styles
  mobileContainerWrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  mobileContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingHorizontal: "5%",
    marginTop: 5,
    paddingTop: "1%",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  mobileHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "1%",
    paddingHorizontal: "2%",
    width: "100%",
    marginBottom: "1%",
  },
  mobileHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: "4%",
  },
  doctorInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "5%",
    width: "100%",
  },
  doctorName: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  patientInfoCard: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: "4%",
    marginBottom: "2.5%",
    width: "100%",
    shadowColor: "#000",
    overflow: "hidden",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: "3%",
    color: "#333",
  },
  sectionTitleOutside: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: "2%",
    marginTop: "2%",
    color: "#333",
  },
  patientInfoRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: "3%",
  },
  patientImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  patientDetails: {
    flex: 1,
    justifyContent: "center",
  },
  patientInfo: {
    display: "flex",
    flexDirection: "column",
    padding: "2.5%",
    width: "100%",
  },
  noteText: {
    fontSize: 14,
    color: "#ff7a7a",
    marginTop: "2%",
    width: "100%",
  },
  uploadButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: "2.5%",
    borderRadius: 25,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#DADADA",
    marginTop: "1.5%",
    width: "90%",
  },
  uploadButtonText: {
    color: "#333",
    marginLeft: 8,
    fontSize: 14,
  },
  scheduleContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: "2.5%",
    shadowColor: "#000",
    overflow: "hidden",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#fff",
  },
  scheduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    backgroundColor: "#fff",
  },
  scheduleHeaderText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  scheduleContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    backgroundColor: "#fff",
  },
  scheduleTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleTimeText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "500",
  },
  scheduleDateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleDateText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "500",
  },
  billDetails: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "2.5%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 15,
    overflow: "hidden",
    width: "100%",
    shadowColor: "#000",
    overflow: "hidden",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "#fff",
  },
  billTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: "3%",
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  billRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "3%",
    paddingVertical: "2.5%",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    width: "100%",
  },
  billLabel: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
  billValue: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right",
  },

  totalRow: {
    marginTop: 0,
    paddingTop: "2.5%",
    paddingBottom: "2.5%",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#f9f9f9",
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  totalValue: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  continueButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff7a7a",
    padding: "2%",
    borderRadius: 10,
    marginVertical: "6%",
    marginHorizontal: "5%",
    width: "90%",
    alignSelf: "center",
    ...Platform.select({
      web: {
        marginVertical: 0,
      },
    }),
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DoctorsBookingPaymentScreen;
