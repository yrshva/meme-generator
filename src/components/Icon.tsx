import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { StyleSheet } from "react-native";
import React from "react";

type IconName = "house" | "user" | "pencil";

type Props = {
  name: IconName;
  size: number;
  type?: "solid" | "light";
  color?: string;
};

const Icon = ({ name, size, type, color }: Props) => {
  return (
    <FontAwesome6
      name={name}
      size={size}
      solid={type === "solid"}
      light={type === "light"}
      color={color}
    />
  );
};

export default Icon;
