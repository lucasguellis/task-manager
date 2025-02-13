import React, { useState } from 'react';
import styles from './styles.ts';
import { DetailsModal } from '../DetailsModal';
import { Task } from '../../types/Task.ts';
import { dateFormatter } from '../../utils/dateFormatter.ts';

export const Card: React.FC<Task> = (card) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={styles.card} onClick={openModal}>
        <span>
          <div className={styles.cardTitle}>
            <span>{card.name}</span>
          </div>
        </span>
        <div className={styles.cardDescription}>{card.description}</div>
        <div className={styles.cardDetails}>
          Vencimento: {dateFormatter(card.dueDate)}
        </div>
      </div>

      <DetailsModal isOpen={isModalOpen} onClose={closeModal} card={card} />
    </>
  );
};
