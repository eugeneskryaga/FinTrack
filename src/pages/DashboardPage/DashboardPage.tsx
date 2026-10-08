import { useState } from "react";
import { TransactionForm } from "../../features/transctions/components/TransactionForm/TransactionForm";
import { Modal } from "../../shared/components/Modal/Modal";
import { HiOutlinePlus } from "react-icons/hi2";

import css from "./Dashboard.module.css";
import { TransactionsList } from "../../features/transctions/components/TransactionsList/TransactionsList";
import type { Transaction } from "../../features/transctions/types/transaction";
import { TransactionControls } from "../../features/transctions/components/TransactionControls/TransactionControls";

export const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const handleCreate = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <section className={css.wrapper}>
      <button
        onClick={handleCreate}
        className={css.addBtn}
      >
        <HiOutlinePlus />
      </button>

      <TransactionControls />

      <TransactionsList onEdit={handleEdit} />

      {isModalOpen && (
        <Modal onClose={handleClose}>
          <TransactionForm
            onClose={handleClose}
            transaction={editingTransaction ?? undefined}
          />
        </Modal>
      )}
    </section>
  );
};
