import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderButtonsProvider } from "react-navigation-header-buttons/HeaderButtonsProvider";
import { useTheme } from "../contexts/ThemeContext";
import { lightTheme, darkTheme } from "../contexts/Themes";
import DoctorPatientLandingPage from "../screens/DoctorScreens/DoctorRegistration/DoctorPatientLandingPage";
import DoctorCongrats from "../screens/DoctorScreens/DoctorRegistration/DoctorCongrats";
import DoctorMedicalRegistration from "../screens/DoctorScreens/DoctorRegistration/DoctorMedicalRegistration";
import EstablishmentTiming from "../screens/DoctorScreens/DoctorRegistration/EstablishmentTiming";
import NewDoctorMedicalReg from "../screens/DoctorScreens/DoctorRegistration/NewDoctorMedicalReg";
import ReminderScreen from "../screens/DoctorScreens/ReminderView";
import HistoryScreen from "../screens/DoctorScreens/History";
import CalendarView from "../screens/DoctorScreens/CalendarView";
import AppointmentsView from "../screens/DoctorScreens/AppointmentsView";
import AccountSettings from "../screens/DoctorScreens/Settings/AccountSettings";
import EstablishmentTimings from "../screens/DoctorScreens/Settings/EstablishmentTimings";
import LanguagePreference from "../screens/DoctorScreens/Settings/LanguagePreference";
import MedicalProof from "../screens/DoctorScreens/Settings/MedicalProof";
import NotificationSettings from "../screens/DoctorScreens/Settings/NotificationSettings";
import ProfileSetting from "../screens/DoctorScreens/Settings/ProfileSetting";
import SubscriberFees from "../screens/DoctorScreens/Settings/SubscriberFees";
import ThemeSettings from "../screens/DoctorScreens/Settings/ThemeSettings";
import Reminder from "../screens/DoctorScreens/ReminderNewest";
import LandingPage from "../screens/PatientScreens/LandingPage";
import DoctorsSignUp from "../screens/DoctorScreens/DoctorRegistration/DoctorsSignUp";

const Stack = createNativeStackNavigator();

const DoctorAppNavigation = () => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <HeaderButtonsProvider stackType={"native"}>
      <Stack.Navigator
        initialRouteName="LandingPage"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.container.backgroundColor,
          },
          headerTintColor: theme.text.color,
        }}
      >
        <Stack.Screen
          name="DoctorPatientLandingPage"
          component={DoctorPatientLandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DoctorMedicalRegistration"
          component={DoctorMedicalRegistration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DoctorsSignUp"
          component={DoctorsSignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DoctorCongrats"
          component={DoctorCongrats}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EstablishmentTiming"
          component={EstablishmentTiming}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewDoctorMedicalReg"
          component={NewDoctorMedicalReg}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReminderView"
          component={ReminderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CalendarView"
          component={CalendarView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppointmentsView"
          component={AppointmentsView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountSettings"
          component={AccountSettings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EstablishmentTimings"
          component={EstablishmentTimings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MedicalProof"
          component={MedicalProof}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotificationSettings"
          component={NotificationSettings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileSetting"
          component={ProfileSetting}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SubscriberFees"
          component={SubscriberFees}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ThemeSettings"
          component={ThemeSettings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LanguagePreference"
          component={LanguagePreference}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReminderNewest"
          component={Reminder}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </HeaderButtonsProvider>
  );
};

export default DoctorAppNavigation;
