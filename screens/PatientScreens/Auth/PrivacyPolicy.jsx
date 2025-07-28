import React, { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";

const { width, height } = Dimensions.get("window");

const PrivacyPolicy = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const [selectedButton, setSelectedButton] = useState(null);

  const BulletItem = ({ children, level = 0 }) => ( // Added level prop for nested bullets
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 0,
        marginLeft: level * 20, // Indent based on level
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: "#444444",
          fontFamily: "Poppins",
          marginRight: 8,
        }}
      >
        {"\u2022"}
      </Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );

  return (
    <>
      {Platform.OS === "web" && width > 1000 ? ( // Using ternary for cleaner structure
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <ScrollView
              style={styles.textBox}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false} // hides scrollbar
            >
              <View style={styles.textHeader}>
                <Text style={styles.header}>Kokoro.doctor Privacy Policy</Text>
                <Text style={styles.welcomeTitle}>Welcome</Text>
                <Text style={styles.insertDateText}>
                  Effective Date: [Insert Date]
                </Text>
                <Text style={styles.insertDateText}>
                  Last Updated: [Insert Date]
                </Text>
              </View>
              <View style={styles.mainText}>
                {/* Main introductory paragraph*/}
                <Text style={styles.policyText}>
                  At Kokoro.Doctor, your trust is our greatest asset. As a
                  digital healthcare platform committed to advancing cardiac
                  wellness and holistic well-being, we understand the importance
                  of securing personal and sensitive medical information. This
                  Privacy Policy aims to clearly explain how your data is
                  collected, used, stored, and protected, and outlines the
                  choices and rights available to you. We strive to maintain
                  full transparency and compliance with global data protection
                  laws
                </Text>
                <Text style={styles.policyText}>{"\n"}1. Who We Are</Text>
                {/* Section 1 list - Using BulletItem component */}
                <Text style={styles.policyText}>
                  Kokoro.Doctor is a comprehensive healthcare platform that
                  allows users to:
                </Text>
                <BulletItem>
                  Connect with verified and licensed medical professionals
                </BulletItem>
                <BulletItem>Schedule video or audio consultations</BulletItem>
                <BulletItem>
                  Upload and manage health documents via "Medilocker"
                </BulletItem>
                <BulletItem>
                  Use emergency features such as the SOS button
                </BulletItem>
                <BulletItem>
                  Receive timely insights and recommendations based on medical
                  history
                </BulletItem>
                <Text style={styles.policyText}>
                  The platform is available via mobile and web applications and
                  is supported by HIPAA-compliant cloud infrastructure.
                </Text>
                <Text style={styles.policyText}>
                  {"\n"}2. What Data We Collect
                </Text>
                <Text style={styles.policyText}>
                  We collect various categories of data to deliver our services
                  efficiently and safely:
                </Text>
                <Text style={styles.policyText}>a. Personal Information</Text>
                <BulletItem>Full name, gender, date of birth</BulletItem>
                <BulletItem>
                  Contact details: phone number, email address
                </BulletItem>
                <BulletItem>
                  Location data (used only with your permission, e.g., for
                  emergency routing or hospital discovery)
                </BulletItem>
                <Text style={styles.policyText}>
                  b. Health and Medical Information
                </Text>
                <BulletItem>
                  Medical history, symptoms, lifestyle information
                </BulletItem>
                <BulletItem>
                  Uploaded reports (ECG, prescriptions, blood tests, imaging
                  reports, etc.)
                </BulletItem>
                <BulletItem>
                  Doctor consultation summaries, prescriptions, and chat
                  transcripts
                </BulletItem>
                <BulletItem>
                  Vitals suchs as heart rate, blood pressure, glucose levels (if
                  entered manually or synced via devices)
                </BulletItem>
                <Text style={styles.policyText}>
                  c. Account and Usage Information
                </Text>
                <BulletItem>
                  Login credentials (email or phone + password)
                </BulletItem>
                <BulletItem>
                  Subscription type and history (basic, premium, emergency
                  add-ons)
                </BulletItem>
                <BulletItem>SOS activity logs</BulletItem>
                <BulletItem>
                  App usage logs: device details, crash logs, OS information
                </BulletItem>
                <Text style={styles.policyText}>d. Payment Information</Text>
                <BulletItem>
                  No credit card or banking details are stored on our servers
                </BulletItem>
                <BulletItem>
                  All payments are securely handled by Apple In-App Purchases,
                  Google Play Billing, or compliant third-party payment
                  gateways.
                </BulletItem>
                <View style={{ marginVertical: 10 }} />
                <Text style={styles.policyText}>
                  {"\n"}3. Medilocker: Data Ownership and Usage
                </Text>
                <Text style={styles.policyText}>
                  Medilocker is our health record vault, where users can upload
                  their personal medical documents.
                </Text>
                <Text style={styles.policyText}>
                  By using Medilocker, you:
                </Text>
                <BulletItem>
                  Retain full ownership of your personal health data
                </BulletItem>
                <BulletItem>
                  Provide explicit consent to Kokoro.Doctor to process and
                  analyze this data for improving your care
                </BulletItem>
                <Text style={styles.policyText}>Use of Uploaded Data:</Text>
                <BulletItem>
                  We may use your uploaded health data (after de-identification)
                  for:
                </BulletItem>
                <BulletItem level={1}>
                  Clinical research and algorithm development
                </BulletItem>
                <BulletItem level={1}>
                  Health insights and diagnostics improvements
                </BulletItem>
                <BulletItem level={1}>
                  Academic and public health partnerships (in anonymized format
                  only)
                </BulletItem>
                <BulletItem>
                  You may withdraw your consent or delete data stored in
                  Medilocker at any time.
                </BulletItem>
                <View style={{ marginVertical: 10 }} />
                <Text style={styles.policyText}>
                  {"\n"}4. How We Protect Your Data
                </Text>
                <Text style={styles.policyText}>
                  We use modern, industry-standard security controls to protect
                  your data:
                </Text>
                <BulletItem>
                  Encryption: AES-256 for storage; TLS 1.3 for data transmission
                </BulletItem>
                <BulletItem>
                  Access Management: Strict role-based access controls for
                  doctors and staff
                </BulletItem>
                <BulletItem>
                  Secure Infrastructure: Hosted on HIPAA, ISO27001-compliant
                  data centers
                </BulletItem>
                <BulletItem>
                  Data Minimization: We only ask for data required for service
                  delivery
                </BulletItem>
                <BulletItem>
                  Audit Trails: All access is logged and monitored
                </BulletItem>
                <BulletItem>
                  Regular Penetration Testing and Backups to prevent data loss
                  or breach.
                </BulletItem>
                <View style={{ marginVertical: 10 }} />
                <Text style={styles.policyText}>
                  {"\n"}5. How Your Data May Be Shared
                </Text>
                <Text style={styles.policyText}>
                  Your data is not sold or used for advertising purposes. It may
                  be shared under the following circumstances:
                </Text>
                <BulletItem>
                  With doctors you explicitly consult via the platform
                </BulletItem>
                <BulletItem>
                  With emergency contacts (if you configure SOS alerts)
                </BulletItem>
                <BulletItem>
                  With law enforcement or government agencies under a lawful
                  request
                </BulletItem>
                <BulletItem>
                  With anonymized datasets for machine learning and diagnostics
                </BulletItem>
                <BulletItem>
                  All data shared is traceable, logged, and governed by strict
                  data-sharing policies.
                </BulletItem>
                <View style={{ marginVertical: 10 }} />
                <Text style={styles.policyText}>
                  {"\n"}6. In-App Purchases and Billing
                </Text>
                <BulletItem>
                  All digital health services (e.g., consultations, premium
                  features, SOS support) must be paid via Apple In-App Purchase,
                  Google Play, or approved payment gateways
                </BulletItem>
                <BulletItem>
                  We do not collect or store your credit/debit card or UPI
                  credentials on our servers
                </BulletItem>
                <BulletItem>
                  Offline services (e.g., hospital admission, diagnostic lab
                  visits) are billed separately by the healthcare provider
                </BulletItem>
                <View style={{ marginVertical: 10 }} />
                <Text style={styles.policyText}>{"\n"}7. Data Retention</Text>
                <Text style={styles.policyText}>
                  We retain data for the period necessary to:
                </Text>
                <BulletItem>
                  Provide you with uninterrupted healthcare support
                </BulletItem>
                <BulletItem>
                  Comply with legal obligations (such as record retention laws)
                </BulletItem>
                <BulletItem>
                  Upon account deletion or inactivity, your data is retained for
                  a maximum of 30 days unless longer retention is mandated by
                  law. You can request early deletion by contacting us.
                </BulletItem>
                <View style={{ marginVertical: 10 }} />
                <Text style={styles.policyText}>{"\n"}8. Your Rights</Text>
                <Text style={styles.policyText}>
                  You have the following rights with respect to your data:
                </Text>
                <BulletItem>
                  We do not collect or store your credit/debit card or UPI
                  credentials on our servers
                </BulletItem>
                <BulletItem>
                  Offline services (e.g., hospital admission, diagnostic lab
                  visits) are billed separately by the healthcare provider
                </BulletItem>
                <View style={{ marginVertical: 10 }} />{" "}
              </View>
            </ScrollView>

            <View style={styles.buttonBox}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedButton === "decline" && styles.buttonSelected,
                ]}
                onPress={() => {
                  setSelectedButton("decline");
                  navigation.navigate("Signup");
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedButton === "decline" && styles.buttonTextSelected,
                  ]}
                >
                  I Decline
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  selectedButton === "agree" && styles.buttonSelected,
                ]}
                onPress={() => {
                  setSelectedButton("agree");
                  navigation.navigate("Signup", { agreedToPolicy: true });
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedButton === "agree" && styles.buttonTextSelected,
                  ]}
                >
                  I Agree
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/Images/PrivacyPolicy.png")}
              style={styles.image}
            />
          </View>
        </View>
      ) : (
        <View style={styles.appPrivacyContainer}>
          <View style={styles.appPrivacyTextSection}>
            <ScrollView
              style={styles.appPrivacyScrollBox}
              contentContainerStyle={styles.appPrivacyScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.appPrivacyHeaderSection}>
                <View style={styles.appPrivacyImageSection}>
                  <Image
                    source={require("../../../assets/Images/PrivacyPolicy.png")}
                    style={styles.appPrivacyImage}
                  />
                </View>
                <Text style={styles.appPrivacyHeader}>
                  Kokoro.doctor Privacy Policy
                </Text>
                <Text style={styles.appPrivacyWelcome}>Welcome</Text>
                <Text style={styles.appPrivacyDate}>
                  Effective Date: [Insert Date]
                </Text>
                <Text style={styles.appPrivacyDate}>
                  Last Updated: [Insert Date]
                </Text>
              </View>
              <View style={styles.appPrivacyMainText}>
                <Text style={styles.appPrivacyPolicyText}>
                  At Kokoro.Doctor, your trust is our greatest asset. As a
                  digital healthcare platform committed to advancing cardiac
                  wellness and holistic well-being, we understand the importance
                  of securing personal and sensitive medical information. This
                  Privacy Policy aims to clearly explain how your data is
                  collected, used, stored, and protected, and outlines the
                  choices and rights available to you. We strive to maintain
                  full transparency and compliance with global data protection
                  laws.
                </Text>
                <Text style={styles.appPolicyText}>{"\n"}1. Who We Are</Text>

                <Text style={styles.appPolicyText}>
                  Kokoro.Doctor is a comprehensive healthcare platform that
                  allows users to:
                </Text>
                <BulletItem>
                  Connect with verified and licensed medical professionals
                </BulletItem>
                <BulletItem>Schedule video or audio consultations</BulletItem>
                <BulletItem>
                  Upload and manage health documents via "Medilocker"
                </BulletItem>
                <BulletItem>
                  Use emergency features such as the SOS button
                </BulletItem>
                <BulletItem>
                  Receive timely insights and recommendations based on medical
                  history
                </BulletItem>
                <Text style={styles.appPolicyText}>
                  The platform is available via mobile and web applications and
                  is supported by HIPAA-compliant cloud infrastructure.
                </Text>

                <Text style={styles.appPolicyText}>
                  {"\n"}2. What Data We Collect
                </Text>

                <Text style={styles.appPolicyText}>
                  We collect various categories of data to deliver our services
                  efficiently and safely:
                </Text>
                <Text style={styles.appPolicyText}>
                  a. Personal Information
                </Text>
                <BulletItem>Full name, gender, date of birth</BulletItem>
                <BulletItem>
                  Contact details: phone number, email address
                </BulletItem>
                <BulletItem>
                  Location data (used only with your permission, e.g., for
                  emergency routing or hospital discovery)
                </BulletItem>

                <Text style={styles.appPolicyText}>
                  b. Health and Medical Information
                </Text>
                <BulletItem>
                  Medical history, symptoms, lifestyle information
                </BulletItem>
                <BulletItem>
                  Uploaded reports (ECG, prescriptions, blood tests, imaging
                  reports, etc.)
                </BulletItem>
                <BulletItem>
                  Doctor consultation summaries, prescriptions, and chat
                  transcripts
                </BulletItem>
                <BulletItem>
                  Vitals suchs as heart rate, blood pressure, glucose levels (if
                  entered manually or synced via devices)
                </BulletItem>

                <Text style={styles.appPolicyText}>
                  c. Account and Usage Information
                </Text>
                <BulletItem>
                  Login credentials (email or phone + password)
                </BulletItem>
                <BulletItem>
                  Subscription type and history (basic, premium, emergency
                  add-ons)
                </BulletItem>
                <BulletItem>SOS activity logs</BulletItem>
                <BulletItem>
                  App usage logs: device details, crash logs, OS information
                </BulletItem>

                <Text style={styles.appPolicyText}>d. Payment Information</Text>
                <BulletItem>
                  No credit card or banking details are stored on our servers
                </BulletItem>
                <BulletItem>
                  All payments are securely handled by Apple In-App Purchases,
                  Google Play Billing, or compliant third-party payment
                  gateways.
                </BulletItem>
                <View style={{ marginVertical: 10 }} />

                <Text style={styles.appPolicyText}>
                  3. Medilocker: Data Ownership and Usage
                </Text>
                <Text style={styles.appPolicyText}>
                  Medilocker is our health record vault, where users can upload
                  their personal medical documents.
                </Text>
                <Text style={styles.appPolicyText}>
                  By using Medilocker, you:
                </Text>
                <BulletItem>
                  Retain full ownership of your personal health data
                </BulletItem>
                <BulletItem>
                  Provide explicit consent to Kokoro.Doctor to process and
                  analyze this data for improving your care
                </BulletItem>
                <Text style={styles.appPolicyText}>Use of Uploaded Data:</Text>
                <BulletItem>
                  We may use your uploaded health data (after de-identification)
                  for:
                </BulletItem>
                <BulletItem level={1}>
                  Clinical research and algorithm development
                </BulletItem>
                <BulletItem level={1}>
                  Health insights and diagnostics improvements
                </BulletItem>
                <BulletItem level={1}>
                  Academic and public health partnerships (in anonymized format
                  only)
                </BulletItem>
                <BulletItem>
                  You may withdraw your consent or delete data stored in
                  Medilocker at any time.
                </BulletItem>
                <View style={{ marginVertical: 10 }} />

                <Text style={styles.appPolicyText}>
                  4. How We Protect Your Data
                </Text>
                <Text style={styles.appPolicyText}>
                  We use modern, industry-standard security controls to protect
                  your data:
                </Text>
                <BulletItem>
                  Encryption: AES-256 for storage; TLS 1.3 for data transmission
                </BulletItem>
                <BulletItem>
                  Access Management: Strict role-based access controls for
                  doctors and staff
                </BulletItem>
                <BulletItem>
                  Secure Infrastructure: Hosted on HIPAA, ISO27001-compliant
                  data centers
                </BulletItem>
                <BulletItem>
                  Data Minimization: We only ask for data required for service
                  delivery
                </BulletItem>
                <BulletItem>
                  Audit Trails: All access is logged and monitored
                </BulletItem>
                <BulletItem>
                  Regular Penetration Testing and Backups to prevent data loss
                  or breach.
                </BulletItem>

                <View style={{ marginVertical: 10 }} />

                <Text style={styles.appPolicyText}>
                  5. How Your Data May Be Shared
                </Text>
                <Text style={styles.appPolicyText}>
                  Your data is not sold or used for advertising purposes. It may
                  be shared under the following circumstances:
                </Text>
                <BulletItem>
                  With doctors you explicitly consult via the platform
                </BulletItem>
                <BulletItem>
                  With emergency contacts (if you configure SOS alerts)
                </BulletItem>
                <BulletItem>
                  With law enforcement or government agencies under a lawful
                  request
                </BulletItem>
                <BulletItem>
                  With anonymized datasets for machine learning and diagnostics
                </BulletItem>
                <BulletItem>
                  All data shared is traceable, logged, and governed by strict
                  data-sharing policies.
                </BulletItem>

                <View style={{ marginVertical: 10 }} />

                <Text style={styles.appPolicyText}>
                  6. In-App Purchases and Billing
                </Text>
                <BulletItem>
                  All digital health services (e.g., consultations, premium
                  features, SOS support) must be paid via Apple In-App Purchase,
                  Google Play, or approved payment gateways
                </BulletItem>
                <BulletItem>
                  We do not collect or store your credit/debit card or UPI
                  credentials on our servers
                </BulletItem>
                <BulletItem>
                  Offline services (e.g., hospital admission, diagnostic lab
                  visits) are billed separately by the healthcare provider
                </BulletItem>

                <View style={{ marginVertical: 10 }} />

                <Text style={styles.appPolicyText}>7. Data Retention</Text>
                <Text style={styles.appPolicyText}>
                  We retain data for the period necessary to:
                </Text>
                <BulletItem>
                  Provide you with uninterrupted healthcare support
                </BulletItem>
                <BulletItem>
                  Comply with legal obligations (such as record retention laws)
                </BulletItem>
                <BulletItem>
                  Upon account deletion or inactivity, your data is retained for
                  a maximum of 30 days unless longer retention is mandated by
                  law. You can request early deletion by contacting us.
                </BulletItem>

                <View style={{ marginVertical: 10 }} />

                <Text style={styles.appPolicyText}>8. Your Rights</Text>
                <Text style={styles.appPolicyText}>
                  You have the following rights with respect to your data:
                </Text>
                <BulletItem>
                  We do not collect or store your credit/debit card or UPI
                  credentials on our servers
                </BulletItem>

                <BulletItem>
                  Offline services (e.g., hospital admission, diagnostic lab
                  visits) are billed separately by the healthcare provider
                </BulletItem>
              </View>
            </ScrollView>
            <View style={styles.appPrivacyButtonSection}>
              <TouchableOpacity
                style={[
                  styles.appPrivacyButton,
                  selectedButton === "decline" &&
                  styles.appPrivacyButtonSelected,
                ]}
                onPress={() => {
                  setSelectedButton("decline");
                  navigation.navigate("Signup");
                }}
              >
                <Text
                  style={[
                    styles.appPrivacyButtonText,
                    selectedButton === "decline" &&
                    styles.appPrivacyButtonTextSelected,
                  ]}
                >
                  I Decline
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  width: 1,
                  height: 60,
                  backgroundColor: "#ccc",
                  marginHorizontal: 12,
                }}
              />

              <TouchableOpacity
                style={[
                  styles.appPrivacyButton,
                  selectedButton === "agree" && styles.appPrivacyButtonSelected,
                ]}
                onPress={() => {
                  setSelectedButton("agree");
                  navigation.navigate("Signup", { agreedToPolicy: true });
                }}
              >
                <Text
                  style={[
                    styles.appPrivacyButtonText,
                    selectedButton === "agree" &&
                    styles.appPrivacyButtonTextSelected,
                  ]}
                >
                  I Agree
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100vh", // Use 100vh to ensure it takes full viewport height on web
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  textContainer: {
    flex: 1,
    maxWidth: "50%",
    height: "100%", // Explicitly set height to 100% of its parent (container)
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: 8,
    overflow: "hidden", // Important for containing scroll content
  },
  textBox: {
    flex: 1, // This allows the ScrollView to take up the available space
    width: "95%",
    paddingRight: 10,
  },
  scrollContent: {
    flexGrow: 1, // Ensures content can grow and enables scrolling
    paddingBottom: 20,
  },
  textHeader: {
    width: "100%",
    paddingBottom: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#555555",
    marginBottom: 5,
  },
  policyText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#444444",
    lineHeight: 22,
    marginBottom: 10,
  },
  insertDateText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#777777",
  },
  mainText: {
    width: "100%",
  },
  buttonBox: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  button: {
    height: 45,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: "#f5f5f5",
  },
  buttonSelected: {
    backgroundColor: "black",
    borderColor: "black",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444444",
  },
  buttonTextSelected: {
    color: "white",
  },
  imageContainer: {
    height: "50%",
    width: "30%",
    marginRight: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },

  //APP styles for mobile view
  appPrivacyContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "4%",
    paddingHorizontal: "4%",
  },
  appPrivacyTextSection: {
    flex: 1,
    width: "100%",
  },
  appPrivacyScrollBox: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
  },
  appPrivacyScrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  appPrivacyImageSection: {
    height: 200,
    width: 200,
    marginBottom: 24,
    alignSelf: "center",
    backgroundColor: "#f0f0f0",
    borderColor: "#e0e0e0",
    overflow: "hidden",
  },
  appPrivacyImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  appPrivacyHeaderSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  appPrivacyHeader: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 18,
    alignSelf: "center",
    marginBottom: 5,
  },
  appPrivacyWelcome: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 22,
    alignSelf: "center",
    marginTop: 6,
    marginBottom: 4,
    color: "#333",
  },
  appPrivacyDate: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 12,
    alignSelf: "center",
    color: "#777777",
    marginTop: 4,
  },
  appPrivacyMainText: {
    paddingHorizontal: "5%",
    marginTop: "7%",
    fontFamily: "Poppins",
  },
  appPrivacyPolicyText: {
    fontSize: 14,
    color: "#444444",
    textAlign: "justify",
    fontWeight: "400",
    fontFamily: "Poppins",
    lineHeight: 22,
    marginBottom: 10,
  },
  appPolicyText: {
    fontSize: 14,
    color: "#444444",
    fontWeight: "400",
    fontFamily: "Poppins",
    lineHeight: 22,
    marginBottom: 8,
  },
  bulletText: {
    fontSize: 14,
    color: "#444444",
    textAlign: "justify",
    fontWeight: "400",
    fontFamily: "Poppins",
    flexShrink: 1,
    lineHeight: 22,
  },
  appPrivacyButtonSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  appPrivacyButton: {
    flex: 1,
    height: 44,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appPrivacyButtonSelected: {
    backgroundColor: "black",
    borderColor: "black",
  },
  appPrivacyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444444",
  },
  appPrivacyButtonTextSelected: {
    color: "white",
  },
});

export default PrivacyPolicy;