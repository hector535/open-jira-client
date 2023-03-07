import { useQuery } from "react-query";
import { getTasks } from "../api/index";
import { useStore } from "../store/store";

export const useTasks = () => {
  const email = useStore((state) => state.email);
  return useQuery(["tasks", email], getTasks, { staleTime: 1000 * 60 * 5 });
};
