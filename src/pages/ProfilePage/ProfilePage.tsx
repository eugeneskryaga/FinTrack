import { useAuth } from "../../shared/hooks/useAuth";

export const ProfilePage = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};
