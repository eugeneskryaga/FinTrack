import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { DashboardPage } from "../../pages/DashboardPage/DashboardPage";
import { PublicRoute } from "./PublicRoute";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage";
import { Layout } from "../layouts/Layout";
import { ProfilePage } from "../../pages/ProfilePage/ProfilePage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/statistics",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/savings",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
