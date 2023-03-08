import axios, { AxiosError } from "axios";
import { Task } from "../type/index.js";

const axiosInstance = axios.create({
  baseURL: "https://open-jira-i5to.onrender.com/api",
  withCredentials: true,
});

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  const data = error.response?.data;

  if (data) {
    const { name } = data as { name: string };

    if (
      name &&
      (name === "JsonWebTokenError" || name === "MissingTokenError")
    ) {
      localStorage.clear();
      window.location.href = "/";
    }
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(null, onResponseError);

export const getTaskById = (id: number): Promise<Task> =>
  axiosInstance.get(`/tasks/${id}`).then((res) => res.data);

export const getTasks = (): Promise<Task[]> =>
  axiosInstance.get("/tasks").then((res) => res.data);

export const updateTask = (task: Task): Promise<void> =>
  axiosInstance.put(`/tasks/${task.task_id}`, task).then((res) => res.data);

export const addTask = (task: Task): Promise<void> =>
  axiosInstance.post("/tasks", task).then((res) => res.data);

export const deleteTaskById = (id: number): Promise<void> =>
  axiosInstance.delete(`/tasks/${id}`);

type AuthModeParams = {
  email: string;
  password: string;
  mode: "signin" | "signup";
};

export const authMode = ({
  email,
  password,
  mode,
}: AuthModeParams): Promise<{ email: string }> =>
  axiosInstance.post(`/auth/${mode}`, { email, password });

export const logout = (): Promise<undefined> =>
  axiosInstance.post(`/auth/signout`);
