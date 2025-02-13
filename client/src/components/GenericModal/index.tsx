import React from 'react';
import styles from './styles.ts';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
  footer: React.ReactNode;
}

export const GenericModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  content,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBg} onClick={onClose}>
      <div className={styles.modalSizer}>
        <div className={styles.modalPosition}>
          <div
            className={styles.modalContainer}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={styles.modalBorder}>{content}</div>
            {footer && <div className={styles.modalFooter}>{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
