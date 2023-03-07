import { useMutation, useQueryClient } from "react-query";
import { addTask } from "../api";
import { useStore } from "../store/store";
import { Task } from "../type";

export const useCreateTask = () => {
  const email = useStore((state) => state.email);
  const queryClient = useQueryClient();

  return useMutation(addTask, {
    onMutate: async (newTask) => {
      const prevTasks = queryClient.getQueryData<Task[]>(["tasks", email]);

      if (!prevTasks) return undefined;

      await queryClient.cancelQueries(["tasks", email]);

      queryClient.setQueryData<Task[]>(["tasks", email], (oldTasks) => [
        ...oldTasks!,
        {
          ...newTask,
          task_id: Number.MAX_SAFE_INTEGER,
        },
      ]);

      return prevTasks;
    },
    onError: (err, newTask, prevTasks) => {
      if (!prevTasks) return;

      queryClient.setQueryData(["tasks", email], prevTasks);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", email]);
    },
  });
};
