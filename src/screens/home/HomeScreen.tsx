import React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import getPosts from "../../api/getPosts";
import QueryLoader from "../../components/QueryLoader";
import spacing from "../../theme/spacing";
import PostItem from "./components/PostItem";
import colors from "../../theme/colors";
import EmptyListComponent from "../../components/EmptyListComponent";

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
            backgroundColor: colors.primary_light,
            flex: 1,
          }}
          refreshControl={
            <RefreshControl
              refreshing={postsQuery.isRefetching}
              onRefresh={postsQuery.refetch}
            />
          }
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <PostItem
              id={item.id}
              username={item.username}
              image={item.image}
            />
          )}
          ListEmptyComponent={
            <EmptyListComponent text="There's nothing in your feed right now" />
          }
        />
      )}
    </QueryLoader>
  );
};

export default HomeScreen;
