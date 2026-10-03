import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuTrendingUp, LuTrendingDown } from "react-icons/lu";

import css from "./TransactionForm.module.css";

import type { TransactionFormData } from "../../schemas/transaction.schema";
import { transactionSchema } from "../../schemas/transaction.schema";

import { EXPENSE_CATEGORIES } from "../../constants/expense-categories";
import { INCOME_CATEGORIES } from "../../constants/income-categories";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { useCreateTransaction } from "../../hooks/useCreateTransaction";
import { useEditTransaction } from "../../hooks/useEditTransaction";
import type { Transaction } from "../../types/transaction";
import { formatDateForInput } from "../../../../helpers/helpers";

interface Props {
  onClose: () => void;
  transaction?: Transaction | null;
}

export const TransactionForm = ({ onClose, transaction }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),

    defaultValues: {
      type: transaction?.type ?? "expense",
      date: transaction
        ? formatDateForInput(transaction.date)
        : formatDateForInput(new Date()),
      amount: transaction?.amount ?? undefined,
      note: transaction?.note ?? "",
      category: transaction?.category ?? "",
    },
  });

  const { user } = useAuth();

  const { mutate: create, isPending: isCreating } = useCreateTransaction(
    user!.uid,
  );

  const { mutate: edit, isPending: isEditing } = useEditTransaction(user!.uid);

  const isPending = isCreating || isEditing;

  const type = useWatch({
    control,
    name: "type",
  });

  const selectedCategory = useWatch({
    control,
    name: "category",
  });

  const categories = useMemo(
    () => (type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES),
    [type],
  );

  const handleTypeChange = (newType: "income" | "expense") => {
    setValue("type", newType);

    setValue("category", "", {
      shouldDirty: true,
    });
  };

  const onSubmit = (data: TransactionFormData) => {
    if (transaction) {
      edit(
        {
          id: transaction.id,
          data,
        },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    } else {
      create(data, {
        onSuccess: () => {
          onClose();
        },
      });
    }
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
          <p>{transaction ? "Edit transaction" : "New transaction"}</p>

          {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
        </div>

        <div className={css.type_container}>
          <label className={type === "income" ? css.activeIncome : ""}>
            <input
              type="radio"
              value="income"
              checked={type === "income"}
              onChange={() => handleTypeChange("income")}
            />
            Income
          </label>

          <label className={type === "expense" ? css.activeExpense : ""}>
            <input
              type="radio"
              value="expense"
              checked={type === "expense"}
              onChange={() => handleTypeChange("expense")}
            />
            Expense
          </label>
        </div>
      </div>

      <div className={css.wrapper}>
        <div className={css.inputs_grid}>
          <label
            className={`
              ${css.input_card}
              ${errors.date ? css.errorField : ""}
            `}
          >
            <span>Date</span>

            <input
              type="date"
              max={formatDateForInput(new Date())}
              {...register("date")}
            />

            {errors.date && <p className={css.error}>{errors.date.message}</p>}
          </label>

          <label
            className={`
              ${css.input_card}
              ${errors.amount ? css.errorField : ""}
            `}
          >
            <span>Amount</span>

            <div className={css.amount_input}>
              <span>₴</span>

              <input
                type="number"
                placeholder="0"
                {...register("amount", {
                  valueAsNumber: true,
                })}
              />
            </div>

            {errors.amount && (
              <p className={css.error}>{errors.amount.message}</p>
            )}
          </label>
        </div>

        <label
          className={`
            ${css.input_card}
            ${css.note_card}
            ${errors.note ? css.errorField : ""}
          `}
        >
          <span>Note</span>

          <input
            type="text"
            maxLength={25}
            placeholder="What was it for?"
            {...register("note")}
          />

          {errors.note && <p className={css.error}>{errors.note.message}</p>}
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

        {errors.category && (
          <p className={css.errorCenter}>{errors.category.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={`
          ${css.submitBtn}
          ${type === "income" ? css.submitIncome : css.submitExpense}
        `}
      >
        {isPending ? "Saving" : "Submit"}
      </button>
    </form>
  );
};
