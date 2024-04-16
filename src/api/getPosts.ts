import { Platform } from "react-native";
import config from "./config";

export interface Post {
  id: number;
  author: string;
  imgUrl: string;
}

const getPosts = async () => {
  const url =
    Platform.OS === "android" ? config.ANDROID_API_URL : config.IOS_API_URL;

  const response = fetch(`${url}/posts`, { method: "GET" }).then(response =>
    response.json(),
  );

  return (await response) as Promise<Array<Post>>;
};

export default getPosts;
