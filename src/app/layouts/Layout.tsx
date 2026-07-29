import { Outlet } from "react-router-dom";
import { Navbar } from "../../widgets/Navbar/Navbar";

import css from "./Layout.module.css";
import { Logo } from "../../shared/components/Logo/Logo";

export const Layout = () => {
  return (
    <>
      <header className={css.header}>
        <Logo />
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
