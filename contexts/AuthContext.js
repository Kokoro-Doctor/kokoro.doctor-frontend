import React, { createContext, useEffect, useState, useContext } from "react";
import {
  login,
  signup,
  logOut,
  handleGoogleLogin,
  restoreUserState,
} from "../utils/AuthService";
//import { View } from 'react-native';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // Restore user state on app start
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const storedState = await restoreUserState();
        if (storedState) {
          setUser(storedState.user);
          // Optionally verify token here if you want to ensure it's still valid
        }
      } catch (error) {
        console.error("Failed to restore user state:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeUser();
  }, []);

  const signupHandler = async (
    username,
    email,
    password,
    phoneNumber,
    location,
    navigation
  ) => {
    try {
      const newUser = await signup(
        username,
        email,
        password,
        phoneNumber,
        location
      );
      alert("Signup successful! Now you can login.");
      navigation.navigate("Login");
    } catch (error) {
      //   alert(
      //     `Signup Failed: ${
      //       error.response?.data?.detail || "Something went wrong!"
      //     }`
      //   );
      alert(`Signup Failed: ${error.message || "Something went wrong!"}`);
      console.error("Signup error:", error); // optional debug log
    }
  };

  // const loginHandler = async (email, password, navigation) => {
  //     try {
  //         const newUser = await login(email, password);
  //         setUser(newUser?.user);
  //         navigation.navigate("LandingPage");
  //     } catch (error) {
  //         console.error(
  //             `Login Failed: ${error.response?.data?.detail || "Something went wrong!"}`
  //         );
  //     }
  // };
  //   const loginHandler = async (email, password, navigation) => {
  //     try {
  //       const newUser = await login(email, password);
  //       setUser(newUser?.user);
  //       navigation.navigate("LandingPage");
  //     } catch (error) {
  //       // console.error(
  //       //     `Login Failed: ${error.response?.data?.detail || "Something went wrong!"}`
  //       // );
  //       console.error(
  //         "Login Failed: " +
  //           (error.response?.data?.detail || "Something went wrong!")
  //       );
  //     }
  //   };
  const loginHandler = async (email, password, navigation) => {
    try {
      const newUser = await login(email, password);
      setUser(newUser?.user);
      navigation.navigate("LandingPage");
    } catch (error) {
      // Friendly message (for optional use in UI)
      let message = "Something went wrong!";

      // Detailed debugging info
      if (error.response) {
        console.error("❌ Login Failed - Server responded with error:");
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);

        if (error.response.data?.detail) {
          message = error.response.data.detail;
        } else if (error.response.data?.message) {
          message = error.response.data.message;
        }
      } else if (error.request) {
        console.error("📡 No response received from server:");
        console.error(error.request);
      } else {
        console.error("💥 Unexpected error occurred:");
        console.error(error.message);
      }

      // Final error message (can be shown to user or used for fallback UI)
      console.error("Login Failed:", message);
    }
  };
  const logoutHandler = async () => {
    try {
      await logOut();
      setUser(null);
    } catch (error) {
      alert("Logout Failed: Something went wrong!");
    }
  };

  const googleLoginHandler = async (response) => {
    try {
      const googleUser = await handleGoogleLogin(response);
      setUser(googleUser);
      navigation.navigate("LandingPage");
    } catch (error) {
      console.error(`Google Login Failed: ${error.message}`);
    }
  };

  // if (isLoading) {
  //     return (<View><Text>Loading...</Text></View>); // Show loading screen while restoring state
  // }

  return (
    <AuthContext.Provider
      value={{
        user,
        signup: signupHandler,
        login: loginHandler,
        logout: logoutHandler,
        googleLogin: googleLoginHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
