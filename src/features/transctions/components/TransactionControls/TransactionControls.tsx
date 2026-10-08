import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { EXPENSE_CATEGORIES } from "../../constants/expense-categories";
import { INCOME_CATEGORIES } from "../../constants/income-categories";
import css from "./TransactionControls.module.css";

export const TransactionControls = () => {
  const categories = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

  return (
    <div className={css.wrapper}>
      <div className={css.controls_container}>
        <div className={css.container}>
          <select
            name="type"
            className={css.select}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <select
            name="category"
            className={css.select}
          >
            {categories.map(category => {
              if (category.value === "income_gifts") {
                return;
              }
              return (
                <option
                  value={category.value}
                  key={category.value}
                >
                  {category.label}
                </option>
              );
            })}
          </select>
          <button className={css.btn}>
            <FaArrowUp size={14} />
          </button>
        </div>
        <div className={css.container}>
          <input
            type="date"
            className={css.date}
          />
          <input
            type="date"
            className={css.date}
          />
          <button className={css.btn}>
            <FaArrowDown size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
