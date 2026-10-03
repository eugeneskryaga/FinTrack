import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase/firestore";
import type { Transaction } from "../types/transaction";
import type { TransactionFormData } from "../schemas/transaction.schema";
import { capitalize } from "../../../helpers/helpers";

export const createTransaction = async (
  data: TransactionFormData,
  uid: string,
) => {
  const transactionRef = collection(db, "transactions");

  await addDoc(transactionRef, {
    ...data,
    uid,
    note: capitalize(data.note),
    createdAt: serverTimestamp(),
  });
};

export const removeTransaction = async (id: string) => {
  const transactionRef = doc(db, "transactions", id);

  await deleteDoc(transactionRef);
};

export const editTransaction = async (
  id: string,
  data: TransactionFormData,
) => {
  const transactionRef = doc(db, "transactions", id);

  await updateDoc(transactionRef, data);
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
      date: new Date(data.date),
      createdAt: data.createdAt.toDate(),
    };
  });
};
