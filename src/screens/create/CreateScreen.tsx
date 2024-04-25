import { ScrollView, StyleSheet, Text, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { captureRef } from "react-native-view-shot";
import Toast from "react-native-toast-message";
import React, { useRef, useState } from "react";

import spacing from "../../theme/spacing";
import ImageLoader from "./components/ImageLoader";
import { Button } from "../../components/Button";
import colors from "../../theme/colors";
import { useSubmitPostMutation } from "../../api/queryMutations";
import TextEditor from "./components/TextEditor";
import AddedTexts, { AddedText } from "./components/AddedTexts";

const CreateScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState<null | string>(null);
  const [isTextEditorOpen, setIsTextEditorOpen] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [addedTexts, setAddedTexts] = useState<Array<AddedText>>([]);
  const ref = useRef<View>(null);
  const submitPostMutation = useSubmitPostMutation();

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

  const handlePublish = () => {
    const user = "crazyfrog";
    captureRef(ref)
      .then(uri => {
        submitPostMutation
          .mutateAsync({
            user,
            image: {
              uri: uri,
              type: "image/png",
              name: `${user}-${Date.now()}`,
            },
          })
          .then(() => {
            Toast.show({
              type: "success",
              text2: "Succesfully published",
            });
          });
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text2: "There was an error publishing your post",
        });
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.base,
        paddingVertical: spacing.l,
      }}>
      <View ref={ref} style={styles.captureContainer}>
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
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.l }}>
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
        onPress={async () => {
          if (imageUri) {
            handlePublish();
          }
        }}
        style={{ marginHorizontal: spacing.l }}
        loading={submitPostMutation.isPending}
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
  captureContainer: {
    justifyContent: "center",
    paddingHorizontal: spacing.l,
    height: 300,
  },
});
