import { useMutation, useQueryClient } from "react-query";
import { deleteTaskById } from "../api";
import { useStore } from "../store/store";
import { Task } from "../type";

export const useDeleteTask = () => {
  const email = useStore((state) => state.email);
  const queryClient = useQueryClient();

  return useMutation(deleteTaskById, {
    onMutate: async (taskIdToDelete) => {
      const prevTasks = queryClient.getQueryData<Task[]>(["tasks", email]);

      if (!prevTasks) return undefined;

      await queryClient.cancelQueries(["tasks", email]);

      queryClient.setQueryData<Task[]>(["tasks", email], (oldTasks) =>
        oldTasks!.filter((t) => t.task_id !== taskIdToDelete)
      );

      return prevTasks;
    },
    onError: (error, taskIdToDelete, prevTasks) => {
      if (!prevTasks) return;

      queryClient.setQueryData(["tasks", email], prevTasks);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", email]);
    },
  });
};
