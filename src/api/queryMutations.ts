import { useMutation, useQueryClient } from "@tanstack/react-query";
import deletePost, { DeletePostParams } from "./deletePost";
import postImage, { PostImageParams } from "./postImage";

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeletePostParams) => deletePost(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useSubmitPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PostImageParams) => postImage(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
