import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../services/transaction.service";

export const useTransactions = (uid: string) => {
  return useQuery({
    queryKey: ["transactions", uid],
    queryFn: () => getTransactions(uid),
    enabled: Boolean(uid),
  });
};
