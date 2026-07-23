import { FaWallet } from "react-icons/fa";
import css from "./Logo.module.css";

export const Logo = () => {
  return (
    <div className={css.logo}>
      <FaWallet className={css.icon} />
      <strong>Finance tracker</strong>
    </div>
  );
};
