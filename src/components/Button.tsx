import { Pressable, Share, Text, ViewStyle } from "react-native";
import Icon from "./Icon";
import colors from "../theme/colors";
import spacing from "../theme/spacing";
import fontSizes from "../theme/fontSizes";

interface ShareButtonProps {
  message?: string;
  url: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ url, message }) => {
  return (
    <Pressable
      onPress={() => {
        Share.share({ message, url });
      }}>
      <Icon name="share-from-square" color={colors.main_lighter_x} />
    </Pressable>
  );
};

interface CloseButtonProps {
  onPress: () => void;
  color?: string;
  style?: ViewStyle;
  solid?: boolean;
  size?: number;
}

export const CloseButton: React.FC<CloseButtonProps> = ({
  onPress,
  color,
  style,
  solid,
  size = 18,
}) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <Icon
        name="circle-xmark"
        color={color}
        type={solid ? "solid" : "light"}
        size={size}
      />
    </Pressable>
  );
};

interface ButtonProps {
  style?: ViewStyle;
  text?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  style,
  text,
  variant = "primary",
  disabled,
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) => ({
        borderWidth: 1,
        borderColor: colors.primary_lighter_x,
        padding: spacing.l,
        borderRadius: 100,
        backgroundColor: pressed
          ? "#E1E4F2"
          : variant === "primary"
          ? colors.primary_lighter_x
          : undefined,
        opacity: disabled ? 0.4 : 1,
        ...style,
      })}
      disabled={disabled}
      onPress={onPress}>
      <Text style={{ textAlign: "center", fontSize: fontSizes.m }}>{text}</Text>
    </Pressable>
  );
};
