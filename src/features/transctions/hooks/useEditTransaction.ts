import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTransaction } from "../services/transaction.service";
import type { TransactionFormData } from "../schemas/transaction.schema";

export const useEditTransaction = (uid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TransactionFormData }) =>
      editTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions", uid],
      });
    },
  });
};
