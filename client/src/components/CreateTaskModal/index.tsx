import React, { useState } from 'react';
import ModalStyles from './styles.ts';
import ButtonStyles from '../Button/styles.ts';
import Button from '../Button';
import { GenericModal } from '../GenericModal';
import InputField from '../Form/InputField';
import SelectField from '../Form/SelectField';
import { Status, statusOptions } from '../../types/Status.ts';
import apis from '../../../api';
import { useAuth } from '../../utils/AuthContext.tsx';
import { useSearchParams } from 'react-router-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTaskModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(Status.PENDING);
  const [dueDate, setDueDate] = useState(
    new Date().toLocaleDateString('en-CA'),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Criar');
  const [error, setError] = useState<string | null>(null);
  const [_, setUseParams] = useSearchParams();
  const { getUserId } = useAuth();

  const handleButtonClick = async () => {
    setButtonLabel('Salvando...');
    setIsSaving(true);
    setError(null);

    if (!title || !description || !status || !dueDate) {
      setError('Preencha todos os campos');
      setButtonLabel('Erro');
      setIsSaving(false);
      return;
    }

    try {
      await apis.createTask({
        name: title,
        description,
        status,
        dueDate,
        userId: getUserId(),
      });
    } catch (err: any) {
      setUseParams({ message: 'error' });
      setError(err.message || 'Erro desconhecido');
      setButtonLabel('Erro');
    } finally {
      setIsSaving(false);
      setUseParams({ message: 'task-created' });
      window.location.reload();
    }
  };

  const content = (
    <>
      <div className={ModalStyles.cardTitle}>
        <InputField
          label="Título"
          type="text"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <InputField
        label="Descrição"
        type="textarea"
        value={description}
        required
        onChange={(e) => setDescription(e.target.value)}
      />
      <SelectField
        label="Status"
        value={status}
        options={statusOptions}
        required
        onChange={(e) => setStatus(e.target.value as Status)}
      />
      <InputField
        label="Vencimento"
        type="date"
        value={dueDate}
        required
        onChange={(e) => setDueDate(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );

  const footer = (
    <>
      <Button
        label={buttonLabel}
        onClick={handleButtonClick}
        type="button"
        className={ButtonStyles.primary}
        isLoading={isSaving}
      />
      <Button
        label="Fechar"
        onClick={onClose}
        type="button"
        className={`${ModalStyles.closeButton} ${ButtonStyles.secondary}`}
      />
    </>
  );

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={onClose}
      content={content}
      footer={footer}
    />
  );
};
