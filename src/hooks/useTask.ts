import { useQuery } from "react-query";
import { getTaskById } from "../api";
import { useStore } from "../store/store";

export const useTask = (id: number) => {
  const email = useStore((state) => state.email);
  return useQuery(["tasks", id, email], () => getTaskById(id));
};
