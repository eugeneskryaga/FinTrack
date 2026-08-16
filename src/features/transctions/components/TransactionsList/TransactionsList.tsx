import { useAuth } from "../../../../shared/hooks/useAuth";
import { EXPENSE_CATEGORIES } from "../../constants/expense-categories";
import { INCOME_CATEGORIES } from "../../constants/income-categories";
import { useTransactions } from "../../hooks/useTransactions";

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
    <ul>
      {transactions.map(transaction => {
        const categories =
          transaction.type === "income"
            ? INCOME_CATEGORIES
            : EXPENSE_CATEGORIES;

        const category = categories.find(
          category => category.value === transaction.category,
        );
        const Icon = category?.icon;

        return (
          <li key={transaction.id}>
            {Icon && <Icon size={24} />}
            <p>{category?.label}</p>
            <p>{transaction.amount}</p>
          </li>
        );
      })}
    </ul>
  );
};
