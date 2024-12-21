import { redirect } from "@remix-run/react";
import { useMutation } from "react-query";
import { login } from "utils/services/login";

export const useLoginMutations = () => {
  console.log("useLoginMutations");
  const loginMutation = useMutation(
    (variables: { email: string; password: string }) =>
      login(variables.email, variables.password),
    {
      onSuccess: () => {
        // Invalidate and refetch
      },
    }
  );

  return { login: loginMutation };
};
