export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  uid: string;
  type: TransactionType;
  category: string;
  amount: number;
  note: string;
  date: Date;
  createdAt: Date;
}
