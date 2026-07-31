import { useState } from "react";
import { TransactionForm } from "../../features/transctions/components/TransactionForm/TransactionForm";
import { Modal } from "../../shared/components/Modal/Modal";
import { HiOutlinePlus } from "react-icons/hi2";

import css from "./Dashboard.module.css";

export const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      {isModalOpen && (
        <Modal onClose={handleModal}>
          <TransactionForm />
        </Modal>
      )}
    </section>
  );
};
