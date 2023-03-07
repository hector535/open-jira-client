import { useMutation } from "react-query";
import { logout } from "../api";

export const useLogout = () => useMutation(logout);
