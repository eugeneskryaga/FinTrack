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
      <div className={css.wrapper}>
        <main className={css.main}>
          <Outlet />
        </main>
        <aside className={css.aside}>
          <Navbar />
        </aside>
      </div>
    </>
  );
};
