import { UseQueryResult } from "@tanstack/react-query";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import React from "react";

import Icon from "./Icon";

interface QueryLoaderProps<T> {
  query: UseQueryResult<T>;
  children: (data: T) => React.ReactNode;
}

function QueryLoader<T>({ query, children }: QueryLoaderProps<T>) {
  if (query.isFetching) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  if (query.isError) {
    return (
      <View>
        <Pressable
          onPress={() => {
            query.refetch();
          }}>
          <Icon name="rotate-right" />
        </Pressable>
        <Text>Refresh</Text>
      </View>
    );
  }
  if (!query.isSuccess) {
    return null;
  }

  return <>{children(query.data)}</>;
}
export default QueryLoader;
