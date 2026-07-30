import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../lib/firebase/firestore";
import type { Transaction } from "../types/transaction";
import type { TransactionFormData } from "../schemas/transaction.schema";

export const createTransaction = async (
  data: TransactionFormData,
  uid: string,
) => {
  const transactionRef = collection(db, "transactions");

  await addDoc(transactionRef, { ...data, uid, createdAt: serverTimestamp() });
};

export const getTransactions = async (uid: string): Promise<Transaction[]> => {
  const transactionsQuery = query(
    collection(db, "transactions"),
    where("uid", "==", uid),
    orderBy("date", "desc"),
  );

  const snapshot = await getDocs(transactionsQuery);

  return snapshot.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      uid: data.uid,
      type: data.type,
      category: data.category,
      amount: data.amount,
      note: data.note,
      date: data.date.toDate(),
      createdAt: data.createdAt.toDate(),
    };
  });
};
