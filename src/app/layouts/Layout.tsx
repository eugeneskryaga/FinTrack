import { Outlet } from "react-router-dom";
import { Navbar } from "../../widgets/Navbar/Navbar";

import css from "./Layout.module.css";
import { Logo } from "../../shared/components/Logo/Logo";
import { useAuth } from "../../shared/hooks/useAuth";

export const Layout = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <header className={css.header}>
        <Logo />
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main className={css.main}>
        <Outlet />
      </main>
      <footer className={css.footer}>
        <Navbar />
      </footer>
    </>
  );
};
