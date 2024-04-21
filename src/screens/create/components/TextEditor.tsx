import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
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
};

const TextEditor = ({ visible, textInput, onClose, setTextInput }: Props) => {
  const [modalContentY, setModalContentY] = useState(0);
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
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
                    onPress: () => {
                      onClose();
                      setTextInput("");
                    },
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
            setTextInput("");
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
                paddingBottom: insets.bottom ?? spacing.l,
              }}
              keyboardShouldPersistTaps="handled">
              <Text style={styles.title}>Text editor</Text>
              <TextInput
                placeholder="Enter text"
                style={styles.input}
                value={textInput}
                ref={inputRef}
                onChangeText={value => {
                  setTextInput(value);
                }}
                numberOfLines={6}
                multiline
              />
              <Button
                onPress={onClose}
                text="Save"
                variant="secondary"
                style={styles.saveButton}
                disabled={textInput.length < 1}
              />
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
  title: {
    fontSize: fontSizes.l,
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
});
