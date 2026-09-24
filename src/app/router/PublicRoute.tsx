import { Navigate } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";
import type { ReactNode } from "react";
import { Notification } from "../../shared/components/Notification/Notification";

interface Props {
  children: ReactNode;
}

export const PublicRoute = ({ children }: Props) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Notification
        message="Loading ..."
        isLoader={true}
      />
    );
  }

  if (user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
};
