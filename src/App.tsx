import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./layout";
import { HomePage, AuthPage, TaskPage } from "./pages";
import { useStore } from "./store/store";

const mainRoutes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/task/:id",
        element: <TaskPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];

const authRoutes = [
  {
    path: "/auth/signin",
    element: <AuthPage mode="signin" />,
  },
  {
    path: "/auth/signup",
    element: <AuthPage mode="signup" />,
  },
  {
    path: "*",
    element: <Navigate to="/auth/signin" />,
  },
];

export const App = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  const router = createBrowserRouter(isLoggedIn ? mainRoutes : authRoutes);

  return <RouterProvider router={router} />;
};
