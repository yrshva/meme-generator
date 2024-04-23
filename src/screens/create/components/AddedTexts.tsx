import { TextStyle, ViewStyle } from "react-native";
import React from "react";

import DraggableText from "./DraggableText";

export interface AddedText {
  id: number;
  text: string;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

interface Props {
  addedTexts: Array<AddedText>;
  amendText: (value: AddedText) => void;
}

const AddedTexts = ({ addedTexts, amendText }: Props) => {
  if (!addedTexts.length) {
    return null;
  }

  return addedTexts.map(item => (
    <DraggableText key={item.id} text={item.text} />
  ));
};

export default AddedTexts;
