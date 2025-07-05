import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ChatbotProvider } from "./contexts/ChatbotContext";
import ChatBotOverlay from "./components/PatientScreenComponents/ChatbotComponents/ChatbotOverlay";
import { AuthProvider } from "./contexts/AuthContext";
import { RoleProvider } from "./contexts/RoleContext";
import RootNavigation, { linking } from "./navigation/RootNavigator";
import NewDoctorMedicalReg from "./screens/DoctorScreens/DoctorRegistration/NewDoctorMedicalReg";
const App = () => {
  const navigationRef = useRef(null);

  return (
    <AuthProvider>
      <ThemeProvider>
        <ChatbotProvider>
          <RoleProvider>
            <NavigationContainer linking={linking} ref={navigationRef}>
              <RootNavigation />
              <ChatBotOverlay navigationRef={navigationRef} />
            </NavigationContainer>
          </RoleProvider>
        </ChatbotProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
