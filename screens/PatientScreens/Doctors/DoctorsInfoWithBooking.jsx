import React, { useCallback, useState, useEffect } from "react";
import {
  Alert,
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Platform,
  useWindowDimensions,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SideBarNavigation from "../../../components/PatientScreenComponents/SideBarNavigation";
import Header from "../../../components/PatientScreenComponents/Header";
import { API_URL } from "../../../env-vars";
import { useAuth } from "../../../contexts/AuthContext";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const DoctorsInfoWithBooking = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [doctors, setDoctors] = useState(route.params?.doctors || null);
  const [isReady, setIsReady] = useState(false); // Delay rendering

  const { user } = useAuth();

  useEffect(() => {
    const tryParseDoctorFromUrl = () => {
      try {
        const search = window.location.search; // "?doctors=%7B...%7D"
        const urlParams = new URLSearchParams(search);
        const encodedDoctor = urlParams.get("doctors");

        if (encodedDoctor) {
          const decoded = decodeURIComponent(encodedDoctor);
          const parsed = JSON.parse(decoded);
          setDoctors(parsed);
        }
      } catch (err) {
        console.error("Error parsing doctor from URL:", err);
      } finally {
        setIsReady(true);
      }
    };

    if (!doctors) {
      if (Platform.OS === "web") {
        tryParseDoctorFromUrl();
      } else {
        Linking.getInitialURL().then((url) => {
          if (url && url.includes("DoctorsInfoWithBooking")) {
            const urlObj = new URL(url);
            const encodedDoctor = urlObj.searchParams.get("doctors");

            if (encodedDoctor) {
              const decoded = decodeURIComponent(encodedDoctor);
              const parsed = JSON.parse(decoded);
              setDoctors(parsed);
            }
          }
          setIsReady(true);
        });
      }
    } else {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    const getDatesAndSlots = async () => {
      const today = new Date();
      const next3Days = Array.from({ length: 3 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return date;
      });

      const promises = next3Days.map(async (date) => {
        const dateString = date.toISOString().slice(0, 10); // 'YYYY-MM-DD'
        const weekday = date.toLocaleDateString("en-US", { weekday: "long" }); // "Monday"

        try {
          const res = await fetch(`${API_URL}/doctorBookings/available`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              doctor_id: doctors.id || doctors.email,
              date: dateString,
            }),
          });

          console.log(`Response ${res.status} for ${weekday} (${dateString})`);
          const data = await res.json();
          console.log(
            `Slots for ${weekday} (${dateString}):`,
            JSON.stringify(data, null, 2)
          );

          return {
            id: dateString,
            label: `${weekday}, ${date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            })}`,
            date: dateString,
            slots: data.slots || [],
          };
        } catch (e) {
          console.error(`Error fetching slots for ${dateString}:`, e);
          return {
            id: dateString,
            label: `${weekday}, ${date.toDateString()}`,
            date: dateString,
            slots: [],
          };
        }
      });

      const results = await Promise.all(promises);
      setAvailableDates(results);

      if (results.length > 0) {
        console.log("Selected date's slots:", results[0].slots);
        setSelectedDate(results[0].date);
        setAvailableSlots(results[0].slots);
      }
    };

    if (doctors?.id || doctors?.email) {
      console.log("Doctor ID:", doctors.id || doctors.email);
      getDatesAndSlots();
    }
  }, [doctors]);

  const handleDateSelect = (dateStr) => {
    const selected = availableDates.find((d) => d.date === dateStr);
    setSelectedDate(dateStr);
    setAvailableSlots(selected?.slots || []);
    setSelectedTimeSlot(null);
  };
  const handleSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };
  const bookSlot = async () => {
    if (!selectedDate || !selectedTimeSlot) {
      Alert.alert("Error", "Please select a date and time slot.");
      return;
    }

    try {
      console.log("Booking request payload:", {
        doctor_id: doctors.email,
        date: selectedDate,
        start: selectedTimeSlot,
        user_id: user.email,
      });

      const res = await fetch(`${API_URL}/doctorBookings/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(user.token && { Authorization: `Bearer ${user.token}` }),
        },
        body: JSON.stringify({
          doctor_id: doctors.email,
          date: selectedDate,
          start: selectedTimeSlot,
          user_id: user.email,
          platform: Platform.OS === "web" ? "web" : "mobile",
        }),
      });

      console.log("Booking response status:", res.status);
      const data = await res.json();
      console.log("Booking response data:", data);

      if (!res.ok) throw new Error(data.detail || "Booking failed");

      // Update local state
      setAvailableDates((prevDates) =>
        prevDates.map((date) => {
          if (date.date === selectedDate) {
            return {
              ...date,
              slots: date.slots.map((slot) =>
                slot.start === selectedTimeSlot
                  ? { ...slot, available: slot.available - 1 }
                  : slot
              ),
            };
          }
          return date;
        })
      );

      setAvailableSlots((prevSlots) =>
        prevSlots.map((slot) =>
          slot.start === selectedTimeSlot
            ? { ...slot, available: slot.available - 1 }
            : slot
        )
      );

      Alert.alert("Success", "Slot booked successfully!");
      navigation.navigate("DoctorsBookingPaymentScreen", {
        doctor: doctors,
        selectedDate: selectedDate,
        selectedTimeSlot: selectedTimeSlot,
      });
    } catch (error) {
      console.error("Booking error:", error);
      Alert.alert("Error", error.message || "Failed to book slot");
    }
  };

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTimeSlot) {
      alert("Please select a date and time slot first.");
      return;
    }

    navigation.navigate("DoctorsBookingPaymentScreen", {
      doctor: doctors,
      selectedDate: selectedDate,
      selectedTimeSlot: selectedTimeSlot,
    });
  };
  // const handleBookAppointment = async () => {
  //   if (!selectedDate || !selectedTimeSlot) {
  //     alert("Please select a date and time slot first.");
  //     return;
  //   }

  //   try {
  //     const user_email = await AsyncStorage.getItem("@user_email");

  //     if (!user_email) {
  //       console.error("❌ User ID not found in AsyncStorage");
  //       alert("User not logged in properly. Please try logging in again.");
  //       return;
  //     }

  //     // 🔍 Debug the data
  //     console.log("🚀 Booking Info:", {
  //       doctor_id: doctors.email,
  //       date: selectedDate,
  //       start: selectedTimeSlot,
  //       user_id: user_email,
  //     });

  //     navigation.navigate("DoctorsBookingPaymentScreen", {
  //       doctor: doctors,
  //       selectedDate: selectedDate,
  //       selectedTimeSlot: selectedTimeSlot,
  //     });
  //   } catch (error) {
  //     console.error("❌ Booking Error:", error);
  //     alert("Something went wrong. Please try again.");
  //   }
  // };

  if (!isReady || !doctors) return null;

  return (
    <>
      {Platform.OS === "web" && width > 1000 && (
        <View style={styles.webContainer}>
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
                {/* Keeping the existing sidebar navigation as requested */}
                <View style={styles.Left}>
                  <SideBarNavigation navigation={navigation} />
                </View>

                <View style={styles.Right}>
                  <View style={styles.header}>
                    <Header navigation={navigation} />
                  </View>

                  <View style={styles.contentContainer}>
                    {/* Doctor profile card */}
                    <View style={styles.doctorProfileCard}>
                      <View style={styles.doctorProfileDetail}>
                        <View style={styles.doctorLeftSection}>
                          <Image
                            source={doctors.profilePhoto}
                            style={styles.doctorImage}
                          />
                          <View style={styles.ratingContainer}>
                            <MaterialIcons
                              name="star"
                              size={20}
                              color="#FFD700"
                            />
                            <Text style={styles.ratingText}>{"4.5"}</Text>
                          </View>
                        </View>
                        <View style={styles.doctorInfoSection}>
                          <Text style={styles.doctorName}>
                            {doctors.doctorname}
                          </Text>
                          <Text style={styles.doctorCredentials}>
                            {doctors.specialization}
                          </Text>
                          <Text style={styles.doctorExperience}>
                            {`${doctors.experience} experience`}
                          </Text>
                          <Text style={styles.doctorBio}>
                            {doctors.description}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.reviewsSection}>
                        <Text style={styles.reviewsTitle}>User Reviews</Text>

                        <View style={styles.reviewsList}>
                          {doctors.reviews?.map((review, index) => (
                            <View key={index} style={styles.reviewCard}>
                              <View style={styles.reviewTextBox}>
                                <ScrollView
                                  nestedScrollEnabled={true}
                                  showsVerticalScrollIndicator={false}
                                >
                                  <Text style={styles.reviewText}>
                                    {review.comment}
                                  </Text>
                                </ScrollView>
                              </View>

                              <View style={styles.reviewerContainer}>
                                {[...Array(5)].map((_, i) => (
                                  <MaterialIcons
                                    key={i}
                                    name={
                                      i + 1 <= review.rating
                                        ? "star"
                                        : i + 0.5 <= review.rating
                                        ? "star-half"
                                        : "star-border"
                                    }
                                    size={16}
                                    color="#FFD700"
                                  />
                                ))}
                                <Text style={styles.reviewerName}>
                                  {review.reviewer}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>

                    {/* Appointment booking section */}
                    <View style={styles.appointmentSection}>
                      <View style={styles.subscribedTextBox}>
                        <Text style={styles.subscribedText}>
                          You have already Subscribed to this doctor ! Book
                          Slots
                        </Text>
                      </View>

                      <View style={styles.dateSelector}>
                        {availableDates.map((date) => (
                          <TouchableOpacity
                            key={date.id}
                            style={[
                              styles.dateOption,
                              selectedDate === date.date && styles.selectedDate,
                            ]}
                            onPress={() => handleDateSelect(date.date)}
                          >
                            <Text style={styles.dateLabel}>{date.label}</Text>
                            <Text style={styles.slotsAvailable}>
                              {date.slots.length > 0
                                ? `${date.slots.length} slots Available`
                                : "No slot"}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>

                      <View style={styles.timeSlotSection}>
                        {availableSlots.length > 0 ? (
                          <ScrollView
                            style={styles.timeSlotScroll}
                            contentContainerStyle={styles.timeSlotsContainer}
                            showsVerticalScrollIndicator={false}
                          >
                            {availableSlots.map((slot, idx) => {
                              const isAvailable = slot.available > 0;
                              return (
                                <TouchableOpacity
                                  key={idx}
                                  disabled={!isAvailable}
                                  style={[
                                    styles.timeSlot,
                                    selectedTimeSlot === slot.start &&
                                      styles.selectedTimeSlot,
                                    !isAvailable && styles.unavailableTimeSlot,
                                  ]}
                                  onPress={() =>
                                    isAvailable && handleSlotSelect(slot.start)
                                  }
                                >
                                  <Text
                                    style={[
                                      styles.timeSlotText,
                                      selectedTimeSlot === slot.start &&
                                        styles.selectedTimeSlotText,
                                      !isAvailable &&
                                        styles.unavailableTimeSlotText,
                                    ]}
                                  >
                                    {slot.start} - {slot.end}
                                  </Text>
                                  {/* <Text
                                    style={[
                                      styles.bookNowText,
                                      !isAvailable &&
                                        styles.unavailableTimeSlotText,
                                    ]}
                                  >
                                    {isAvailable ? `${slot.available}` : ""}
                                  </Text> */}
                                </TouchableOpacity>
                              );
                            })}
                          </ScrollView>
                        ) : (
                          <Text style={styles.noSlotText}>
                            No slots available for this date
                          </Text>
                        )}
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.bookSlotButton,
                          !selectedTimeSlot && {
                            backgroundColor: "rgba(255, 112, 114, 0.6)",
                          }, // greyed out if not selected
                        ]}
                        disabled={!selectedTimeSlot}
                        onPress={bookSlot}
                      >
                        <Text style={styles.bookSlotText}>
                          {selectedTimeSlot ? "Book Slot" : "Book Slot"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      )}
      {(Platform.OS !== "web" || width < 1000) && (
        <View style={styles.appContainer}>
          <ScrollView>
            <StatusBar barStyle="light-content" backgroundColor="#fff" />
            {/* <View style={{ flex: 1 }}> */}
            <View style={styles.appImageContainer}>
              <Image
                source={{ uri: doctors.profilePhoto }}
                style={styles.doctorImage}
              />
              <View style={styles.firstText}>
                <Text style={styles.doctorName}>{doctors.doctorname}</Text>
              </View>
              <View style={styles.secondText}>
                <Text style={styles.doctorCredentials}>
                  ({doctors.specialization})
                </Text>
              </View>
            </View>

            <View style={styles.experienceRatingContainer}>
              <View style={styles.experienceSection}>
                <Image
                  source={require("../../../assets/Icons/doctorTool.png")}
                  style={styles.doctorIcon}
                />
                <View style={styles.experienceDetail}>
                  <Text style={styles.experienceText}>Total Experience</Text>
                  <Text style={styles.experience}>{doctors.experience}</Text>
                </View>
              </View>
              <View style={styles.verticalLine} />
              <View style={styles.ratingSection}>
                <Image
                  source={require("../../../assets/Icons/Star.png")}
                  style={styles.doctorIcon}
                />
                <TouchableOpacity style={styles.ratingDetail}>
                  <Text style={styles.ratingText}>Rating & Reviews</Text>
                  <Text style={styles.rating}>{4.5}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.OfflineOnlineMode}>
              <TouchableOpacity style={styles.OfflineMode}>
                <Image
                  source={require("../../../assets/Icons/offline.png")}
                  style={styles.offlineIcon}
                />
                <Text style={styles.offlineText}>Offline Appointment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.OnlineMode}>
                <Image
                  source={require("../../../assets/Icons/videocall.png")}
                  style={styles.onlineIcon}
                />
                <Text style={styles.onlineText}>Online Appointment</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.consultationFess}>
              <View style={styles.iconBox}>
                <Image
                  source={require("../../../assets/Icons/dollarIcon.png")}
                  style={styles.dollarIcon}
                />
              </View>
              <View style={styles.feesBox}>
                <Text style={styles.fees}>
                  {/* {doctors.consultationFees || `₹${doctors.fees || 0}`} */}
                  Free
                </Text>
                <Text style={styles.feesText}>Consultation fees</Text>
              </View>
            </View>

            <View style={styles.availabilityContainer}>
              <Text style={styles.availabilityTimeText}>Available Time</Text>
              <View style={styles.availabilityShowBox}>
                <View style={styles.dateSelector}>
                  {availableDates.map((date) => (
                    <TouchableOpacity
                      key={date.id}
                      style={[
                        styles.dateOption,
                        selectedDate === date.date && styles.selectedDate,
                      ]}
                      onPress={() => handleDateSelect(date.date)}
                    >
                      <Text style={styles.dateLabel}>{date.label}</Text>
                      <Text style={styles.slotsAvailable}>
                        {date.slots.length > 0
                          ? `${date.slots.length} slots Available`
                          : "No slot"}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.timeSlotSection}>
                  {availableSlots.length > 0 ? (
                    <ScrollView
                      style={styles.timeSlotScroll}
                      keyboardShouldPersistTaps="handled" 
                      contentContainerStyle={styles.timeSlotsContainer}
                    >
                      {availableSlots.map((slot, idx) => {
                        const isAvailable = slot.available > 0;
                        return (
                          <TouchableOpacity
                            key={idx}
                            disabled={!isAvailable}
                            style={[
                              styles.timeSlot,
                              selectedTimeSlot === slot.start &&
                                styles.selectedTimeSlot,
                              !isAvailable && styles.unavailableTimeSlot,
                            ]}
                            onPress={() =>
                              isAvailable && handleSlotSelect(slot.start)
                            }
                          >
                            <Text
                              style={[
                                styles.timeSlotText,
                                selectedTimeSlot === slot.start &&
                                  styles.selectedTimeSlotText,
                                !isAvailable && styles.unavailableTimeSlotText,
                              ]}
                            >
                              {slot.start} - {slot.end}
                            </Text>
                            {/* <Text
                              style={[
                                styles.bookNowText,
                                !isAvailable && styles.unavailableTimeSlotText,
                              ]}
                            >
                              {isAvailable ? `${slot.available}` : ""}
                            </Text> */}
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  ) : (
                    <Text style={styles.noSlotText}>
                      No slots available for this date
                    </Text>
                  )}
                </View>
                {/* <TouchableOpacity
                  style={[
                    styles.bookSlotButton,
                    !selectedTimeSlot && {
                      backgroundColor: "rgba(255, 112, 114, 0.6)",
                    }, // greyed out if not selected
                  ]}
                  disabled={!selectedTimeSlot}
                  onPress={bookSlot}
                >
                  <Text style={styles.bookSlotText}>
                    {selectedTimeSlot ? "Book Slot" : "Book Slot"}
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
            <TouchableOpacity
              style={styles.bookAppointmentButton}
              onPress={handleBookAppointment}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 25, right: 25 }}
            >
              <Text style={styles.bookAppointmentText}>Book Slot</Text>
            </TouchableOpacity>
            {/* </View> */}
          </ScrollView>
        </View>
      )}
    </>
  );
};
const windowWidth = Dimensions.get("window").width;
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
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    //borderWidth: 1,
    marginVertical: "10%",
    alignSelf: "center",
  },
  appImageContainer: {
    height: "17%",
    width: "75%",
    //borderWidth: 1,
    marginVertical: "8%",
    alignSelf: "center",
    ...Platform.select({
      web: {
        height: windowWidth > 1000 ? "17%" : "20%",
      },
    }),
  },
  experienceRatingContainer: {
    height: "8%",
    width: "88%",
    borderWidth: 1,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 5,
    boxShadow: " 0px 0px 4px 3px rgba(0, 0, 0, 0.25)",
    backgroundColor: "rgba(255, 252, 252, 1)",
    marginVertical:"2%",
    //padding: "2%",
    ...Platform.select({
      web: {
        minHeight: 60, // Ensures visibility in web view
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderWidth: 1,
        borderColor: "#ddd",
        boxShadow: " 0px 0px 4px 3px rgba(0, 0, 0, 0.25)",
        // marginTop: "-165%",
      },
    }),
  },
  experienceSection: {
    height: "100%",
    width: "49%",
    //borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  doctorIcon: {
    alignSelf: "center",
    height: 28,
    width: 28,
    marginHorizontal: "3%",
    borderRadius: 50,
  },
  experienceDetail: {
    height: "94%",
    width: "78%",
    //borderWidth: 1,
    alignSelf: "center",
    flexDirection: "column",
    padding:"1%"
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

  OfflineOnlineMode: {
    //borderWidth:1,
    height: "8%",
    width: "88%",
    alignSelf: "center",
    marginVertical: "1%",
    borderRadius: 5,
    boxShadow: " 0px 0px 4px 3px rgba(0, 0, 0, 0.25)",
    backgroundColor: "rgba(255, 252, 252, 1)",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  OfflineMode: {
    borderWidth: 1,
    height: "90%",
    width: "49%",
    alignSelf: "center",
    borderColor: "#FF7072",
    backgroundColor: "rgb(237, 111, 128)",
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  offlineIcon: {
    alignSelf: "center",
    height: 20,
    width: 20,
  },
  offlineText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 14,
    fontWeight: 500,
  },
  OnlineMode: {
    //borderWidth: 1,
    height: "90%",
    width: "49%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  onlineIcon: {
    alignSelf: "center",
    width: 20,
    height: 14,
  },
  onlineText: {
    alignSelf: "center",
    fontSize: 14,
    fontWeight: 500,
  },
  consultationFess: {
    height: "8%",
    width: "88%",
    //borderWidth: 1,
    alignSelf: "center",
    marginVertical: "1.8%",
    borderRadius: 5,
    //borderColor:"red",
    boxShadow: " 0px 0px 4px 3px rgba(0, 0, 0, 0.25)",
    backgroundColor: "rgba(255, 252, 252, 1)",
    flexDirection: "row",
    paddingHorizontal: "2%",
    ...Platform.select({
      web: {
        height: "auto",
        width: "88%",
        //borderWidth: 1,
        minHeight: 60,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
    }),
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
    height: "100%",
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
    height: "50%",
    width: "90%",
    //borderWidth: 1,
    alignSelf: "center",
    marginVertical: "4%",
    overflow: "hidden",
    ...Platform.select({
      web: {
        marginBottom: "5%",
      },
    }),
  },
  availabilityTimeText: {
    fontSize: 13,
    fontWeight: 600,
    color: "#444444",
    paddingHorizontal: "2%",
  },
  availabilityShowBox: {
    height: "92%",
    width: "98%",
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 15,
    boxShadow: " 0px 0px 4px 1px rgba(0, 0, 0, 0.25)",
    marginVertical: "1%",
    flexDirection: "column",
  },
  availabilityBox: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    //borderWidth: 1,
  },

  dayColumn: {
    alignItems: "center",
    //borderWidth: 1,
    width: 108,
  },
  selectedDay: {
    backgroundColor: " rgb(254, 248, 248)",
    borderWidth: 1,
    borderColor: "rgba(255, 112, 114, 1)",
    paddingHorizontal: "0%",
  },

  dayTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },

  noSlots: {
    color: "gray",
    fontSize: 15,
  },

  slotsAvailableBox: {
    color: "#000",
    fontSize: 10,
  },
  noSlot: {
    color: "gray",
    fontSize: 15,
    fontWeight: 400,
    alignSelf: "center",
    marginTop: "20%",
  },
  noSlotsContainer: {
    alignSelf: "center",
    //borderWidth:1,
    marginVertical: "15%",
  },

  timeSlotContainer: {
    marginTop: "2%",
    flexDirection: "column",
    //borderWidth: 1,
    height: "57%",
    //justifyContent: "space-around",
  },

  slotHeading: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: "2",
  },

  slotButton: {
    //backgroundColor: "#E0EBFF",
    paddingVertical: "3%",
    paddingHorizontal: "4%",
    borderRadius: 5,
    alignSelf: "flex-start",
    // marginTop: "2%",
    borderColor: "rgba(22, 128, 236, 0.75)",
    borderWidth: 1,
  },

  slotText: {
    color: "#3366CC",
    fontSize: 13,
    fontWeight: 400,
    //   // alignSelf:"center"
  },
  slotCategory: {
    fontSize: 15,
    fontWeight: 500,
    marginBottom: "2%",
    color: "#000000",
    marginTop: "2%",
  },
  slotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: "1%",
  },
  selectedSlot: {
    backgroundColor: "#007BFF", // Highlighted color when selected
  },
  selectedSlotText: {
    color: "#FFFFFF", // Text color when selected
  },

  viewAllButton: {
    backgroundColor: "rgb(237, 109, 111)",
    paddingVertical: "2%",
    alignItems: "center",
    borderRadius: 8,
    width: "85%",
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "5%",
    ...Platform.select({
      web: {
        paddingVertical: "2%",
      },
    }),
  },

  viewAllText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bookAppointmentButton: {
    height: "6%",
    width: "70%",
    //borderWidth: 1,
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "rgb(237, 109, 111)",
    marginTop: "2%",
    ...Platform.select({
      web: {
        marginBottom: "15%",
      },
      ios: {
        minHeight: 44, // Apple's minimum touch target
      },
    }),
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
      },
    }),
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(138, 112, 255, 0.8)",
    marginBottom: "10%",
    borderRadius: 20,
    overflow: "hidden",
    width: "90%",
    marginHorizontal: "5%",
    padding: "1%",
  },
  doctorProfileCard: {
    width: "60%",
    height: "90%",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: "2%",
    margin: "2%",
    justifyContent: "space-between",
  },
  doctorProfileDetail: {
    height: "72%",
    width: "100%",
    //borderWidth: 1,
    flexDirection: "row",
  },
  doctorLeftSection: {
    width: "20%",
    height: "48%",
    alignItems: "center",
    // borderWidth: 1,
  },
  doctorImage: {
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
  firstText: {
    ...Platform.select({
      web: {
        alignSelf: windowWidth > 1000 ? " " : "center",
      },
    }),
  },
  secondText: {
    ...Platform.select({
      web: {
        alignSelf: windowWidth > 1000 ? " " : "center",
      },
    }),
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingDetail: {
    ...Platform.select({
      web: {
        flexDirection: "column",
        width: "80%",
        //borderWidth:1
      },
    }),
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 600,
    color: " rgb(94, 93, 93)",
    paddingHorizontal: "4%",
    ...Platform.select({
      web: {
        marginLeft: "1%",
        fontSize: 14,
        fontWeight: 600,
      },
    }),
  },
  doctorInfoSection: {
    width: "80%",
    height: "100%",
    paddingLeft: "1%",
    //borderWidth: 1,
  },
  doctorName: {
    fontSize: 22,
    fontWeight: 600,
    color: "#000000",
    alignSelf: "center",
    ...Platform.select({
      web: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        alignSelf: "flex-start",
      },
    }),
  },
  doctorCredentials: {
    fontSize: 14,
    alignSelf: "center",
    fontWeight: 600,
    ...Platform.select({
      web: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
        alignSelf: "flex-start",
      },
    }),
  },
  doctorExperience: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
    marginBottom: 10,
  },
  doctorBio: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 15,
  },
  reviewsSection: {
    //borderWidth: 1,
    height: "40%",
    bottom: "10%",
  },
  reviewsTitle: {
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 10,
  },
  reviewsList: {
    flexDirection: "row",
    justifyContent: "space-around",
    //borderWidth: 1,
    borderColor: "red",
    height: "80%",
  },
  reviewCard: {
    height: "100%",
    width: "30%",
    backgroundColor: "#ffebee",
    borderRadius: 10,
    padding: "1%",
  },
  reviewTextBox: {
    height: "80%",
    width: "100%",
    // borderWidth: 1,
  },
  reviewText: {
    fontSize: 13,
    color: "#000",
    marginBottom: "3%",
    //fontFamily: "Alex Brush",
    fontWeight: 400,
    fontStyle: "italic",
  },
  reviewerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "2%",
    // borderWidth: 1,
  },
  reviewerName: {
    fontSize: 12,
    color: "#666",
    marginLeft: "2%",
  },
  appointmentSection: {
    width: "30%",
    height: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginTop: "2%",
    marginLeft: "5%",
    //padding: "2%",
  },
  subscribedTextBox: {
    height: "15%",
    width: "100%",
    //borderWidth:1,
    alignSelf: "center",
    backgroundColor: "rgb(159, 254, 199)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  subscribedText: {
    fontSize: 14,
    fontWeight: 500,
    color: "rgb(7, 79, 32)",
    alignSelf: "center",
    marginTop: "7%",
    //padding:"1%",
    marginLeft: "3%",
  },

  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 2,
    borderColor: "#d3d3d3",
    //boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
    height: "18%",
    width: "100%",
    alignSelf: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: "0.5%",
    ...Platform.select({
      web: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 2,
        borderColor: "rgb(238, 238, 240)",
        //boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
        height: windowWidth > 1000 ? "12%" : "18%",
        marginTop: "3%",
        width: "100%",
        //alignSelf: "center",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingLeft: "0.5%",
        paddingRight: "0.5%",
      },
    }),
  },
  dateOption: {
    width: "34%",
    paddingRight: "2.4%",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",

    ...Platform.select({
      web: {
        width: "33%",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
        //borderWidth:1,
        gap: 0,
      },
    }),
  },
  selectedDate: {
    borderBottomColor: "#ff7072",

    ...Platform.select({
      web: {
        borderBottomColor: "#ff7072",
      },
    }),
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    ...Platform.select({
      web: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#333",
      },
    }),
  },
  slotsAvailable: {
    fontSize: 11,
    color: "#388e3c",
    ...Platform.select({
      web: {
        fontSize: 11,
        color: "#388e3c",
        //marginTop: "1%",
      },
    }),
  },
  timeSlotSection: {
    marginTop: "2%",
    height: "75%",
    width: "95%",
    alignSelf: "center",
    //borderWidth: 1,
    ...Platform.select({
      web: {
        marginTop: "2%",
        height: "50%",
        width: "95%",
        alignSelf: "center",
        //borderWidth: 1,
      },
    }),
  },
  timeSlotsGroup: {
    marginBottom: "3%",
    ...Platform.select({
      web: {
        marginBottom: "4%",
      },
    }),
  },
  timeGroupLabel: {
    fontSize: 13,
    color: "#333",
    marginBottom: "2%",
    ...Platform.select({
      web: {
        fontSize: 14,
        color: "#333",
        marginBottom: "2%",
      },
    }),
  },
  timeSlotScroll: {
    maxHeight: 200,
    width: "100%",
    ...Platform.select({
      web: {
        maxHeight: 200,
        width: "100%",
      },
    }),
  },
  timeSlotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 6,
    rowGap: 7,
    columnGap: 3,
    width: "100%",
    ...Platform.select({
      web: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        gap: 10,
        rowGap: 10,
        columnGap: 5,
        width: "100%",
      },
    }),
  },
  timeSlot: {
    backgroundColor: "#fff",
    paddingVertical: "2%",
    paddingHorizontal: "3%",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "rgba(22, 128, 236, 0.75)",
    height: "25%",
    marginTop: "4%",
    marginLeft: "3%",
    alignItems: "center",
    ...Platform.select({
      web: {
        backgroundColor: "#fff",
        paddingVertical: "2%",
        paddingHorizontal: "3%",
        borderRadius: 3,
        //borderWidth: 1,
        borderColor: "rgba(22, 128, 236, 0.75)",
        height: "22%",
        marginTop: "4%",
        marginLeft: "3%",
      },
    }),
  },
  selectedTimeSlot: {
    borderWidth: 1,
    borderColor: "#80cbc4",
    backgroundColor: "rgba(22, 128, 236, 0.75)",
    ...Platform.select({
      web: {
        borderWidth: 1,
        borderColor: "#80cbc4",
        backgroundColor: "rgba(22, 128, 236, 0.75)",
      },
    }),
  },
  timeSlotText: {
    fontSize: 12,
    color: "rgba(22, 128, 236, 0.75)",
    fontWeight: 500,
    ...Platform.select({
      web: {
        fontSize: 12,
        color: "rgba(22, 128, 236, 0.75)",
        fontWeight: 500,
        //color:"#fff"
      },
    }),
  },
  selectedTimeSlotText: {
    color: "#ffffff",
    ...Platform.select({
      web: {
        color: "#ffffff",
      },
    }),
  },
  unavailableTimeSlot: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
    ...Platform.select({
      web: {
        backgroundColor: "#f0f0f0",
        borderColor: "#ccc",
      },
    }),
  },
  unavailableTimeSlotText: {
    color: "#888",
    ...Platform.select({
      web: {
        color: "#888",
      },
    }),
  },
  noSlotText: {
    alignSelf: "center",
    marginTop: "20%",
  },
  bookSlotButton: {
    height: "7%",
    width: "75%",
    //borderWidth: 1,
    alignSelf: "center",
    marginTop: "3%",
    borderRadius: 5,
    backgroundColor: "rgba(215, 35, 38, 0.6)",
  },
  bookSlotText: {
    fontSize: 16,
    fontWeight: 500,
    color: "#ffffff",
    padding: "1%",
    alignSelf: "center",
  },
});

export default DoctorsInfoWithBooking;
