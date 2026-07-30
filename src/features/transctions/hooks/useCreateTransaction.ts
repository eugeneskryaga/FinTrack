import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../services/transaction.service";
import type { TransactionFormData } from "../schemas/transaction.schema";

export const useCreateTransaction = (uid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TransactionFormData) => createTransaction(data, uid),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["transactions", uid],
      });
    },
  });
};
