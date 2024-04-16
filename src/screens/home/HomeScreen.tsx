import React from "react";
import { FlatList, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import getPosts from "../../api/getPosts";
import QueryLoader from "../../components/QueryLoader";
import spacing from "../../theme/spacing";
import PostItem from "./components/PostItem";
import colors from "../../theme/colors";

const HomeScreen = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getPosts(),
    staleTime: 5 * 1000 * 60,
  });
  return (
    <QueryLoader query={postsQuery}>
      {posts => (
        <FlatList
          data={posts}
          style={{
            padding: spacing.l,
            backgroundColor: colors.secondary_light,
            flex: 1,
          }}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <PostItem id={item.id} author={item.author} imgUrl={item.imgUrl} />
          )}
        />
      )}
    </QueryLoader>
  );
};

export default HomeScreen;
