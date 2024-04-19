import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
  SuccessToast,
  ToastConfig,
} from "react-native-toast-message";
import spacing from "../theme/spacing";
import fontSizes from "../theme/fontSizes";
import colors from "../theme/colors";

const toastConfig: ToastConfig = {
  success: props => (
    <SuccessToast
      {...props}
      text1Style={{
        fontSize: fontSizes.m,
        fontWeight: "600",
        color: colors.main_lighter,
      }}
      contentContainerStyle={{
        backgroundColor: colors.notification.success,
      }}
      text2Style={{
        fontSize: fontSizes.m,
        color: colors.main_lighter,
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      contentContainerStyle={{
        backgroundColor: colors.notification.error,
      }}
      text1Style={{
        fontSize: fontSizes.m,
        fontWeight: "600",
        color: colors.main_lighter,
      }}
      text2Style={{
        fontSize: fontSizes.m,
        color: colors.main_lighter,
      }}
    />
  ),
  info: props => (
    <InfoToast
      {...props}
      text1Style={{
        fontSize: fontSizes.m,
        fontWeight: "600",
        color: colors.main_lighter,
      }}
      contentContainerStyle={{
        backgroundColor: colors.notification.info,
      }}
      text2Style={{
        fontSize: fontSizes.m,
        color: colors.main_lighter,
      }}
    />
  ),
};

const ToastNotification = () => {
  const insets = useSafeAreaInsets();
  return <Toast topOffset={insets.top + spacing.m} config={toastConfig} />;
};

export default ToastNotification;
