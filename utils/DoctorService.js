import { API_URL } from "../env-vars";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

const fileToBase64 = async (file) => {
  if (!file || !file.uri) return null;

  if (Platform.OS === "web") {
    //For web platform , convert file to blob and then to base64
    const response = await fetch(file.uri);
    const blob = await response.blob();
    // For web platform, we can use FileReader API
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        resolve(result.split(",")[1]);
      };
      reader.onerror = (err) => {
        console.error("Error reading file:", err);
        reject(err);
      };
      reader.readAsDataURL(blob);
    });
  } else {
    //For android or ios platform, we can use expo-file-system to read the file as base64
    try {
      const base64 = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      return base64;
    } catch (error) {
      console.error("Error converting file to base64:", error);
      throw new Error("File conversion failed");
    }
  }
};
export const registerMedicalDetails = async (
  email,
  licenseNo,
  specialization,
  experience,
  hospital,
  file
) => {
  let base64File = null;
  if (file?.uri) {
    base64File = await fileToBase64(file);
  }
  const response = await fetch(`${API_URL}/doctorsService/updateProfile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      licenseNumber: licenseNo,
      specialization: specialization,
      experience: experience,
      affiliation: hospital,
      degreeCertificate: {
        filename: "degree_certificate",
        base64_content: base64File,
      },
    }),
  });
  if (!response.ok) {
    const errorResponse = await response.json();
    console.error("Error response:", errorResponse);
    throw new Error("Failed to register medical details");
  }

  return await response.json();
};
