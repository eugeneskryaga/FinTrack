import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { LuTrendingUp, LuTrendingDown } from "react-icons/lu";

import css from "./TransactionForm.module.css";

import type { TransactionFormData } from "../../schemas/transaction.schema";
import { EXPENSE_CATEGORIES } from "../../constants/expense-categories";
import { INCOME_CATEGORIES } from "../../constants/income-categories";

export const TransactionForm = () => {
  const { register, control, handleSubmit, resetField } =
    useForm<TransactionFormData>({
      defaultValues: {
        type: "expense",
        date: new Date().toISOString().split("T")[0],
      },
    });

  const type = useWatch({
    control,
    name: "type",
  });

  const selectedCategory = useWatch({
    control,
    name: "category",
  });

  useEffect(() => {
    resetField("category");
  }, [type, resetField]);

  const categories = useMemo(
    () => (type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES),
    [type],
  );

  const onSubmit = (data: TransactionFormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={css.form}
    >
      <div
        className={`${css.header_container} ${
          type === "income" ? css.income : css.expense
        }`}
      >
        <div className={css.title_container}>
          <p>New transaction</p>
          {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
        </div>

        <div className={css.type_container}>
          <label className={type === "income" ? css.activeIncome : ""}>
            <input
              type="radio"
              value="income"
              {...register("type")}
            />
            Income
          </label>

          <label className={type === "expense" ? css.activeExpense : ""}>
            <input
              type="radio"
              value="expense"
              {...register("type")}
            />
            Expense
          </label>
        </div>
      </div>

      <div className={css.wrapper}>
        <div className={css.date_wrapper}>
          <label>
            Date
            <input
              type="date"
              {...register("date")}
            />
          </label>

          <label>
            Amount
            <input
              type="number"
              step="0.01"
              {...register("amount", {
                valueAsNumber: true,
              })}
            />
          </label>
        </div>

        <label className={css.note}>
          Note
          <input
            type="text"
            placeholder="Add a note..."
            {...register("note")}
          />
        </label>

        <div className={css.categories_list}>
          {categories.map(({ value, label, icon: Icon }) => (
            <label
              key={value}
              className={`
                ${css.categories_item}
                ${type === "income" ? css.categoryIncome : css.categoryExpense}
                ${selectedCategory === value ? css.categoryActive : ""}
              `}
            >
              <input
                type="radio"
                value={value}
                {...register("category")}
              />

              <Icon />

              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className={`
          ${css.submitBtn}
          ${type === "income" ? css.submitIncome : css.submitExpense}
        `}
      >
        Submit
      </button>
    </form>
  );
};
