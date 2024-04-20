import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import React, { useState } from "react";
import colors from "../../../theme/colors";
import spacing from "../../../theme/spacing";
import fontSizes from "../../../theme/fontSizes";
import { Button } from "../../../components/Button";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const TextEditor = ({ visible, onClose }: Props) => {
  const [modalContentY, setModalContentY] = useState(0);
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      collapsable
      onRequestClose={onClose}>
      <TouchableWithoutFeedback
        onPress={e => {
          if (e.nativeEvent.pageY < modalContentY) {
            onClose();
          }
        }}>
        <View style={styles.modalContainer}>
          <View
            style={styles.modalContent}
            onLayout={e => {
              setModalContentY(e.nativeEvent.layout.y);
            }}>
            <Text style={styles.title}>Text editor</Text>
            <ScrollView
              contentContainerStyle={{
                padding: spacing.l,
                paddingBottom: spacing.l + insets.bottom,
              }}>
              <TextInput placeholder="Enter text" style={styles.input} />
              <Button onPress={() => {}} text="Save" variant="secondary" />
            </ScrollView>
          </View>
        </View>
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
    backgroundColor: colors.base,
  },
  title: {
    fontSize: fontSizes.l,
    padding: spacing.l,
    backgroundColor: colors.secondary_light,
  },
  input: {},
});
