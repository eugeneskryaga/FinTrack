import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  category: z.string().min(1, "Choose category"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  note: z.string().max(100, "Maximum 100 characters").optional(),
  date: z.string(),
});

export type TransactionFormInput = z.input<typeof transactionSchema>;
export type TransactionFormData = z.output<typeof transactionSchema>;
