import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),

  date: z.string(),

  amount: z
    .number({
      message: "Amount is required",
    })
    .positive("Amount must be greater than zero"),

  note: z.string().min(2, "Note must contain at least 2 characters"),

  category: z.string({
    message: "Choose category",
  }),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
