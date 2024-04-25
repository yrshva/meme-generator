import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import React, { useEffect, useRef, useState } from "react";
import colors from "../../../theme/colors";
import spacing from "../../../theme/spacing";
import fontSizes from "../../../theme/fontSizes";
import { Button } from "../../../components/Button";

type Props = {
  visible: boolean;
  textInput: string;
  onClose: () => void;
  setTextInput: (value: string) => void;
  onSave: () => void;
  onRemove?: () => void;
};

const TextEditor = ({
  visible,
  textInput,
  onClose,
  setTextInput,
  onSave,
  onRemove,
}: Props) => {
  const [modalContentY, setModalContentY] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const maxLines = 6;

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      () => setIsKeyboardVisible(true),
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => setIsKeyboardVisible(false),
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback
        onPress={e => {
          if (e.nativeEvent.pageY < modalContentY) {
            if (textInput.length > 0) {
              return Alert.alert(
                "Unsaved changes",
                "Are you sure you want to discard your changes?",
                [
                  {
                    text: "Yes",
                    onPress: onClose,
                    style: "destructive",
                  },
                  {
                    text: "Go back",
                    style: "cancel",
                  },
                ],
              );
            }

            onClose();
          }
        }}>
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View
            style={styles.modalContent}
            onLayout={e => {
              setModalContentY(e.nativeEvent.layout.y);
            }}>
            <ScrollView
              contentContainerStyle={{
                padding: spacing.l,
                paddingBottom:
                  spacing.l + (isKeyboardVisible ? 0 : insets.bottom),
              }}
              keyboardShouldPersistTaps="handled">
              <TextInput
                placeholder="Enter text"
                style={styles.input}
                value={textInput}
                ref={inputRef}
                onChangeText={value => {
                  const lines = value.split("\n");
                  if (lines.length <= maxLines) {
                    setTextInput(value);
                  }
                }}
                numberOfLines={maxLines}
                multiline
              />
              <Button
                onPress={onSave}
                text="Save"
                style={styles.saveButton}
                disabled={textInput.length < 1}
              />
              {onRemove && (
                <Button
                  onPress={onRemove}
                  text="Remove"
                  variant="secondary"
                  style={styles.removeButton}
                />
              )}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default TextEditor;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: colors.primary_light,
  },
  input: {
    padding: spacing.m,
    fontSize: fontSizes.m,
    borderWidth: 1,
    borderColor: colors.primary_lighter_x_x,
    borderRadius: 10,
    marginTop: spacing.m,
  },
  saveButton: {
    marginTop: spacing.l,
  },
  removeButton: {
    marginTop: spacing.l,
  },
});
