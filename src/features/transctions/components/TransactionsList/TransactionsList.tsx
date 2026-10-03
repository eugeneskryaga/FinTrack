import { useState } from "react";
import { FaTrash, FaSpinner, FaPen, FaCheck, FaTimes } from "react-icons/fa";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { Notification } from "../../../../shared/components/Notification/Notification";
import { EXPENSE_CATEGORIES } from "../../constants/expense-categories";
import { INCOME_CATEGORIES } from "../../constants/income-categories";
import { useTransactions } from "../../hooks/useTransactions";
import { useRemoveTransaction } from "../../hooks/useRemoveTransaction";
import type { Transaction } from "../../types/transaction";
import css from "./TransactionsList.module.css";

interface Props {
  onEdit: (transaction: Transaction) => void;
}

export const TransactionsList = ({ onEdit }: Props) => {
  const { user } = useAuth();
  const uid = user?.uid || "";

  const { data: transactions } = useTransactions(uid);
  const { mutate, isPending, variables } = useRemoveTransaction();
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const handleEdit = (transaction: Transaction) => {
    onEdit(transaction);
  };
  const handleConfirmDelete = (id: string) => {
    mutate(id);
    setConfirmingId(null);
  };

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
        const isConfirming = confirmingId === transaction.id;
        const isDeleting = isPending && variables === transaction.id;

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
              {!isConfirming && !isDeleting && (
                <FaPen
                  size={12}
                  onClick={() => handleEdit(transaction)}
                />
              )}
              {isConfirming ? (
                <>
                  <FaCheck
                    size={12}
                    onClick={() => handleConfirmDelete(transaction.id)}
                  />
                  <FaTimes
                    size={12}
                    onClick={() => setConfirmingId(null)}
                  />
                </>
              ) : (
                !isDeleting && (
                  <FaTrash
                    size={12}
                    onClick={() => setConfirmingId(transaction.id)}
                  />
                )
              )}
              {isDeleting && (
                <FaSpinner
                  size={12}
                  className={css.spinner}
                />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
