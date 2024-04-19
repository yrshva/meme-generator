import { Platform } from "react-native";

const IOS_API_URL = "http://localhost:3030";

const ANDROID_API_URL = "http://10.0.2.2:3030";

const API_URL = Platform.OS === "android" ? ANDROID_API_URL : IOS_API_URL;

const config = {
  API_URL,
};

export default config;
