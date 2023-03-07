import { useMutation } from "react-query";
import { authMode } from "../api";

export const useAuth = () => useMutation(authMode);
