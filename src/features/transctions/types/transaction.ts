import type { TransactionType } from "./transaction-type";

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
