import { ScrollView, StyleSheet, Text, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Toast from "react-native-toast-message";
import ViewShot from "react-native-view-shot";
import React, { useRef, useState } from "react";

import spacing from "../../theme/spacing";
import ImageLoader from "./components/ImageLoader";
import { Button } from "../../components/Button";
import colors from "../../theme/colors";
import TextEditor from "./components/TextEditor";
import AddedTexts, { AddedText } from "./components/AddedTexts";
import CaptureMeme from "./components/CaptureMeme";

const CreateScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState<null | string>(null);
  const [isTextEditorOpen, setIsTextEditorOpen] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [addedTexts, setAddedTexts] = useState<Array<AddedText>>([]);
  const captureRef = useRef<ViewShot>(null);

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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.base,
        paddingVertical: spacing.l,
      }}>
      <CaptureMeme captureRef={captureRef}>
        <ImageLoader
          handleUpload={handleUpload}
          isLoading={isLoading}
          uri={imageUri}
        />
        {isTextEditorOpen && textInput.length ? (
          <Text style={styles.text}>{textInput}</Text>
        ) : null}
        <AddedTexts
          addedTexts={addedTexts}
          amendText={(newText: AddedText) =>
            setAddedTexts(prev =>
              prev.map(oldText =>
                oldText.id === newText.id ? newText : oldText,
              ),
            )
          }
          removeText={(removedText: AddedText) =>
            setAddedTexts(prev => prev.filter(item => item !== removedText))
          }
        />
      </CaptureMeme>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: spacing.l }}>
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
            setAddedTexts([]);
            setImageUri(null);
          }}
          style={styles.uploadButton}
          variant="secondary"
          disabled={!imageUri}
        />
      </ScrollView>
      <Button
        text="Publish"
        onPress={() => {
          if (imageUri) {
            captureRef.current?.capture?.();
          }
        }}
        style={{ marginHorizontal: spacing.l }}
        disabled={!imageUri}
      />
      <TextEditor
        visible={isTextEditorOpen}
        onClose={() => {
          setIsTextEditorOpen(false);
          setTextInput("");
        }}
        textInput={textInput}
        setTextInput={value => setTextInput(value)}
        onSave={() => {
          setAddedTexts(prev => [
            ...prev,
            {
              id: prev.length,
              text: textInput,
            },
          ]);
          setTextInput("");
          setIsTextEditorOpen(false);
        }}
        onRemove={() => setTextInput("")}
      />
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  uploadButton: {
    marginTop: spacing.l,
  },
  text: {
    position: "absolute",
    fontSize: 24,
    padding: spacing.m,
    paddingStart: spacing.xl,
    textShadowColor: colors.main,
    textShadowRadius: 2,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    color: colors.base,
    zIndex: 100,
  },
});
