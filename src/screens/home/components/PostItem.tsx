import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Post } from "../../../api/getPosts";
import colors from "../../../theme/colors";
import fontSizes from "../../../theme/fontSizes";
import spacing from "../../../theme/spacing";
import { ShareButton } from "../../../components/Button";

const PostItem = ({ author, imgUrl }: Post) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imgUrl }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.author}>Created by: {author}</Text>
        <ShareButton url={imgUrl} />
      </View>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: spacing.xl,
  },
  image: {
    width: "100%",
    height: 250,
    backgroundColor: colors.base,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.primary_lighter_x,
  },
  detailsContainer: {
    flexDirection: "row",
    marginTop: spacing.m,
    justifyContent: "space-between",
    alignItems: "center",
  },
  author: {
    color: colors.main,
    fontSize: fontSizes.m,
  },
});
