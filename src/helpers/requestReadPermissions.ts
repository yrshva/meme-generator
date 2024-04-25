import { Platform } from "react-native";
import { request, PERMISSIONS } from "react-native-permissions";

const requestReadPermissions = async () => {
  if (Platform.OS === "android") {
    return request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then(permission => {
      if (permission === "granted") {
        return;
      }
      throw new Error("Permissions denied");
    });
  }
  return request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(permission => {
    if (permission === "granted") {
      return;
    }
    throw new Error("Permissions denied");
  });
};

export default requestReadPermissions;
