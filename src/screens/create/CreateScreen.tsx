import { useMutation } from "@tanstack/react-query";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { request, PERMISSIONS } from "react-native-permissions";
import Toast from "react-native-toast-message";
import React from "react";

import spacing from "../../theme/spacing";
import postImage, { PostImageParams } from "../../api/postImage";
import ImageLoader from "./components/ImageLoader";

const CreateScreen = () => {
  const uploadImageMutation = useMutation({
    mutationFn: (params: PostImageParams) => postImage(params),
  });

  const onError = () => {
    Toast.show({
      type: "error",
      text2: "There was an error uploading your image",
    });
  };

  const handleUpload = () => {
    launchImageLibrary({ mediaType: "photo", selectionLimit: 1 })
      .then(({ assets, didCancel }) => {
        if (didCancel || !assets?.length) {
          return;
        }
        const { uri, type, fileName, base64 } = assets[0];

        if (!uri || !type || !fileName) {
          return Toast.show({
            type: "error",
            text2: "There was an error uploading your image",
          });
        }

        uploadImageMutation
          .mutateAsync({
            user: "test",
            image: {
              uri,
              type,
              name: fileName,
            },
          })
          .then(res => {
            console.log("uploaded", res);
          })
          .catch(onError);
      })
      .catch(onError);
  };

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageLoader
        onUpload={onUploadPress}
        isLoading={uploadImageMutation.isPending}
      />
    </ScrollView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    padding: spacing.l,
  },
});
