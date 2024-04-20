import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { StyleSheet } from "react-native";
import React from "react";

type IconName =
  | "arrow-up-from-bracket"
  | "circle-xmark"
  | "house"
  | "user"
  | "pencil"
  | "rotate-right"
  | "share"
  | "share-from-square";

type Props = {
  name: IconName;
  size?: number;
  type?: "solid" | "light";
  color?: string;
};

const Icon = ({ name, size = 18, type, color }: Props) => {
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
