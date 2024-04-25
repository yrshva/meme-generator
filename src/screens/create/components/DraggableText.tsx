import {
  Animated,
  Dimensions,
  LayoutRectangle,
  PanResponder,
  StyleSheet,
  Text,
} from "react-native";
import React, { Fragment, useRef, useState } from "react";
import colors from "../../../theme/colors";
import spacing from "../../../theme/spacing";
import TextEditor from "./TextEditor";
import { AddedText } from "./AddedTexts";

type Props = {
  text: string;
  editText: (value: string) => void;
  removeText: () => void;
};

const DraggableText = ({ text, editText, removeText }: Props) => {
  const [textLayout, setTextLayout] = useState<LayoutRectangle | null>(null);
  const [isTextEditorOpen, setIsTextEditorOpen] = useState(false);
  const [textInput, setTextInput] = useState(text);
  const initialPosition = { x: spacing.m, y: 250 / 2 };

  const [currentPosition, setCurrentPosition] = useState(initialPosition);
  const pan = useRef(new Animated.ValueXY(initialPosition)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      const { dx, dy } = gesture;
      const newX = currentPosition.x + dx;
      const newY = currentPosition.y + dy;

      // Check boundaries
      const maxX =
        Dimensions.get("window").width - textLayout!.width - spacing.m;
      const maxY = 300 - textLayout!.height - spacing.m;
      const boundedX = Math.max(spacing.m, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));

      pan.setValue({ x: boundedX, y: boundedY });
      setCurrentPosition({ x: boundedX, y: boundedY });
    },
    onMoveShouldSetPanResponderCapture: (_, gestureState) =>
      Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5,
  });

  return (
    <Fragment>
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), { position: "absolute" }]}
        onLayout={({ nativeEvent }) => {
          if (textLayout !== nativeEvent.layout) {
            setTextLayout(nativeEvent.layout);
          }
        }}>
        <Text
          style={styles.newText}
          onPress={() => {
            setIsTextEditorOpen(true);
          }}>
          {isTextEditorOpen ? textInput : text}
        </Text>
      </Animated.View>
      <TextEditor
        visible={isTextEditorOpen}
        onClose={() => {
          setIsTextEditorOpen(false);
          setTextInput(text);
        }}
        textInput={textInput}
        setTextInput={value => setTextInput(value)}
        onSave={() => {
          editText(textInput);
          setIsTextEditorOpen(false);
        }}
        onRemove={removeText}
      />
    </Fragment>
  );
};

export default DraggableText;

const styles = StyleSheet.create({
  newText: {
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
});
