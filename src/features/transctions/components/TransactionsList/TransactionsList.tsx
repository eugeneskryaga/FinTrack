import { useAuth } from "../../../../shared/hooks/useAuth";
import { EXPENSE_CATEGORIES } from "../../constants/expense-categories";
import { INCOME_CATEGORIES } from "../../constants/income-categories";
import { useTransactions } from "../../hooks/useTransactions";
import { FaTrash, FaSpinner } from "react-icons/fa";

import css from "./TransactionsList.module.css";
import { useRemoveTransaction } from "../../hooks/useRemoveTransaction";
import { Notification } from "../../../../shared/components/Notification/Notification";

export const TransactionsList = () => {
  const { user } = useAuth();
  const uid = user?.uid || "";

  const { data: transactions } = useTransactions(uid);
  const { mutate, isPending: isDeleting, variables } = useRemoveTransaction();

  if (!transactions || transactions.length === 0) {
    return <Notification message="There is no transactions yet" />;
  }

  return (
    <ul className={css.list}>
      {transactions.map(transaction => {
        const categories =
          transaction.type === "income"
            ? INCOME_CATEGORIES
            : EXPENSE_CATEGORIES;

        const category = categories.find(
          category => category.value === transaction.category,
        );
        const Icon = category?.icon;

        const date = transaction.date.toDateString();

        return (
          <li
            key={transaction.id}
            className={css.item}
          >
            <p className={css.date}>{date}</p>
            <div className={css.icon}>
              {Icon && (
                <Icon
                  size={30}
                  className={
                    transaction.type === "expense" ? css.red : css.green
                  }
                />
              )}
              <div className={css.category}>
                <p>{category?.label}</p>
                <p className={css.note}>{transaction.note}</p>
              </div>
            </div>
            <div className={css.amount}>
              <p
                className={transaction.type === "expense" ? css.red : css.green}
              >
                {transaction.type === "expense" ? "-" : "+"}
                {transaction.amount}
              </p>
              {isDeleting && variables === transaction.id ? (
                <FaSpinner
                  size={12}
                  className={css.spinner}
                />
              ) : (
                <FaTrash
                  size={12}
                  onClick={() => mutate(transaction.id)}
                />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
