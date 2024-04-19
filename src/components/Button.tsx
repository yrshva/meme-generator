import { Pressable, Share, Text, ViewStyle } from "react-native";
import Icon from "./Icon";
import colors from "../theme/colors";
import spacing from "../theme/spacing";

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

interface ButtonProps {
  styles?: ViewStyle;
  text?: string;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({ styles, text, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => ({
        borderWidth: 1,
        borderColor: colors.primary_light,
        padding: spacing.l,
        borderRadius: 100,
        backgroundColor: pressed ? "#E1E4F2" : undefined,
        ...styles,
      })}
      onPress={onPress}>
      <Text>{text}</Text>
    </Pressable>
  );
};
