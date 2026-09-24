import { FaSpinner } from "react-icons/fa";
import css from "./Notification.module.css";

interface Props {
  message: string;
  isLoader?: boolean;
}

export const Notification = ({ message, isLoader = false }: Props) => {
  return (
    <div className={css.notification}>
      {isLoader && (
        <FaSpinner
          size={30}
          className={css.spinner}
        />
      )}
      <p>{message}</p>
    </div>
  );
};
