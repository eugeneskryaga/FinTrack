import { Outlet } from "react-router-dom";
import { Navbar } from "../../widgets/Navbar/Navbar";

export const Layout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <footer>
        <Navbar />
      </footer>
    </>
  );
};
