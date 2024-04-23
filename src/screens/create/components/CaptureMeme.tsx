import { StyleSheet } from "react-native";
import ViewShot from "react-native-view-shot";
import Toast from "react-native-toast-message";
import React, { RefObject, useCallback } from "react";

import { useSubmitPostMutation } from "../../../api/queryMutations";
import spacing from "../../../theme/spacing";

type Props = {
  captureRef: RefObject<ViewShot>;
  children: React.ReactNode;
};

const CaptureMeme = ({ captureRef, children }: Props) => {
  const submitPostMutation = useSubmitPostMutation();
  const user = "crazyfrog";

  const onCapture = useCallback((uri: string) => {
    submitPostMutation
      .mutateAsync({
        user,
        image: {
          uri: uri,
          type: "image/jpeg",
          name: `${user}-${Date.now()}`,
        },
      })
      .then(() => {
        Toast.show({
          type: "success",
          text2: "Succesfully published",
        });
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text2: "There was an error publishing your post",
        });
      });
  }, []);

  return (
    <ViewShot onCapture={onCapture} style={styles.container} ref={captureRef}>
      {children}
    </ViewShot>
  );
};

export default CaptureMeme;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: spacing.l,
  },
});
