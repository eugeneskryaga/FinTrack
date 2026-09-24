import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeTransaction } from "../services/transaction.service";

export const useRemoveTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeTransaction(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });
};
