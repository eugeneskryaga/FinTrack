import { Navigate } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PublicRoute = ({ children }: Props) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <>{children}</>;
};
