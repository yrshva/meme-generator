import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import React from "react";

import colors from "../../../theme/colors";
import { Button } from "../../../components/Button";
import { PERMISSIONS, request } from "react-native-permissions";

interface ImageLoaderProps {
  handleUpload: () => void;
  uri: string | null;
  isLoading: boolean;
}

const ImageLoader = ({ handleUpload, uri, isLoading }: ImageLoaderProps) => {
  const onUploadPress = () => {
    if (
      (Platform.OS === "ios" && PERMISSIONS.IOS.MEDIA_LIBRARY) ||
      (Platform.OS === "android" && PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION)
    ) {
      return handleUpload();
    }

    request(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then(permission => {
        if (permission === "granted") {
          return handleUpload();
        }
        throw new Error("Permissions Required");
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Permissions Required",
          text2:
            "You need to give us access to your photo library in order to upload an image",
        });
      });
  };

  if (isLoading) {
    return (
      <View style={styles.imageSkeleton}>
        <ActivityIndicator />
      </View>
    );
  }
  if (uri) {
    return <Image source={{ uri }} style={styles.image} resizeMode="contain" />;
  }
  return (
    <View style={styles.imageSkeleton}>
      <Button onPress={onUploadPress} text="Upload" variant="secondary" />
    </View>
  );
};

export default ImageLoader;

const styles = StyleSheet.create({
  imageSkeleton: {
    minHeight: 300,
    backgroundColor: colors.primary_light,
    borderColor: colors.primary_light,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  image: {
    flex: 1,
    width: "100%",
    minHeight: 300,
    borderColor: colors.primary_light,
    borderRadius: 10,
    borderWidth: 1,
  },
});
