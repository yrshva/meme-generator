import React from "react";
import { Text, View } from "react-native";
import fontSizes from "../theme/fontSizes";
import colors from "../theme/colors";

interface Props {
  text: string;
}

const EmptyListComponent = ({ text }: Props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}>
      <Text
        style={{
          fontSize: fontSizes.xl,
          color: colors.main_lighter,
        }}>
        {text}
      </Text>
    </View>
  );
};
export default EmptyListComponent;
