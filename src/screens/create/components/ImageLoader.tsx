import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";
import colors from "../../../theme/colors";
import { Button } from "../../../components/Button";

interface ImageLoaderProps {
  onUpload: () => void;
  isLoading: boolean;
}

const ImageLoader = ({ onUpload, isLoading }: ImageLoaderProps) => {
  if (isLoading) {
    return (
      <View style={styles.imageSkeleton}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.imageSkeleton}>
      <Button onPress={onUpload} text="Upload" />
    </View>
  );
};

export default ImageLoader;

const styles = StyleSheet.create({
  imageSkeleton: {
    height: 200,
    backgroundColor: colors.secondary_lighter,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
