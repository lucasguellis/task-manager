import React, { useState } from 'react';
import CardStyles from '../Card/styles.ts';
import ModalStyles from './styles.ts';
import ButtonStyles from '../Button/styles.ts';
import Button from '../Button';
import { GenericModal } from '../GenericModal';
import InputField from '../Form/InputField';
import { Task } from '../../types/Task.ts';
import SelectField from '../Form/SelectField';
import { getStatusLabel, Status, statusOptions } from '../../types/Status.ts';
import apis from '../../../api';
import { useSearchParams } from 'react-router-dom';
import { dateFormatter } from '../../utils/dateFormatter.ts';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: Task;
}

export const DetailsModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  card,
}) => {
  const [modalMode, setModalMode] = useState<'edit' | 'details' | 'delete'>(
    'details',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Editar');
  const [title, setTitle] = useState(card.name);
  const [description, setDescription] = useState(card.description);
  const [status, setStatus] = useState(card.status as Status);
  const [dueDate, setDueDate] = useState(card.dueDate);
  const [_, setUseParams] = useSearchParams();

  const handleClose = () => {
    setModalMode('details');
    setIsLoading(false);
    setButtonLabel('Editar');
    setTitle(card.name);
    setDescription(card.description);
    setStatus(card.status as Status);
    setDueDate(card.dueDate);
    onClose();
  };

  async function handleSubmitButtonClick() {
    if (modalMode === 'edit' && card._id) {
      setButtonLabel('Salvando');
      setIsLoading(true);
      try {
        await apis.updateTask(card._id, {
          ...card,
          name: title,
          description,
          status,
          dueDate,
        });

        setModalMode('details');
        setButtonLabel('Editar');
      } catch (error) {
        setUseParams({ message: 'error' });
      } finally {
        setIsLoading(false);
        setUseParams({ message: 'task-edited' });
        window.location.reload();
      }
    } else if (modalMode === 'delete' && card._id) {
      setButtonLabel('Excluindo');
      setIsLoading(true);
      try {
        await apis.deleteTask(card._id);
        setModalMode('details');
        setButtonLabel('Editar');
      } catch (error) {
        setUseParams({ message: 'error' });
      } finally {
        setIsLoading(false);
        setUseParams({ message: 'task-deleted' });
        window.location.reload();
      }
    } else {
      setModalMode('edit');
      setButtonLabel('Salvar');
    }
  }

  async function handleDeleteButtonClick() {
    setModalMode('delete');
    setButtonLabel('Excluir');
  }

  const content = (
    <>
      {modalMode === 'details' ? (
        <>
          <span>
            <div
              className={
                CardStyles.cardTitle + ' flex flex-row justify-between'
              }
            >
              <span>{card.name}</span>
              <Button
                label={
                  <img
                    src="/trash.svg"
                    alt="delete"
                    className="size-5 cursor-pointer"
                  />
                }
                onClick={handleDeleteButtonClick}
                type={'button'}
                className={ButtonStyles.transparent}
                isLoading={isLoading}
              />
            </div>
          </span>
          <div className={CardStyles.cardDescription}>{card.description}</div>
          <div className={CardStyles.cardDetails}>
            Status: {getStatusLabel(card.status as Status)}
          </div>
          <div className={CardStyles.cardDetails}>
            Vencimento: {dateFormatter(card.dueDate)}
          </div>
        </>
      ) : modalMode === 'edit' ? (
        <>
          <div className={ModalStyles.cardTitle}>
            <InputField
              label="Título"
              type="text"
              value={title || ''}
              required={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <InputField
            label="Descrição"
            type="textarea"
            value={description || ''}
            required={true}
            onChange={(e) => setDescription(e.target.value)}
          />
          <SelectField
            label="Status"
            value={status || ''}
            options={statusOptions}
            required={true}
            onChange={(e) => setStatus(e.target.value as Status)}
          />
          <InputField
            label="Vencimento"
            type="date"
            value={new Date(dueDate).toISOString().split('T')[0]}
            required={true}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </>
      ) : (
        <>Tem certeza que deseja excluir esta tarefa?</>
      )}
    </>
  );

  const footer = (
    <>
      <Button
        label={buttonLabel}
        onClick={handleSubmitButtonClick}
        type={'button'}
        className={
          buttonLabel === 'Excluir' ? ButtonStyles.danger : ButtonStyles.primary
        }
        isLoading={isLoading}
      />
      <Button
        label={'Fechar'}
        onClick={handleClose}
        type={'button'}
        className={ModalStyles.closeButton + ButtonStyles.secondary}
      />
    </>
  );
  return (
    <GenericModal
      isOpen={isOpen}
      onClose={handleClose}
      content={content}
      footer={footer}
    />
  );
};
