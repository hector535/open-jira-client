import { useMutation } from "react-query";
import { authMode } from "../api";
import { useStore } from "../store/store";

export const useAuth = () => {
  const login = useStore((state) => state.login);

  return useMutation(authMode, {
    onSuccess: (data, variables, context) => {
      const { email } = variables;
      login(email);
    },
  });
};
