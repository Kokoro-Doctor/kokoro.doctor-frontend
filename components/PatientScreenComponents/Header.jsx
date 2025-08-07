import React, { useContext, useState } from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  useWindowDimensions,
  Modal,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import SideBarNavigation from "./SideBarNavigation";
import NewSideNav from "../DoctorsPortalComponents/NewSideNav";
import NewestSidebar from "../DoctorsPortalComponents/NewestSidebar";
//import DoctorPatientLandingPage from "../../screens/DoctorScreens/DoctorRegistration/DoctorPatientLandingPage1";

const { width, height } = Dimensions.get("window");

const Header = ({ navigation, isDoctorPortal = false }) => {
  const { user, logout, setRole } = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // const handleOptionPress = (screen) => {
  //   setDropdownVisible(false);
  //   navigation.navigate(screen);
  // };
  const handleOptionPress = () => {
    setDropdownVisible(false);
    navigation.navigate("DoctorPatientLandingPage");
  };

  // const handleOptionPress = async (type) => {
  //   setDropdownVisible(false);

  //   if (type === "Login") {
  //     await AsyncStorage.setItem("userRole", "doctor"); // or "patient"
  //     setRole("doctor");
  //   }

  //   if (type === "Signup") {
  //     await AsyncStorage.setItem("userRole", "doctor");
  //     setRole("doctor");
  //   }
  // };

  return (
    <View style={styles.header}>
      {user ? (
        // Show user info when logged in
        <>
          {Platform.OS === "web" && width > 1000 && (
            <View style={[styles.userInfo, styles.userInfoWeb]}>
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>
                  Welcome {user?.name ? user?.name : "User"}!
                </Text>
                <Text style={styles.subText}>
                  Here is your sales Medical dashboard
                </Text>
              </View>

              {/* Search Bar */}
              <View style={styles.searchContainer}>
                <Image
                  source={require("../../assets/Icons/search.png")}
                  style={styles.searchIcon}
                  resizeMode="contain"
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search your query"
                  placeholderTextColor="rgba(255, 255, 255, 1)"
                />
              </View>

              {/* Notification and Profile Section */}
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable style={styles.iconsContainer}>
                  <Image
                    source={require("../../assets/Icons/notification1.png")}
                    style={styles.notificationIcon}
                    resizeMode="contain"
                  />
                </Pressable>

                {/* Profile Dropdown */}
                <View style={styles.profileWrapper}>
                  <Pressable
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                  >
                    <Image
                      source={
                        user?.picture
                          ? { uri: user.picture }
                          : require("../../assets/Images/user-icon.jpg")
                      }
                      style={styles.userIcon}
                    />
                  </Pressable>
                  {dropdownVisible && (
                    <View style={[styles.dropdownMain, styles.dropdownWeb]}>
                      <Pressable onPress={() => {}} style={styles.dropdownItem}>
                        <Text style={styles.dropdownText}>Profile</Text>
                      </Pressable>
                      <Pressable onPress={logout} style={styles.dropdownItem}>
                        <Text style={styles.dropdownText}>Logout</Text>
                      </Pressable>
                      <Pressable onPress={logout} style={styles.dropdownItem}>
                          <Text style={styles.dropdownText}>Delete Account</Text>
                        </Pressable>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}

          {(Platform.OS !== "web" || width < 1000) && (
            <>
              <Modal
                visible={isSideBarVisible}
                transparent={true}
                onRequestClose={() => setIsSideBarVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.mobileSidebar}>
                    <SideBarNavigation
                      navigation={navigation}
                      closeSidebar={() => setIsSideBarVisible(false)}
                    />
                  </View>
                  <Pressable
                    style={styles.overlay}
                    onPress={() => setIsSideBarVisible(false)}
                  />
                </View>
              </Modal>

              <View style={styles.appHeaderContainer}>
                <View style={styles.appHeader}>
                  <View style={styles.logo}>
                    <Pressable
                      style={styles.hamburger}
                      onPress={() => setIsSideBarVisible(true)}
                    >
                      <MaterialIcons name="menu" size={30} color="black" />
                    </Pressable>
                    <Image
                      source={require("../../assets/Images/KokoroLogo.png")}
                      style={{ height: 30, width: 30 }}
                    />
                    <Text
                      style={{
                        fontWeight: "800",
                        color: "#000000",
                        fontSize: 16,
                      }}
                    >
                      Kokoro.Doctor
                    </Text>
                  </View>

                  <View style={[styles.userInfo, styles.userInfoApp]}>
                    <Pressable
                      onPress={() => {
                        setDropdownVisible(!dropdownVisible);
                      }}
                    >
                      <Image
                        source={
                          user?.picture
                            ? { uri: user.picture }
                            : require("../../assets/Images/user-icon.jpg")
                        }
                        style={styles.userIcon}
                      />
                    </Pressable>
                    <Pressable>
                      <MaterialIcons
                        name="notifications-none"
                        size={24}
                        color="black"
                      />
                    </Pressable>
                    {dropdownVisible && (
                      <View
                        style={[styles.dropdownMain, styles.dropdownLoggedIn]}
                      >
                        <Pressable
                          onPress={() => {}}
                          style={styles.dropdownItem}
                        >
                          <Text style={styles.dropdownText}>Profile</Text>
                        </Pressable>
                        <Pressable onPress={logout} style={styles.dropdownItem}>
                          <Text style={styles.dropdownText}>Logout</Text>
                        </Pressable>
                        
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.usernameApp}>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#000000",
                      fontSize: 20,
                    }}
                  >
                    Hello,
                  </Text>
                  <Text
                    style={{
                      fontWeight: "800",
                      color: "#000000",
                      fontSize: 20,
                    }}
                  >
                    {" "}
                    {user?.name ? user?.name : "User"}!
                  </Text>
                </View>
              </View>
            </>
          )}
        </>
      ) : (
        // Show login/signup buttons when not logged in
        <>
          {Platform.OS === "web" && width > 1000 && (
            <View style={styles.authButtonsWeb}>
              <Pressable
                onPress={() => navigation.navigate("Login")}
                //onPress={() => handleOptionPress("DoctorPatientLandingPage")}
                style={styles.authButton}
              >
                <Text
                  style={[
                    styles.authText,
                    { color: width < 1000 ? "#000" : "#fff" },
                  ]}
                >
                  Login
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("DoctorPatientLandingPage")}
                //onPress={() => handleOptionPress("DoctorPatientLandingPage")}
                style={styles.authButton}
              >
                <Text
                  style={[
                    styles.authText,
                    { color: width < 1000 ? "#000" : "#fff" },
                  ]}
                >
                  Signup
                </Text>
              </Pressable>
            </View>
          )}

          {(Platform.OS !== "web" || width < 1000) && (
            <>

              <Modal
                visible={isSideBarVisible}
                transparent={true}
                onRequestClose={() => setIsSideBarVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.mobileSidebar}>
                    {isDoctorPortal ? (
                      <NewestSidebar
                        navigation={navigation}
                        closeSidebar={() => setIsSideBarVisible(false)}
                      />
                    ) : (
                      <SideBarNavigation
                        navigation={navigation}
                        closeSidebar={() => setIsSideBarVisible(false)}
                      />
                    )}
                  </View>
                  <Pressable
                    style={styles.overlay}
                    onPress={() => setIsSideBarVisible(false)}
                  />
                </View>
              </Modal>
              <View style={styles.appHeaderContainer}>
                <View style={styles.appHeader}>
                  <View style={styles.logo}>
                    <Pressable
                      style={styles.hamburger}
                      onPress={() => setIsSideBarVisible(true)}
                    >
                      <MaterialIcons name="menu" size={30} color="black" />
                    </Pressable>
                    <Image
                      source={require("../../assets/Images/KokoroLogo.png")}
                      style={{ height: 30, width: 30 }}
                    />
                    <Text
                      style={{
                        fontWeight: "800",
                        color: "#000000",
                        fontSize: 16,
                      }}
                    >
                      Kokoro.Doctor
                    </Text>
                  </View>

                  <View style={styles.authButtonsApp}>
                    <Pressable style={styles.authButtonBox}
                      onPress={() => setDropdownVisible(!dropdownVisible)}
                    >

                      <MaterialIcons name="person" size={30} color="black" />
                    </Pressable>
                    <Pressable>
                      <MaterialIcons
                        name="notifications"
                        size={30}
                        color="black"
                      />
                    </Pressable>
                    {dropdownVisible && (
                      <View
                        style={[styles.dropdownMain, styles.dropdownLoggedOut]}
                      >
                        <TouchableOpacity
                          //onPress={() => handleOptionPress("Login")}
                          onPress={() => navigation.navigate("Login")}
                          style={styles.dropdownItem}
                        >
                          <Text style={styles.dropdownText}>Login</Text>
                        </TouchableOpacity>
                        <Pressable
                          ///onPress={() => handleOptionPress("Signup")}
                          onPress={handleOptionPress}
                          style={styles.dropdownItem}
                        >
                          <Text style={styles.dropdownText}>Signup</Text>
                        </Pressable>
                      </View>

                    )}
                  </View>
                </View>
                {!isDoctorPortal && (
                  <View style={styles.usernameApp}>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: "#000000",
                        fontSize: 19,
                      }}
                    >
                      Hello,
                    </Text>
                    <Text
                      style={{
                        fontWeight: "800",
                        color: "#000000",
                        fontSize: 19,
                      }}
                    >
                      {" "}
                      {user?.name ? user?.name : "User"}!
                    </Text>
                  </View>
                )}
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    //height: "100%",
    marginTop: "2%",
    justifyContent: "center",
    //alignItems: "center",
    ...Platform.select({
      web: {
        marginTop: 5,
      },
    }),
  },
  appHeaderContainer: {
    ...Platform.select({
      web: {
        flex: 1,
      },
    }),
  },
  appHeader: {
    width: "100%",
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "4%",
    //borderWidth:1,
    marginTop:"3%",
    boxShadow: "rgba(235, 152, 157, 0.23) 0px 30px 60px -12px inset, rgba(199, 196, 196, 0.3) 0px 18px 36px -18px inset",
    ...Platform.select({
      web: {
        //gap: 100,
      },
    }),
  },
  hamburger: {
    marginHorizontal:"2%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 50,
  },
  mobileSidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "70%",
    height: "100%",
    backgroundColor: "#fff",
    zIndex: 51,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  authButtonsWeb: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: 20,
  },
  authButtonsApp: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginRight: "3%",
  },
  authButtonBox:{
    //borderWidth:1,
  },
  authButton: {
    height: 50,
    ...Platform.select({
      web: {
        padding: 10,
        justifyContent: "center",
      },
    }),
  },
  authText: {
    fontWeight: "800",
    color: "#000000",
    fontSize: 16,
    ...Platform.select({
      web: {
        fontSize: 18,
        color: "#FFFFFF",
      },
    }),
  },
  userInfo: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userInfoWeb: {
    width: "100%",
    justifyContent: "space-around",
  },
  userInfoApp: {},
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  usernameApp: {
    flexDirection: "row",
    marginLeft: "6%",
    marginTop:"2%"
  },
  logoutButton: {
    padding: 8,
    backgroundColor: "#FF7072",
    borderRadius: 5,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownImage: {
    width: 50,
    height: 50,
  },
  dropdownMain: {
    position: "absolute",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 100,
    marginRight:"2%"
  },
  dropdownLoggedOut: {
    top: 30,
    right: 0,
  },
  dropdownLoggedIn: {
    top: 40,
    right: 0,
  },
  dropdownWeb: {
    top: 40,
    right: "2%",
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownText: {
    fontSize: 14,
  },
  welcomeContainer: {},
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subText: {
    fontSize: 14,
    color: "#ddd",
    marginTop: "1%",
  },
  searchContainer: {
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: "80%",
    width: "30%",
    marginHorizontal: "10%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.66)",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    borderWidth: 0,
    backgroundColor: "transparent",
    paddingVertical: 0,
    outlineStyle: "none",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    marginRight: 20,
  },
  profileWrapper: {
    height: "60%",
    width: "10%",
    borderColor: "#fff",
    alignSelf: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderRadius: 8,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;