import { Text, View } from "react-native";
import React from "react";

type Props = {
  text: string;
};

const ComigSoonPlaceholder = ({ text }: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ fontWeight: "700", fontSize: 15, textAlign: "center" }}>
        {text}
      </Text>
    </View>
  );
};

export default ComigSoonPlaceholder;
