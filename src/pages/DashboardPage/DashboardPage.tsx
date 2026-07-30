import { useState } from "react";
import { TransactionForm } from "../../features/transctions/components/TransactionForm/TransactionForm";
import { Modal } from "../../shared/components/Modal/Modal";
import { useAuth } from "../../shared/hooks/useAuth";
import { HiOutlinePlus } from "react-icons/hi2";

import css from "./Dashboard.module.css";

export const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const handleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <section className={css.wrapper}>
      <button
        onClick={handleModal}
        className={css.addBtn}
      >
        <HiOutlinePlus />
      </button>
      {user?.uid && isModalOpen && (
        <Modal onClose={handleModal}>
          <TransactionForm uid={user?.uid} />
        </Modal>
      )}
    </section>
  );
};
