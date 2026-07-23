import { useAuth } from "../../shared/hooks/useAuth";

export const DashboardPage = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <h1>Dashboard Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};
