import { Pressable, Share } from "react-native";
import Icon from "./Icon";
import colors from "../theme/colors";

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
