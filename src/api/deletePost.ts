import config from "./config";

export interface DeletePostParams {
  postId: number;
}

const deletePost = async ({ postId }: DeletePostParams) =>
  fetch(`${config.API_URL}/posts/${postId}`, { method: "DELETE" }).then(
    response => response.json(),
  );

export default deletePost;
