import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineChartBar,
  HiOutlineUser,
} from "react-icons/hi2";
import { LuPiggyBank } from "react-icons/lu";
import css from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav>
      <ul className={css.nav_list}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${css.active_link} ${css.link}` : css.link
          }
        >
          <HiOutlineHome />
          Home
        </NavLink>
        <NavLink
          to="statistics"
          className={({ isActive }) =>
            isActive ? `${css.active_link} ${css.link}` : css.link
          }
        >
          <HiOutlineChartBar />
          Statistics
        </NavLink>
        <NavLink
          to="savings"
          className={({ isActive }) =>
            isActive ? `${css.active_link} ${css.link}` : css.link
          }
        >
          <LuPiggyBank />
          Savings
        </NavLink>
        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive ? `${css.active_link} ${css.link}` : css.link
          }
        >
          <HiOutlineUser />
          Profile
        </NavLink>
      </ul>
    </nav>
  );
};
