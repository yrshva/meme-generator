import config from "./config";

export interface PostImage {
  uri: string;
  type: string;
  name: string;
}

export interface PostImageParams {
  user: string;
  image: PostImage;
}

const postImage = ({ user, image }: PostImageParams) => {
  const { uri, type, name } = image;
  const formData = new FormData();

  formData.append("image", {
    uri,
    type,
    name,
  });
  formData.append("username", user);

  return fetch(`${config.API_URL}/posts`, {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default postImage;
