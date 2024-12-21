import { useMutation } from "react-query";
import { login } from "utils/services/login";

export const useLoginMutations = () => {
  const loginMutation = useMutation(
    (variables: { email: string; password: string }) =>
      login(variables.email, variables.password),
    {
      onSuccess: () => {
        // Invalidate and refetch
      },
      onError: () => {
        throw Error("Error");
      },
    }
  );

  return { login: loginMutation };
};
