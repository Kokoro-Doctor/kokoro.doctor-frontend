import React, { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Alert,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Linking,
  Keyboard,
  Platform,
  useWindowDimensions
} from "react-native";
import { useRoute } from "@react-navigation/native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useChatbot } from "../../contexts/ChatbotContext";
import { useFocusEffect } from "@react-navigation/native";
import SideBarNavigation from "../../components/SideBarNavigation";
import Header from "../../components/Header";

const HospitalsInfoWithRating = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { setChatbotConfig } = useChatbot();
  const phoneNumber = "+918069991061";
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const route = useRoute();
  const Hospitals = route.params?.Hospitals || {}; // Get Hospital data from navigation

  useFocusEffect(
    useCallback(() => {
      // Reset chatbot height when this screen is focused
      setChatbotConfig({ height: "32%" });
    }, [])
  );

  const handleSearch = () => {
    Alert.alert(`Search Results for: ${searchQuery}`);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTimeSlot(time);
  };

  // Function to handle redirection for booking
  const handleBooking = (timeSlot, HospitalData, HospitalDetail) => {
    setSelectedTimeSlot(timeSlot);
    // Navigate to a payment page passing the data through the route params
    navigation.navigate(
      "BookHospitals"
      //EXAMPLE OF HOW TO PASS DATA AS A ROUTE PARAM
      // , {
      // HospitalName: HospitalData.name,
      // HospitalCredentials: HospitalData.credentials,
      // hospitalName: HospitalDetail.name,
      // date: selectedDate,
      // timeSlot: timeSlot,
      // fee: HospitalDetail.fee,
      // }
    );
  };

  const HospitalData = {
    name: "Apollo Multispeciality Hospital",
    credentials: "HSR Layout",
    experience: "Trusted Since 1983",
    rating: 4.5,
    profileImage: require("../../assets/Images/HospitalImage.jpg"),
    bio: "Apollo Hospitals is a leading healthcare provider in India, founded in 1983 by Dr. Prathap C. Reddy. It offers a wide range of medical services, including surgery, diagnostics, and specialized care in fields like cardiology and oncology. Known for its advanced technology and high-quality patient care, Apollo operates numerous hospitals across India and internationally. It also has a strong presence in telemedicine and healthcare insurance.",
    reviews: [
      { id: 1, rating: 5, text: "Very good Hospital", reviewer: "Mr Donald" },
      { id: 2, rating: 5, text: "Very good Hospital", reviewer: "Mr Donald" },
      { id: 3, rating: 5, text: "Very good Hospital", reviewer: "Mr Donald" },
    ],
  };

  const HospitalDetail = {
    name: "Visit Hospital",
    fee: "$499 fee",
    waitTime: "Max 15 min wait",
    layout: "Hsr Layout",
  };

  const availableDates = [
    { id: "today", label: "Today", slotsAvailable: 0 },
    { id: "tomorrow", label: "Tomorrow", slotsAvailable: 2 },
    { id: "dayAfter", label: "Mon, 2 feb", slotsAvailable: 2 },
  ];

  const timeSlots = {
    morning: { label: "Morning (1 slot)", slots: ["10:30 AM"] },
    afternoon: { label: "Afternoon (1 slot)", slots: ["12:30 PM"] },
  };

  return (
    <>
      {Platform.OS === "web" && width > 1000 && (
        <View style={styles.webContainer}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("../../assets/Images/MedicineBackground.png")}
              style={styles.imageBackground}
            >
              <View style={[styles.overlay,]} />

              <View style={styles.parent}>
                {/* Keeping the existing sidebar navigation as requested */}
                <View style={styles.Left}>
                  <SideBarNavigation navigation={navigation} />
                </View>

                <View style={styles.Right}>
                  <View style={styles.header}>
                    <Header navigation={navigation} />
                  </View>

                  <View style={styles.contentContainer}>
                    {/* Hospital profile card */}
                    <View style={styles.HospitalProfileCard}>
                      <View style={styles.HospitalLeftSection}>
                        <Image
                          source={HospitalData.profileImage}
                          style={styles.HospitalImage}
                        />
                        <View style={styles.ratingContainer}>
                          <MaterialIcons
                            name="star"
                            size={20}
                            color="#FFD700"
                          />
                          <Text style={styles.ratingText}>
                            {HospitalData.rating}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.HospitalInfoSection}>
                        <Text style={styles.HospitalName}>{HospitalData.name}</Text>
                        <Text style={styles.HospitalCredentials}>
                          {HospitalData.credentials}
                        </Text>
                        <Text style={styles.HospitalExperience}>
                          {HospitalData.experience}
                        </Text>
                        <Text style={styles.HospitalBio}>{HospitalData.bio}</Text>

                        <View style={styles.reviewsSection}>
                          <Text style={styles.reviewsTitle}>User Reviews</Text>
                          <View style={styles.reviewsList}>
                            {HospitalData.reviews.map((review) => (
                              <View key={review.id} style={styles.reviewCard}>
                                <Text style={styles.reviewText}>
                                  {review.text}
                                </Text>
                                <View style={styles.reviewerContainer}>
                                  <MaterialIcons
                                    name="star"
                                    size={16}
                                    color="#FFD700"
                                  />
                                  <MaterialIcons
                                    name="star"
                                    size={16}
                                    color="#FFD700"
                                  />
                                  <MaterialIcons
                                    name="star"
                                    size={16}
                                    color="#FFD700"
                                  />
                                  <MaterialIcons
                                    name="star"
                                    size={16}
                                    color="#FFD700"
                                  />
                                  <MaterialIcons
                                    name="star"
                                    size={16}
                                    color="#FFD700"
                                  />
                                  <Text style={styles.reviewerName}>
                                    {review.reviewer}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    </View>

                    {/* Appointment booking section */}
                    <View style={styles.appointmentSection}>
                      <View style={styles.appointmentHeader}>
                        <Text style={styles.appointmentTitle}>
                          BooK Hospital
                        </Text>
                        <Text style={styles.appointmentFee}>
                          {HospitalDetail.fee}
                        </Text>
                      </View>

                      <View style={styles.HospitalDetails}>
                        <Text style={styles.hospitalName}>{HospitalDetail.name}</Text>
                        <Text style={styles.hospitalWaitTime}>
                          {HospitalDetail.waitTime}
                        </Text>
                        <Text style={styles.hospitalLocation}>
                          {HospitalDetail.layout}
                        </Text>
                      </View>

                      <View style={styles.dateSelector}>
                        {availableDates.map((date) => (
                          <TouchableOpacity
                            key={date.id}
                            style={[
                              styles.dateOption,
                              selectedDate === date.label &&
                              styles.selectedDate,
                            ]}
                            onPress={() => handleDateSelect(date.label)}
                          >
                            <Text style={styles.dateLabel}>{date.label}</Text>
                            <Text style={styles.slotsAvailable}>
                              {date.slotsAvailable > 0
                                ? `${date.slotsAvailable} slots Available`
                                : "No slot today"}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>

                      <View style={styles.timeSlotSection}>
                        <View style={styles.timeSlotsGroup}>
                          <Text style={styles.timeGroupLabel}>
                            {timeSlots.morning.label}
                          </Text>
                          <View style={styles.timeSlotsContainer}>
                            {timeSlots.morning.slots.map((time) => (
                              <TouchableOpacity
                                key={time}
                                style={[
                                  styles.timeSlot,
                                  selectedTimeSlot === time &&
                                  styles.selectedTimeSlot,
                                ]}
                                onPress={() =>
                                  handleBooking(time, HospitalData, HospitalDetail)
                                }
                              >
                                <Text style={styles.timeSlotText}>{time}</Text>
                                <Text style={styles.bookNowText}>Book Now</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>

                        <View style={styles.timeSlotsGroup}>
                          <Text style={styles.timeGroupLabel}>
                            {timeSlots.afternoon.label}
                          </Text>
                          <View style={styles.timeSlotsContainer}>
                            {timeSlots.afternoon.slots.map((time) => (
                              <TouchableOpacity
                                key={time}
                                style={[
                                  styles.timeSlot,
                                  selectedTimeSlot === time &&
                                  styles.selectedTimeSlot,
                                ]}
                                onPress={() =>
                                  handleBooking(time, HospitalData, HospitalDetail)
                                }
                              >
                                <Text style={styles.timeSlotText}>{time}</Text>
                                <Text style={styles.bookNowText}>Book Now</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
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
        <View style={styles.app_parent}>
          <View style={styles.app_hospitalImage}>
            <Image
              source={require("../../assets/Images/hospitalImage.jpeg")}
              style={styles.app_image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.app_hospitalDetails}>
            <View style={styles.app_hospitalDetailsContainer1}>
              <View style={styles.app_hospitalDetailsContainer1Top}>
                <Text style={styles.app_hospitalname}>Apollo Hospital</Text>
                <Text style={styles.app_hospitaltype}>Multispecialty</Text>
              </View>
              <View style={styles.app_hospitalDetailsContainer1Bottom}>
                <View style={styles.app_distanceconatiner}>
                  <Text style={styles.app_distanceHeading}>Distance</Text>
                  <Text style={styles.app_distanceAway}>2.3 km away</Text>
                </View>
                <View style={styles.app_arrivalContainer}>
                  <Text style={styles.app_arrivalHeading}>Arrival time</Text>
                  <Text style={styles.app_arrivingIn}>Reaches in 10 min</Text>
                </View>
              </View>
            </View>
            <View style={styles.app_hospitalDetailsContainer2}>
              <TouchableOpacity>
                <Icon
                  style={styles.app_icondesign}
                  name="call-outline"
                  size={30}
                  color="#FF7072"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.app_bedReviewContainer}>
            <View style={styles.app_emergencyBed}>
              <Image source={require("../../assets/Icons/hospital-bed.png")} />
              <View style={styles.app_emergencyBedBody}>
                <Text style={styles.app_bedHeading}>Emergency Beds </Text>
                <Text style={styles.app_bedAvailability}>
                  Emergenecy Beds Avialable{" "}
                </Text>
              </View>
            </View>
            <View style={styles.app_review}>
              <Icon style={styles.app_starIcon} name="star" size={30} color="#FFD500" />
              <View style={styles.app_emergencyBedBody}>
                <Text style={styles.app_bedHeading}>Rating & Reviews </Text>
                <Text style={styles.app_bedAvailability}>4.9 (5000)</Text>
              </View>
            </View>
          </View>
          <View style={styles.app_serviceheadingContainer}>
            <Text style={styles.app_serviceheading}>Services & Availability</Text>
          </View>
          <View style={styles.app_footerBox}>
            <View style={styles.app_footerBoxRow1}>
              <View style={styles.app_box1}>
                <Image source={require("../../assets/Icons/hospital-bed.png")} />

                <View style={styles.app_box1Body}>
                  <Text>Emergency Bed</Text>
                  <Text style={styles.app_text2}>5 Bed Available</Text>
                </View>
              </View>
              <View style={styles.app_box1}>
                <Image source={require("../../assets/Icons/ambulance.png")} />

                <View style={styles.app_box1Body}>
                  <Text>Ambulance Service</Text>
                </View>
              </View>
              <View style={styles.app_box1}>
                <Image source={require("../../assets/Icons/time.png")} />

                <View style={styles.app_box1Body}>
                  <Text>Waiting Time</Text>
                  <Text style={styles.app_text2}>15 min average wait</Text>
                </View>
              </View>
            </View>
            <View style={styles.app_footerBoxRow2}>
              <View style={styles.app_box1}>
                <Image source={require("../../assets/Icons/papers.png")} />

                <View style={styles.app_box1Body}>
                  <Text>Processing Speed</Text>
                  <Text style={styles.app_text2}>Paperless check-in available</Text>
                </View>
              </View>
              <View style={styles.app_box1}>
                <Image source={require("../../assets/Icons/insurance.png")} />

                <View style={styles.app_box1Body}>
                  <Text>Insurance</Text>
                </View>
              </View>
              <View style={styles.app_box1}>
                <Image source={require("../../assets/Icons/payment.png")} />

                <View style={styles.app_box1Body}>
                  <Text style={styles.app_text1}>Payment Options</Text>
                  <Text style={styles.app_text2}>All type Accepted</Text>
                </View>
              </View>
            </View>
            <View style={styles.app_availabilityButtonConatiner}>
              <TouchableOpacity onPress={() => navigation.navigate("HospitalAvailability")}>
                <View style={styles.app_availabilityButton}>
                  {/* <TouchableOpacity  onPress={() => navigation.navigate("HospitalAvailability")}> */}
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                      View Availability
                    </Text>
                    <Icon name="chevron-forward" size={20} color="#fff" />
                  </View>
                  {/* </TouchableOpacity> */}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.app_bookhospitalButtoncontainer}>
            <TouchableOpacity onPress={() => navigation.navigate("BookHospitals")}>
              <View style={styles.app_bookhospitalButton}>
                <Text style={styles.app_bookHospitalText}>Book Hospital</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>


      )}
    </>
  );
};

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  appContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "column",
  },

  imageContainer: {
    height: "17%",
    width: "75%",
    //borderWidth: 1,
    marginVertical: "15%",
    marginBottom: "5%",
    alignSelf: "center",
    ...Platform.select({
      web: {
        height: "100%",
        width: "100%",
        marginBottom: "15%",
      },
    }),
  },
  experienceRatingContainer: {
    height: "7%",
    width: "88%",
    //borderWidth: 1,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 5,
    boxShadow: " 0px 0px 4px 3px rgba(0, 0, 0, 0.25)",
    backgroundColor: "rgba(255, 252, 252, 1)",
    padding: "2%",
  },
  experienceSection: {
    height: "100%",
    width: "49%",
    //borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  HospitalIcon: {
    alignSelf: "center",
    height: 28,
    width: 28,
    marginHorizontal: "3%",
  },
  experienceDetail: {
    height: "94%",
    width: "78%",
    //borderWidth: 1,
    alignSelf: "center",
    flexDirection: "column",
  },
  experienceText: {
    fontSize: 14,
    fontWeight: 600,
    color: " rgb(94, 93, 93)",
    paddingHorizontal: "4%",
  },
  experience: {
    fontSize: 14,
    fontWeight: 600,
    color: "#000000",
    paddingHorizontal: "4%",
  },
  verticalLine: {
    height: "75%",
    width: "0.4%",
    //borderWidth:1,
    alignSelf: "center",
    backgroundColor: "#000000",
  },
  ratingSection: {
    height: "100%",
    width: "48.8%",
    //borderWidth: 1,
    flexDirection: "row",
  },
  rating: {
    fontSize: 14,
    fontWeight: 600,
    color: "#000000",
    alignSelf: "center",
  },
  consultationFess: {
    height: "7%",
    width: "88%",
    //borderWidth:1,
    alignSelf: "center",
    marginVertical: "2.5%",
    borderRadius: 5,
    boxShadow: " 0px 0px 4px 3px rgba(0, 0, 0, 0.25)",
    backgroundColor: "rgba(255, 252, 252, 1)",
    flexDirection: "row",
    paddingHorizontal: "2%",
  },
  iconBox: {
    height: "52%",
    width: "9%",
    //borderWidth: 1,
    alignSelf: "center",
    borderRadius: 40,
    backgroundColor: "#D9D9D9",
  },
  dollarIcon: {
    height: 20,
    width: 11,
    alignSelf: "center",
    marginVertical: "16%",
  },
  feesBox: {
    height: "90%",
    width: "60%",
    //borderWidth: 1,
    marginHorizontal: "3.5%",
    alignSelf: "center",
    flexDirection: "column",
  },
  fees: {
    fontSize: 16,
    fontWeight: 600,
    color: "#000000",
    paddingVertical: "1%",
  },
  feesText: {
    fontSize: 14,
    fontWeight: 600,
    color: " rgb(94, 93, 93)",
  },
  availabilityContainer: {
    height: "38%",
    width: "88%",
    borderWidth: 1,
    alignSelf: "center",
    marginVertical: "8%",
  },
  availabilityTimeText: {
    fontSize: 13,
    fontWeight: 600,
    color: "#444444",
    paddingHorizontal: "2%",
  },
  bookAppointmentButton: {
    height: "5%",
    width: "70%",
    //borderWidth: 1,
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "rgb(243, 119, 119)",
    marginVertical: "3%",
  },
  bookAppointmentText: {
    alignSelf: "center",
    paddingVertical: "3.5%",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 600,
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
      }
    })
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(138, 112, 255, 0.8)",
    marginBottom: "10%",
    borderRadius: 20,
    overflow: "hidden",
  },
  HospitalProfileCard: {
    width: "60%",
    height: "80%",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    margin: 10,
  },
  HospitalLeftSection: {
    width: "20%",
    alignItems: "center",
  },
  HospitalImage: {
    height: 90,
    width: 90,
    alignSelf: "center",
    borderRadius: 40,
    ...Platform.select({
      web: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
      },
    }),
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 600,
    color: " rgb(94, 93, 93)",
    paddingHorizontal: "4%",
    ...Platform.select({
      web: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "bold",
      },
    }),
  },
  HospitalInfoSection: {
    width: "80%",
    paddingLeft: 20,
  },
  HospitalName: {
    fontSize: 22,
    fontWeight: 600,
    color: "#000000",
    alignSelf: "center",
    ...Platform.select({
      web: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
      },
    }),
  },
  HospitalCredentials: {
    fontSize: 14,
    alignSelf: "center",
    fontWeight: 600,
    ...Platform.select({
      web: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
      },
    }),
  },
  HospitalExperience: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
    marginBottom: 10,
  },
  HospitalBio: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 15,
  },
  reviewsSection: {
    marginTop: 10,
  },
  reviewsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewsList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewCard: {
    width: "30%",
    backgroundColor: "#ffebee",
    borderRadius: 10,
    padding: 10,
  },
  reviewText: {
    fontSize: 12,
    color: "#333",
    marginBottom: 5,
  },
  reviewerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  reviewerName: {
    fontSize: 10,
    color: "#666",
    marginLeft: 5,
  },
  appointmentSection: {
    width: "35%",
    backgroundColor: "#fff",
    borderRadius: 20,
    margin: 10,
    padding: 20,
  },
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff7072",
  },
  appointmentFee: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff7072",
  },
  HospitalDetails: {
    marginBottom: 20,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  hospitalWaitTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  hospitalLocation: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateOption: {
    width: "30%",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  selectedDate: {
    borderBottomColor: "#ff7072",
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  slotsAvailable: {
    fontSize: 12,
    color: "#388e3c",
    marginTop: 5,
  },
  timeSlotSection: {
    marginTop: 10,
  },
  timeSlotsGroup: {
    marginBottom: 20,
  },
  timeGroupLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  timeSlotsContainer: {
    flexDirection: "row",
  },
  timeSlot: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedTimeSlot: {
    backgroundColor: "#e0f2f1",
    borderWidth: 1,
    borderColor: "#80cbc4",
  },
  timeSlotText: {
    fontSize: 14,
    color: "#333",
  },

  // ..........APP design starts here


  app_parent: {
    height: "100%",
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  app_hospitalImage: {
    height: "25%",
    width: "100%",

    ...Platform.select({
      web: {
        width: "100%",
        height: "28%",
        // paddingTop: 5,

      },
    }),

  },
  app_image: {
    height: "100%",
    width: "100%",
  },
  app_hospitalDetails: {
    height: "15%",
    width: "100%",
    padding: "5%",
    flexDirection: "row",
  },
  app_hospitalDetailsContainer1: {
    width: "65%",
    height: "100%",
    // backgroundColor:"blue",
  },
  app_hospitalDetailsContainer1Top: {
    width: "100%",
    height: "50%",
    // backgroundColor:"yellow",
  },
  app_hospitalname: {
    fontSize: 24,
    fontStyle: "Poppins",
    fontWeight: "bold",
  },
  app_hospitaltype: {
    fontSize: 14,
    fontStyle: "Poppins",
    fontWeight: "bold",
  },

  app_hospitalDetailsContainer1Bottom: {

    width: "80%",
    height: "50%",
    ...Platform.select({
      web: {
        marginTop: "4%",
        gap: 5,

      },
    }),

    // backgroundColor:"red",
  },

  app_distanceconatiner: {
    height: "50%",
    width: "100%",
    paddingTop: "2%",
    flexDirection: "row",
    paddingRight: "30%",
    justifyContent: "space-between",
  },
  app_distanceHeading: {
    fontStyle: "Sunflower",
    fontSize: 14,
    fontWeight: 300,
    color: "#9B9A9A",
  },
  app_distanceAway: {
    fontStyle: "Poppins",
    fontSize: 10,
    fontWeight: 300,
    color: "#FF0000",
  },

  app_arrivalContainer: {
    height: "50%",
    width: "100%",
    flexDirection: "row",
    paddingRight: "15%",
    ...Platform.select({
      web: {
        paddingRight: "20%",

      },
    }),
    justifyContent: "space-between",
  },
  app_arrivalHeading: {
    fontStyle: "Sunflower",
    fontSize: 14,
    fontWeight: 300,
    color: "#9B9A9A",
  },
  app_arrivingIn: {
    fontStyle: "Poppins",
    fontSize: 10,
    fontWeight: 300,
    color: "#2CBE5E",
  },

  app_hospitalDetailsContainer2: {
    width: "35%",
    height: "100%",
    // backgroundColor:"yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  app_icondesign: {
    padding: 10,
    borderWidth: 5,
    borderColor: "#F4F3F3",
    borderRadius: 50,
    backgroundColor: "#FFFF",
  },
  app_bedReviewContainer: {
    width: "85%",
    height: "8%",
    marginLeft: "7.5%",
    flexDirection: "row",
    backgroundColor: "#FFFCFC",
    borderRadius: 5,

    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
  },
  app_emergencyBed: {
    width: "50%",
    height: "100%",
    paddingLeft: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRightWidth: 1,
  },
  app_emergencyBedBody: {
    width: "80%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 8,
  },
  app_bedHeading: {
    fontStyle: "Poppins",
    fontSize: 16,
    fontWeight: "bold",
    padding: "1%",
    color: "#444444",
  },
  app_bedAvailability: {
    fontStyle: "Poppins",
    fontSize: 10,
    padding: "1%",
    color: "#444444",
  },
  app_review: {
    width: "50%",
    height: "100%",
    paddingLeft: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  app_serviceheadingContainer: {
    width: "85%",
    height: "4%",
    justifyContent: "center",
    marginLeft: "7.5%",
    // backgroundColor: "red",
  },
  app_serviceheading: {
    fontSize: 12,
    fontWeight: 600,
  },
  app_footerBox: {
    width: "85%",
    height: "35%",
    marginLeft: "7.5%",
    padding: "2%",
    backgroundColor: "#FFFCFC",
    borderRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    gap: "2%",
    backgroundColor: "#FFFFFF",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
  },
  app_footerBoxRow1: {
    width: "94%",
    height: "33%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    // backgroundColor:"yellow",
    gap: "1.5%",
  },
  app_box1: {
    width: "35%",
    height: "100%",
    padding: "2%",
    borderRadius: "5%",
    justifyContent: "space-between",
    backgroundColor: "#F1F1F1",
    flexWrap: "wrap",
  },
  app_footerBoxRow2: {
    width: "94%",
    height: "40%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1.5%",
  },
  app_text2: {
    fontSize: 8,
  },


  app_availabilityButtonConatiner: {
    width: "100%",
    height: "18%",
    padding: "1%",
    justifyContent: "center",
    // backgroundColor: "yellow",
  },
  app_availabilityButton: {
    width: "80%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10%",
    borderRadius: 5,
    padding: "1%",
    backgroundColor: "#FF7373",
  },
  app_bookhospitalButtoncontainer: {
    width: "100%",
    height: "10%",
    ...Platform.select({
      web: {
        height: "15%"

      },
    }),

    justifyContent: "center",
    alignContent: "center",
    //backgroundColor:"red",
  },
  app_bookhospitalButton: {
    width: "70%",
    height: "65%",
    ...Platform.select({
      web: {
        height: "100%",
        padding: 5,

      },
    }),
    marginLeft: "16.5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "2%",
    backgroundColor: "#FF7373",
  },
  app_bookHospitalText: {
    fontSize: 14,
    fontWeight: 600,
    color: "#fff",
  },



});

export default HospitalsInfoWithRating;
