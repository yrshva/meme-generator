import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import React from "react";
import colors from "../../../theme/colors";
import { Button } from "../../../components/Button";

interface ImageLoaderProps {
  onUpload: () => void;
  uri: string | null;
  isLoading: boolean;
}

const ImageLoader = ({ onUpload, uri, isLoading }: ImageLoaderProps) => {
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
      <Button onPress={onUpload} text="Upload" variant="secondary" />
    </View>
  );
};

export default ImageLoader;

const styles = StyleSheet.create({
  imageSkeleton: {
    minHeight: 300,
    backgroundColor: colors.primary_light,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    minHeight: 300,
  },
});
