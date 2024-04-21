import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { request, PERMISSIONS } from "react-native-permissions";
import Toast from "react-native-toast-message";
import React, { useState } from "react";

import spacing from "../../theme/spacing";
import ImageLoader from "./components/ImageLoader";
import { Button } from "../../components/Button";
import colors from "../../theme/colors";
import TextEditor from "./components/TextEditor";

const CreateScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState<null | string>(null);
  const [isTextEditorOpen, setIsTextEditorOpen] = useState(false);
  const [textInput, setTextInput] = useState("");

  const handleUpload = () => {
    setIsLoading(true);
    launchImageLibrary({ mediaType: "photo", selectionLimit: 1 })
      .then(({ assets, didCancel }) => {
        if (didCancel || !assets?.length) {
          return;
        }
        const { uri, type, fileName } = assets[0];

        if (!uri || !type || !fileName) {
          return Toast.show({
            type: "error",
            text2: "There was an error uploading your image",
          });
        }
        setImageUri(uri);
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text2: "There was an error uploading your image",
        });
      })
      .finally(() => setIsLoading(false));
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
    <View style={{ flex: 1, backgroundColor: colors.base }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <ImageLoader
            onUpload={onUploadPress}
            isLoading={isLoading}
            uri={imageUri}
          />
          {textInput.length ? (
            <Text style={styles.text}>{textInput}</Text>
          ) : null}
        </View>
        <Button
          text="Add text"
          onPress={() => {
            setIsTextEditorOpen(true);
          }}
          style={styles.uploadButton}
          disabled={!imageUri}
        />
        <Button
          text="Remove"
          onPress={() => {
            setTextInput("");
            setImageUri(null);
          }}
          style={styles.uploadButton}
          variant="secondary"
          disabled={!imageUri}
        />
      </ScrollView>
      <TextEditor
        visible={isTextEditorOpen}
        onClose={() => {
          setIsTextEditorOpen(false);
        }}
        textInput={textInput}
        setTextInput={value => setTextInput(value)}
      />
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    padding: spacing.l,
  },
  uploadButton: {
    marginTop: spacing.l,
  },
  closeButton: {
    position: "absolute",
    top: spacing.l,
    right: spacing.m,
  },
  text: {
    position: "absolute",
    fontSize: 24,
    padding: spacing.s,
    textShadowColor: colors.main,
    textShadowRadius: 2,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    color: colors.base,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
