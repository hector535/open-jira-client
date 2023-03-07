import { useMutation, useQueryClient } from "react-query";
import { updateTask } from "../api";
import { useStore } from "../store/store";
import { Task } from "../type";

export const useUpdateTask = () => {
  const email = useStore((state) => state.email);
  const queryClient = useQueryClient();

  return useMutation(updateTask, {
    onMutate: async (taskToUpdate) => {
      const prevTasks = queryClient.getQueryData<Task[]>(["tasks", email]);

      if (!prevTasks) return undefined;

      await queryClient.cancelQueries(["tasks", email]);

      queryClient.setQueryData<Task[]>(["tasks", email], (oldTasks) =>
        oldTasks!.map((t) => {
          if (t.task_id === taskToUpdate.task_id) {
            return { ...taskToUpdate };
          }

          return t;
        })
      );

      return prevTasks;
    },
    onError: (err, taskToUpdate, prevTasks) => {
      if (!prevTasks) return;

      queryClient.setQueryData(["tasks", email], prevTasks);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", email]);
    },
  });
};
