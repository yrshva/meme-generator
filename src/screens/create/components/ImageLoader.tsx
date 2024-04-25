import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import React from "react";

import colors from "../../../theme/colors";
import { Button } from "../../../components/Button";
import requestReadPermissions from "../../../helpers/requestReadPermissions";

interface ImageLoaderProps {
  handleUpload: () => void;
  uri: string | null;
  isLoading: boolean;
}

const ImageLoader = ({ handleUpload, uri, isLoading }: ImageLoaderProps) => {
  const onUploadPress = async () => {
    return requestReadPermissions()
      .then(handleUpload)
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Permissions Required",
          text2:
            "You need to give us access to your media library in order to upload an image",
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
    maxWidth: 450,
  },
  image: {
    flex: 1,
    borderColor: colors.primary_light,
    borderRadius: 10,
    borderWidth: 1,
    maxWidth: 450,
  },
});
