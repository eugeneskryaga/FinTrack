import { useAuth } from "../../../../shared/hooks/useAuth";
import { EXPENSE_CATEGORIES } from "../../constants/expense-categories";
import { INCOME_CATEGORIES } from "../../constants/income-categories";
import { useTransactions } from "../../hooks/useTransactions";
import { FaTrash } from "react-icons/fa";

import css from "./TransactionsList.module.css";

export const TransactionsList = () => {
  const { user } = useAuth();
  const uid = user?.uid || "";

  const { data: transactions, isLoading } = useTransactions(uid);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!transactions || transactions.length === 0) {
    return <p>There is no transactions</p>;
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
              <div>
                <p>{category?.label}</p>
                <p className={css.note}>{transaction.note}</p>
              </div>
            </div>
            <div className={css.amount}>
              <p
                className={transaction.type === "expense" ? css.red : css.green}
              >
                {transaction.type === "expense" ? "- " : "+ "}
                {transaction.amount}
              </p>
              <FaTrash size={12} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};
