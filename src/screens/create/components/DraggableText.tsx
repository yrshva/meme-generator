import {
  Animated,
  Dimensions,
  LayoutRectangle,
  PanResponder,
  StyleSheet,
  Text,
} from "react-native";
import React, { useRef, useState } from "react";
import colors from "../../../theme/colors";
import spacing from "../../../theme/spacing";

type Props = {
  text: string;
};

const DraggableText = ({ text }: Props) => {
  const initialPosition = { x: 0, y: 250 / 2 };

  const [textLayout, setTextLayout] = useState<LayoutRectangle | null>(null);
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
    <Animated.View
      {...panResponder.panHandlers}
      style={[pan.getLayout(), { position: "absolute" }]}
      onLayout={({ nativeEvent }) => {
        if (!textLayout) {
          setTextLayout(nativeEvent.layout);
        }
      }}>
      <Text
        style={styles.newText}
        onPress={() => {
          // TODO: add editing and removing
        }}>
        {text}
      </Text>
    </Animated.View>
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
