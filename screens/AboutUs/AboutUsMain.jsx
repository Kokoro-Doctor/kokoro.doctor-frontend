import React, { useState, useRef } from "react";
import {
  ImageBackground,
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import SideBarNavigation from "../../components/SideBarNavigation";
import { Ionicons } from '@expo/vector-icons';
import Header from "../../components/Header";

const AboutUsMain = ({ navigation, route }) => {
  const {width} = useWindowDimensions();
  const scrollViewRef = useRef(null);
  const [expandedSection, setExpandedSection] = useState(null);

  // Toggle section expansion - removed type annotation
  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  return (
    <>
      {(Platform.OS==='web' && width>1000) && (
        <View style={styles.container}>
          <View style={styles.parent}>
            <View style={styles.Left}>
              <SideBarNavigation navigation={navigation} />
            </View>
            <View style={styles.Right}>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.title}>
                  <Text style={styles.brandName}>
                    Kokoro.
                    <Text style={styles.doctorText}>Doctor</Text>
                  </Text>
                  <Text style={styles.tagline}>
                    Your AI-Powered Heart Health Companion
                  </Text>
                </View>
    
                <View style={styles.AboutSection}>
                  <View style={styles.textBox}>
                    <View style={styles.delayedBorder} />
                    <Text style={styles.aboutTitle}>About Us</Text>
                    <Text style={styles.text}>
                      <Text style={styles.bold}>Kokoro.Doctor</Text> was founded
                      with a mission to make AI-powered heart health accessible to
                      everyone. As an I Member at Harvard Innovation Labs, our team
                      of experts in AI, healthcare, and business is dedicated to
                      bridging the gap between early detection and life-saving
                      action. With extensive research and cutting-edge technology,
                      <Text style={styles.bold}> Kokoro.Doctor </Text>
                      ensures that patients, doctors, and caregivers receive the
                      best possible tools for cardiac care. Our commitment to
                      affordable, data-driven healthcare makes us a leader in the
                      future of the heart health solution. We envision a world where
                      no one suffers due to lack of timely heart care. By leveraging
                      AI, medical expertise, and innovation,{" "}
                      <Text style={styles.bold}> Kokoro.Doctor </Text> is at the
                      forefront of the next healthcare revolution.
                    </Text>
                  </View>
    
                  <View style={styles.rightSection}>
                    <Text style={styles.urgentNeedTitle}>
                      THE URGENT NEED FOR BETTER HEART CARE
                    </Text>
                    <Text style={styles.urgentNeedText}>
                      HEART DISEASE IS THE LEADING CAUSE OF DEATH GLOBALLY, YET
                      MILLIONS STILL LACK QUICK, RELIABLE, AND AFFORDABLE ACCESS TO
                      CARDIAC CARE.
                    </Text>
                  </View>
                </View>
                <View style={styles.Need}>
                  <View style={styles.headerNeed}>
                    <Text style={styles.headerTextNeed}>
                      The Urgent Need for Better Heart Care
                    </Text>
                    <Text style={styles.description}>
                      Heart disease is the leading cause of death globally, yet
                      millions still lack quick, reliable, and affordable access to
                      cardiac care.
                    </Text>
                  </View>
    
                  {/* Background Design */}
                  <View style={styles.circle1} />
                  <View style={styles.circle2} />
    
                  {/* Problem Section */}
                  <Text style={styles.problemTitle}>The Problem:</Text>
                  <View style={styles.problemContainer}>
                    <View style={styles.problemBox}>
                      <Text style={styles.problemText}>
                        Lack of cardiologists in many cities and towns.
                      </Text>
                    </View>
                    <View style={styles.problemBox}>
                      <Text style={styles.problemText}>
                        Long waiting times for checkups and tests.
                      </Text>
                    </View>
                    <View style={styles.problemBox}>
                      <Text style={styles.problemText}>
                        Expensive treatments that many cannot afford.
                      </Text>
                    </View>
                    <View style={styles.problemBox}>
                      <Text style={styles.problemText}>
                        Delayed action—many people ignore early warning signs.
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.access}>
          
          <Text style={styles.head}>
            What if you could assess your heart health instantly?
          </Text>
          <Text style={styles.subhead}>
            That’s why we created Kokoro.Doctor.
          </Text>
    
        
          <TouchableOpacity style={styles.option} onPress={()=>{navigation.navigate("AboutUsWhat")}}>
            <Text style={styles.optionText}>What is Kokoro.Doctor?</Text>
            <Ionicons name="chevron-forward" size={20} color="#E57373" />
          </TouchableOpacity>
    
          <TouchableOpacity style={styles.option} onPress={()=>{navigation.navigate("AboutUsHow")}}>
            <Text style={styles.optionText}>How Kokoro.Doctor Works?</Text>
            <Ionicons name="chevron-forward" size={20} color="#E57373" />
          </TouchableOpacity>
    
          <TouchableOpacity style={styles.option} onPress={()=>{navigation.navigate("AboutUsWhy")}}>
            <Text style={styles.optionText}>Why Kokoro.Doctor Stands Out?</Text>
            <Ionicons name="chevron-forward" size={20} color="#E57373" />
          </TouchableOpacity>
        </View>
                
                <View style={styles.GlobleMission}>
                <View style={styles.missionBox}>
            <Text style={styles.missionHeader}>The Bigger Vision A Global Mission</Text>
            {/* <View  style={styles.backColor}> */}
            <Text style={styles.missionSubText}>
              <Text style={{ fontStyle: "italic" }}>
                For too long, heart disease has been a silent killer—especially in
                communities with poor healthcare access.
              </Text>
            </Text>
    
            {/* Benefits Boxes */}
            <View style={styles.benefitsContainer}>
              <View style={styles.benefitBox}>
                <Text style={styles.benefitText}>No more delayed heart care</Text>
              </View>
              <View style={styles.benefitBox}>
                <Text style={styles.benefitText}>No more preventable heart attacks.</Text>
              </View>
              <View style={styles.benefitBox}>
                <Text style={styles.benefitText}>
                  No family suffering because they couldn’t get help in time
                </Text>
              </View>
            </View>
            {/* </View> */}
          </View>
    
          {/* Pricing Section */}
          <Text style={styles.pricingHeader}>PRICING</Text>
          <Text style={styles.pricingSubText}>
            We believe affordable healthcare should be a reality for everyone.
          </Text>
    
          {/* Monthly Plan */}
          <View style={styles.pricingBox}>
            <Text style={styles.priceText}>₹1,999</Text>
            <Text style={styles.priceLabel}>per Month</Text>
          </View>
    
          {/* Yearly Plan with Discount */}
          <View style={styles.discountContainer}>
            <TouchableOpacity style={styles.discountBadge}>
              <Text style={styles.discountText}>SAVE 15 %</Text>
            </TouchableOpacity>
            <View style={styles.pricingBox}>
              <Text style={styles.priceText}>₹9,999</Text>
              <Text style={styles.priceLabel}>per Year</Text>
            </View>
          </View>
    
          {/* Terms Note */}
          <Text style={styles.note}>
            *This includes unlimited AI heart health assessments, emergency alerts, priority doctor consultations, and secure MediLocker.
          </Text>
                </View>
    
                <View style={styles.resolution}>
                  <Text style={styles.Resheader}>
                    Join the Revolution in Heart Health
                  </Text>
                  <Text style={styles.Resdescription}>
                    Over 100,000 users have already taken their first AI-powered
                    heart checkup, and we are just getting started.
                  </Text>
    
                  {/* Categories Section */}
                  <View style={styles.textContainer}>
                    <Text style={styles.boldText}>
                      Patients :{" "}
                      <Text style={styles.normalText}>
                        Take charge of your heart health today
                      </Text>
                    </Text>
                    <View style={styles.line} />
    
                    <Text style={styles.boldText}>
                      Healthcare Providers :{" "}
                      <Text style={styles.normalText}>
                        Partner with us for better patient outcomes
                      </Text>
                    </Text>
                    <View style={styles.line} />
    
                    <Text style={styles.boldText}>
                      Investors & Innovators:{" "}
                      <Text style={styles.normalText}>
                        Be part of the future of AI-driven healthcare
                      </Text>
                    </Text>
                    <View style={styles.line} />
                  </View>
    
                  
                  <View style={styles.ctaBox}>
                    <Text style={styles.ctaText}>
                      Your heart deserves the best care
                    </Text>
                    
                    <TouchableOpacity style={styles.ctaButton}>
                      <Text style={styles.ctaButtonText}>Check your heart now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.FinalThought}>
                  <Text style={styles.Heading}>Final Thought</Text>
                  <Text style={styles.SubTitle}>
                    This is not just another health app-{" "}
                    <Text style={styles.TextRed}>
                      This is a revolution in heart care.{" "}
                    </Text>
                  </Text>
                  <Text style={styles.content}>
                    With insights from{" "}
                    <Text style={styles.TextRed}>Harvard Innovation Labs </Text>,
                    Kokoro.Doctor is bridging the gap between{" "}
                    <Text style={styles.TextRed}>
                      early detection and life-saving action.
                    </Text>
                  </Text>
                  <Text style={styles.lastPara}>
                    Join Us in redefining heart health-
                    <Text style={styles.TextRed}>one heartbeat at a time </Text>
                  </Text>
                  <Text style={styles.kokoro}>Kokoro</Text>
                  <Text style={styles.doctor}>Doctor</Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      )}
      
      {(Platform.OS!=='web' || width<1000) && (
        <ScrollView style={styles.appContainer} ref={scrollViewRef}>
          <StatusBar barStyle="light-content" backgroundColor="#FF6B6B"/>
          {/* Header Section */}
          <View style={styles.appHeader}>
            <View style={styles.appContentWrapper}>
              {/* Menu and Profile Icons */}
              <View style={[styles.header, {height: "15%"}]}>
                <Header navigation={navigation}/>
              </View>
    
              {/* Main Title */}
              <View style={styles.appTitleContainer}>
                <Text style={styles.appTitle}>Kokoro.Doctor</Text>
                <Text style={styles.appSubtitle}>
                  Your AI-Powered Heart Health Companion
                </Text>
              </View>
            </View>
          </View>
    
          {/* About Us Section */}
          <View style={styles.appSection}>
            <Text style={styles.appSectionTitle}>About Us</Text>
            <Text style={styles.appParagraph}>
              <Text style={styles.appBold}>Kokoro.Doctor</Text> was founded with a
              mission to make AI-powered heart health accessible to everyone. As an
              I Member at Harvard Innovation Labs, our team of experts in AI,
              healthcare, and business is dedicated to bridging the gap between
              early detection and life-saving action.
            </Text>
    
            {/* Two Vertical Sections */}
            <View style={styles.appRow}>
              {/* Left Side */}
              <View style={[styles.appColumn]}>
                <Image
                  source={require("../../assets/Images/heartfail.png")} // Replace with your actual image path
                  style={[styles.appAboutImage, styles.appLeftImage]}
                  resizeMode="cover"
                />
                <Text style={styles.appParagraph}>
                  With extensive research and cutting-edge technology,
                  <Text style={styles.appBold}> Kokoro.Doctor</Text> ensures that
                  patients, doctors, and caregivers receive the best possible tools
                  for cardiac care. Our commitment to affordable, data-driven
                  healthcare makes us a leader in the field of heart health
                  solutions.
                </Text>
              </View>
    
              {/* Right Side */}
              <View style={[styles.appColumn]}>
                <Image
                  source={require("../../assets/Images/doctorwithtablet.png")} // Replace with your actual image path
                  style={[styles.appAboutImage, styles.appRightImage]}
                  resizeMode="cover"
                />
                <Text style={styles.appParagraph}>
                  We envision a world where no one suffers due to lack of timely
                  heart care. By leveraging AI, medical expertise, and innovation,{" "}
                  <Text style={styles.appBold}> Kokoro.Doctor</Text> is at the
                  forefront of the next healthcare revolution.
                </Text>
              </View>
            </View>
          </View>
          
          {/* Urgent Need Section */}
          <View style={styles.appUrgentNeedSection}>
            <Text style={styles.appUrgentNeedTitle}>The Urgent Need for Better</Text>
            <Text style={styles.appUrgentNeedTitle}>Heart Care</Text>
            <Text style={styles.appUrgentNeedDescription}>
              Heart disease is the leading cause of death globally, yet millions
              still lack quick, reliable, and affordable access to cardiac care.
            </Text>
    
            {/* Problem Section */}
            <View style={styles.appProblemcontainer}>
              {/* Main Problem Box */}
              <View style={styles.appProblemBox}>
                <Text style={styles.appProblemTitle}>The Problem</Text>
    
                {/* Problem Statements */}
                <View style={styles.appProblemContent}>
                  <Text style={styles.appProblemText}>
                    Lack of cardiologists in many cities and towns.
                  </Text>
                  <View style={styles.appSeparator} />
                  <Text style={styles.appProblemText}>
                    Long waiting times for checkups and tests.
                  </Text>
                  <View style={styles.appSeparator} />
                  <Text style={styles.appProblemText}>
                    Expensive treatments that many cannot afford.
                  </Text>
                  <View style={styles.appSeparator} />
                  <Text style={styles.appProblemText}>
                    Delayed action - many people ignore early warning signs.
                  </Text>
                </View>
              </View>
            </View>
          </View>
    
          {/* What If Section */}
          <View style={styles.appWhatIfSection}>
            <Text style={styles.appWhatIfTitle}>
              What if you could assess your heart health instantly?
            </Text>
            <Text style={styles.appWhatIfSubtitle}>
              That's why we created Kokoro.Doctor.
            </Text>
    
            {/* Expandable Options */}
            <TouchableOpacity
              style={styles.appExpandableOption}
              onPress={() => {navigation.navigate("AboutUsWhat")}}
            >
              <Text style={styles.appExpandableText}>What is Kokoro.Doctor?</Text>
              <Ionicons name="chevron-forward" size={20} color="#E57373" />
            </TouchableOpacity>
    
            <TouchableOpacity
              style={styles.appExpandableOption}
              onPress={() => {navigation.navigate("AboutUsHow")}}
            >
              <Text style={styles.appExpandableText}>How Kokoro.Doctor Works?</Text>
              <Ionicons name="chevron-forward" size={20} color="#E57373" />
            </TouchableOpacity>
    
            <TouchableOpacity
              style={styles.appExpandableOption}
              onPress={() => {navigation.navigate("AboutUsWhy")}}
            >
              <Text style={styles.appExpandableText}>
                Why Kokoro.Doctor Stands Out?
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#E57373" />
            </TouchableOpacity>
          </View>
    
          {/* Vision Section */}
          <View style={styles.appVisionSection}>
            <Text style={styles.appVisionTitle}>The Bigger Vision</Text>
            <Text style={styles.appVisionSubtitle}>A Global Mission</Text>
            <Text style={styles.appVisionDescription}>
              For too long, heart disease has been a silent killer—especially in
              communities with poor healthcare access.
            </Text>
    
            {/* Benefits Boxes */}
            <ImageBackground
              source={require("../../assets/Images/heart_background.png")}
              style={styles.appBenefitsContainer}
              imageStyle={{ opacity: 1.0 }} 
            >
              <Text style={styles.appBeliefText}>
                At Kokoro.Doctor, we believe in:
              </Text>
              <View style={[styles.appBenefitBox, styles.appFirstBenefitBox]}>
                <Text style={styles.appBenefitText}>No more delayed heart care</Text>
              </View>
              <View style={[styles.appBenefitBox, styles.appSecondBenefitBox]}>
                <Text style={styles.appBenefitText}>
                  No more preventable heart attacks
                </Text>
              </View>
              <View style={[styles.appBenefitBox, styles.appThirdBenefitBox]}>
                <Text style={styles.appBenefitText}>
                  No family suffering because they couldn't get help in time
                </Text>
              </View>
            </ImageBackground>
          </View>
    
          {/* Pricing Section */}
          <View style={styles.appPricingSection}>
            <Text style={styles.appPricingTitle}>Pricing</Text>
            <Text style={styles.appPricingDescription}>
              We believe affordable healthcare should be a reality for everyone.
            </Text>
    
            {/* Monthly Plan */}
            <View style={styles.appPricingPlan}>
              <Text style={styles.appPriceAmount}>₹999</Text>
              <Text style={styles.appPricePeriod}>per month</Text>
            </View>
    
            {/* Yearly Plan */}
            <View style={styles.appYearlyPlanContainer}>
              <View style={styles.appSaveBadge}>
                <Text style={styles.appSaveText}>SAVE 15%</Text>
              </View>
              <View style={[styles.appPricingPlan, styles.appSecondPricingPlan]}>
                <Text style={styles.appPriceAmount}>₹4999</Text>
                <Text style={styles.appPricePeriod}>per year</Text>
              </View>
            </View>
    
            {/* Pricing Note */}
            <Text style={styles.appPricingNote}>
              *This includes unlimited AI heart health assessments, emergency
              alerts, priority doctor consultations, and secure MediLocker.
            </Text>
          </View>
    
          {/* Join Revolution Section */}
          <View style={styles.appJoinSection}>
            <Text style={styles.appJoinTitle}>Join the Revolution in</Text>
            <Text style={styles.appJoinTitle}>Heart Health</Text>
            <Text style={styles.appJoinDescription}>
              Over 100,000 users have already taken
            </Text>
            <Text style={styles.appJoinDescription}>
              their first AI-powered heart checkup,
            </Text>
            <Text style={styles.appJoinDescription}>
              and we are just getting started.
            </Text>
    
            {/* Categories */}
            <View style={styles.appCategoriesContainer}>
              {/* Patients Section */}
              <View style={styles.appCategoryItem}>
                <Text style={styles.appBoldLeft}>Patients:</Text>
                <View style={styles.appFullWidthDivider} />
                <Text style={styles.appBoldBelow}>
                  Take charge of your heart health
                </Text>
              </View>
    
              {/* Healthcare Providers Section */}
              <View style={styles.appCategoryItem}>
                <Text style={styles.appBoldLeft}>Healthcare Providers:</Text>
                <View style={styles.appFullWidthDivider} />
                <Text style={styles.appBoldBelow}>
                  Partner with us for better patient outcomes
                </Text>
              </View>
    
              {/* Investors & Innovators Section */}
              <View style={styles.appCategoryItem}>
                <Text style={styles.appBoldLeft}>Investors & Innovators:</Text>
                <View style={styles.appFullWidthDivider} />
                <Text style={styles.appBoldBelow}>
                  Be part of the future of AI-driven healthcare
                </Text>
              </View>
            </View>
    
            {/* CTA Box */}
            <View style={styles.appCtaContainer}>
              <Text style={styles.appCtaText}>Your heart deserves the</Text>
              <Text style={styles.appCtaText}> best care</Text>
              <TouchableOpacity
                style={styles.appCtaButton}
                onPress={() => {
                  /* Scroll to top function here */
                }}
              >
                <Text style={styles.appButtonText}>Check Your Heart Now</Text>
                <View style={styles.appIconctaContainer}>
                  <Ionicons
                    name="arrow-up"
                    size={20}
                    color="#fff"
                    style={styles.appCtaArrowIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
    
          {/* Final Thoughts Section */}
          <View style={styles.appFinalSection}>
            <Text style={styles.appFinalTitle}>Final Thoughts</Text>
            <Text style={styles.appFinalText}>
              This is not just another health app-{" "}
              <Text style={styles.appRedText}>
                This is a revolution in heart care.
              </Text>
            </Text>
            <Text style={styles.appFinalText}>
              With insights from{" "}
              <Text style={styles.appRedText}>Harvard Innovation Labs</Text>, AI
              innovation, and a patient-centered approach,{" "}
              <Text style={styles.appRedText}>
                Kokoro.Doctor is bridging the gap between early detection and
                life-saving action.
              </Text>
            </Text>
            <Text style={styles.appFinalText}>
              Join us in redefining heart health-{" "}
              <Text style={styles.appRedText}>one heartbeat at a time</Text>
            </Text>
            <TouchableOpacity
              style={styles.appAtTopButton}
              onPress={scrollToTop}
            >
              <Text style={styles.appButtonText}>At top</Text>
              <View style={styles.appIconctaContainer}>
                <Ionicons
                  name="arrow-up"
                  size={20}
                  color="#fff"
                  style={styles.appArrowIcon}
                />
              </View>
            </TouchableOpacity>
    
            {/* Brand Footer */}
            <View style={styles.appBrandFooter}>
              <Text style={styles.appFooterKokoro}>Kokoro</Text>
              <Text style={styles.appFooterDoctor}>Doctor</Text>
            </View>
          </View>
      </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  imageContainer: {
    //borderWidth: 2,
    borderColor: "#00ffff",
    height: "100%",
    width: "100%",
  },
  parent: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  Left: {
    height: "100%",
    width: "15%",
  },
  Right: {
    height: "100%",
    width: "85%",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    //transform:[{scale:0.8}],
    opacity: 80,
    //marginVertical:"-5%"
    alignSelf: "center",
    flexDirection: "column",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    zIndex: 2,
    ...Platform.select({
      web:{
        width:"100%",
      }
    })
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingBottom: 20,
  },
  title: {
    padding: 20,
    height: 180,
    flexDirection: "column",
    backgroundColor: "#dc6060",
    justifyContent: "center",
  },
  brandName: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#D0C4FF",
  },
  doctorText: {
    color: "#B0A0FF",
  },
  tagline: {
    fontSize: 25,
    color: "#e0a8c8",
    marginTop: 5,
  },

  AboutSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  textBox: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    // borderRadius: 10,
    // marginHorizontal: 10,

    width: "66%",
    position: "relative",
  },
  delayedBorder: {
    position: "absolute",
    right: 0,
    top: "15%", 
    height: "50%", 
    width: 2, 
    backgroundColor: "black",
  },
  aboutTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  text: {
    fontFamily: "Noticia Text",
    fontSize: 18,
    color: "black",
    lineHeight: 22,
  },
  bold: {
    fontWeight: "bold",
  },
  rightSection: {
    width: "30%",
    padding: 15,
    paddingLeft: 20, 
    flexShrink: 1,
    maxWidth: "100%",
  },
  urgentNeedTitle: {
    marginTop: "20%",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  highlight: {
    color: "#FFD700", 
  },
  urgentNeedText: {
    fontSize: 14,
    color: "#ed0f0f",
    marginTop: 5,
  },

  //---
  Need: {
    padding: 15,
    backgroundColor: "#B0B6FF",
  },
  headerNeed: {
    marginBottom: 20,
  },
  headerTextNeed: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "#666", 
    marginTop: 5,
  },
  problemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
    paddingLeft: "2%",
  },
  problemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 15,
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  problemBox: {
    width: "48%",
    // height:"60%",
    backgroundColor: "#EDE9FE", // Light purple box
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    alignItems: "center",
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 2, height: 2 },
    // shadowRadius: 5,
    // elevation: 5, // For Android shadow
  },
  problemText: {
    fontSize: 15,
    color: "#C20000", // Red text
    fontWeight: "bold",
    textAlign: "center",
  },
  circle1: {
    position: "absolute",
    top: 80,
    right: 40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F4CFA5",
    opacity: 0.6,
  },
  circle2: {
    position: "absolute",
    bottom: 50,
    right: -20,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#B7A2E9",
    opacity: 0.4,
  },
  //----
  access:{
padding:15,
backgroundColor:"#FFFFFF"
  },
  head: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    paddingLeft:"5%"
  },
  subhead: {
    fontSize: 16,
    paddingLeft:"5%",
    color: "#333",
    marginBottom: 20,
  },
  option: {
    backgroundColor: "#333",
    padding: 15,
    paddingLeft:"5%",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  optionText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
//-------
GlobleMission:{
  padding:15,
},
missionBox: {
  backgroundColor: "#FFF",
  padding: 15,
  borderRadius: 10,
  borderWidth: 4,
  borderColor: "#FECF58", // Yellow border
  width: "100%",
  // alignItems: "center",
  marginBottom: 30,
  paddingBottom:"15%"
},
missionHeader: {
  fontSize: 16,
  fontWeight: "bold",
  // textAlign: "center",
},

missionSubText: {
  fontSize: 14,
  color: "#666",
  // textAlign: "center",
  marginTop: 5,
  marginBottom: 10,
},
benefitsContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
},
benefitBox: {
  backgroundColor: "#E29558", // Orange color
  padding: 10,
  borderRadius: 10,
  width: "30%",
  alignItems: "center",
},
benefitText: {
  color: "#FFF",
  fontSize: 12,
  textAlign: "center",
},
pricingHeader: {
  fontSize: 20,
  fontWeight: "bold",
  alignSelf: "flex-start",
  marginBottom: 5,
},
pricingSubText: {
  fontSize: 22,
  color: "#666",
  // textAlign: "center",
  marginBottom: 20,
},
pricingBox: {
  // backgroundColor: "#",
  paddingVertical: 10,
  marginRight:"70%",
  paddingHorizontal: 20,
  borderRadius: 10,
  borderWidth:2,
  borderColor:"green",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 10,
},
priceText: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#333",
},
priceLabel: {
  fontSize: 14,
  color: "#666",
  marginLeft: 5,
},
discountContainer: {
  marginLeft:"50%",
  flexDirection: "row",
  alignItems: "center",
},
discountBadge: {
  backgroundColor: "#4CAF50", // Green Badge
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderRadius: 5,
  marginRight: 10,
},
discountText: {
  color: "#FFF",
  fontSize: 12,
  fontWeight: "bold",
},
note: {
  fontSize: 12,
  color: "#120909f3",
  textAlign: "center",
  marginTop: 10,
  marginRight:"20%",
  paddingHorizontal: 10,
},
  //----
  resolution: {
    padding: 15,
    marginRight: "1%",
    marginHorizontal:"2%",
    backgroundColor: "#FFECC4",
    borderRadius: "2%",
  },
  Resheader: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
  },
  Resdescription: {
    fontSize: 16,
    textAlign: "center",
    color: "#555", // Grey Text
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  normalText: {
    fontWeight: "normal",
  },
  line: {
    width: "80%",
    height: 1,
    backgroundColor: "#000",
    marginVertical: 5,
  },
  ctaBox: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginLeft: "35%",
    marginRight: "35%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
  },
  ctaText: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "#FF6B6B", // Soft Red Button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  ctaButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  //--------- final page
  FinalThought: {
    backgroundColor: "white",
    padding: 20,
  },
  Heading: {
    fontSize: 28,
    fontWeight: "bold",
  },
  SubTitle: {
    paddingTop: "1%",
    fontSize: 22,
  },
  TextRed: {
    color: "red",
  },
  content: {
    paddingTop: "1%",
    fontSize: 22,
  },
  lastPara: {
    paddingTop: "1%",
    paddingLeft: "20%",
    paddingRight: "20%",
    fontSize: 22,
    // marginBottom:"25%"
  },
  kokoro: {
    fontSize: 120,
    fontFamily: "bold",
    color: "#bebcbc",
  },
  doctor: {
    marginLeft: "30%",
    fontSize: 120,
    fontFamily: "bold",
    color: "#bebcbc",
  },

  //APP design starts
  appContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Header Styles
  appHeader: {
    width: "100%",
    backgroundColor: "#FF6B6B",
    flex: 1,
  },
  appContentWrapper: {
    marginTop: "10%",
    ...Platform.select({
      web:{
        marginTop: "0%",
      }
    })
  },
  appTitleContainer: {
    width: "100%",
    marginTop: "20%",
    paddingHorizontal: "5%",
  },
  appTitle: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
  },
  appSubtitle: {
    fontSize: 26,
    color: "#fff",
    marginTop: "1%",
  },

  // About Us Section
  appSection: {
    width: "100%",
    padding: "5%",
    backgroundColor: "#fff",
  },
  appSectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: "3%",
  },
  appParagraph: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
    width: "100%",
    textAlign: "left",
  },
  appBold: {
    fontWeight: "bold",
    fontColor: "#000000",
  },
  appRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    width: "100%",
  },
  appColumn: {
    width: "50%",
    padding: 10,
  },
  appAboutImage: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },
  appLeftImage: {
    // marginLeft: "-10%",
  },
  appRightImage: {
    // marginRight: "-10%",
  },
  // Urgent Need Section
  appUrgentNeedSection: {
    width: "90%",
    padding: "5%",
    backgroundColor: "#B0B6FF",
    borderRadius: 10,
    marginHorizontal: "auto",
  },
  appUrgentNeedTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "2%",
  },
  appUrgentNeedDescription: {
    fontSize: 16,
    color: "#333",
    marginBottom: "5%",
  },
  appProblemcontainer: {
    width: "100%",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  appProblemBox: {
    backgroundColor: "#DADDFF",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    width: "100%",
    alignSelf: "stretch",
  },
  appProblemBlock: {
    backgroundColor: "#B0B6FF",
    padding: 10,
    borderRadius: 8,
  },
  appProblemText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 5,
  },
  appProblemContent: {
    width: "100%",
    alignItems: "center",
  },
  appSeparator: {
    height: 1,
    backgroundColor: "#B0B6FF",
    width: "100%",
    marginVertical: 5,
    alignSelf: "stretch",
  },
  // What If Section
  appWhatIfSection: {
    width: "100%",
    padding: "5%",
    backgroundColor: "#fff",
  },
  appWhatIfTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "2%",
  },
  appWhatIfSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: "5%",
  },
  appExpandableOption: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: "4%",
    borderRadius: 8,
    marginBottom: "3%",
  },
  appExpandableText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },

  // Vision Section
  appVisionSection: {
    width: "100%",
    padding: "5%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FECF58",
    margin: "5%",
    width: "90%",
  },
  appVisionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  appVisionSubtitle: {
    fontSize: 18,
    marginBottom: "3%",
  },
  appVisionDescription: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
    marginBottom: "5%",
  },
  appBenefitsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  appBenefitBox: {
    width: "45%",
    aspectRatio: 1,
    backgroundColor: "#E29558",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  appBenefitText: {
    fontSize: 18,
    fontwWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  appFirstBenefitBox: {
    alignSelf: "flex-start",
    marginRight: 20,
  },
  appSecondBenefitBox: {
    alignSelf: "flex-end",
  },
  appThirdBenefitBox: {
    alignSelf: "flex-end",
    marginTop: 15,
    marginLeft: "auto",
  },
  appBeliefText: {
    fontSize: 16,
    fontWeight: " Extra Bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 25,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontFamily: "Montserrat",
  },

  // Pricing Section
  appPricingSection: {
    width: "100%",
    padding: "5%",
    backgroundColor: "#fff",
  },
  appPricingTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "2%",
  },
  appPricingDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: "3%",
  },
  appPricingPlan: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "2%",
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 6,
    marginBottom: "4%",
    flexWrap: "wrap",
  },
  appPriceAmount: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 24,
    marginBottom: 5,
  },
  appPricePeriod: {
    fontSize: 16,
    color: "#666",
    marginLeft: "2%",
    marginTop: 3,
  },
  appYearlyPlanContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "3%",
  },
  appSaveBadge: {
    backgroundColor: "#4CAF50",
    padding: "2%",
    borderRadius: 4,
    marginRight: "3%",
  },
  appSaveText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  appPricingNote: {
    fontSize: 12,
    color: "#666",
    width: "90%",
  },
  appSecondPricingPlan: {
    marginLeft: "auto",
  },

  // Join Revolution Section
  appJoinSection: {
    width: "100%",
    padding: "7%",
    backgroundColor: "#FFECC4",
    borderRadius: 10,
    margin: "5%",
    width: "90%",
  },
  appJoinTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "3%",
  },
  appJoinDescription: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: "5%",
  },
  appCategoriesContainer: {
    width: "100%",
  },
  appCategoryItem: {
    width: "100%",
    marginBottom: "4%",
    paddingHorizontal: "5%",
  },
  appBoldLeft: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
  },
  appBoldBelow: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: "4%",
  },
  appFullWidthDivider: {
    width: "100%",
    height: 2,
    backgroundColor: "#000000",
    marginVertical: "2%",
  },
  appCtaContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: "7%",
    borderRadius: 12,
    alignItems: "center",
    alignSelf: "center",
    marginTop: "7%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  appCtaText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "5%",
    textAlign: "center",
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    display: "flex",
  },
  appCtaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF7072",
    paddingVertical: "5%",
    paddingHorizontal: "12%",
    borderRadius: 30,
  },
  appButtonText: {
    color: "#fff",
    fontSize: 16,
    marginRight: 5,
    lineHeight: 24,
  },
  appIconctaContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  appCtaArrowIcon: {
    position: "absolute",
    transform: [{ rotate: "30deg" }],
  },
  // Final Thoughts Section
  appFinalSection: {
    width: "100%",
    padding: "5%",
    backgroundColor: "#fff",
  },
  appFinalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: "3%",
  },
  appFinalText: {
    fontSize: 18,
    marginBottom: "3%",
  },
  appRedText: {
    color: "#E57373",
  },
  appAtTopButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "#E57373",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  appArrowIcon: {
    position: "absolute",
  },
  appBrandFooter: {
    width: "100%",
    marginTop: "5%",
  },
  appFooterKokoro: {
    fontSize: 96,
    color: "#ccc",
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  appFooterDoctor: {
    fontSize: 96,
    color: "#ccc",
    fontWeight: "bold",
    marginLeft: "10%",
    fontFamily: "Poppins",
    alignSelf: "flex-end",
  },
});

export default AboutUsMain;
