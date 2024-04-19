import config from "./config";

export interface Post {
  id: number;
  author: string;
  imgUrl: string;
}

const getPosts = async () => {
  const response = fetch(`${config.API_URL}/posts`, { method: "GET" }).then(
    response => response.json(),
  );

  return (await response) as Promise<Array<Post>>;
};

export default getPosts;
