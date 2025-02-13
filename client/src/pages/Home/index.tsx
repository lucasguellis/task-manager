import React, { useEffect, useState } from 'react';
import styles from './styles.ts';
import { Column } from '../../components/Column';
import { Card } from '../../components/Card';
import Button from '../../components/Button';
import ButtonStyles from '../../components/Button/styles.ts';
import { CreateTaskModal } from '../../components/CreateTaskModal';
import { useAuth } from '../../utils/AuthContext.tsx';
import apis from '../../../api';
import { Task } from '../../types/Task.ts';
import { useApi } from '../../hooks/useApi.ts';
import { getStatusLabel, Status } from '../../types/Status.ts';
import { useSearchParams } from 'react-router-dom';
import FeedbackMessage from '../../components/FeedbackMessage';
import orderBy from 'lodash/orderBy';

const HomePage: React.FC = () => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const closeModal = (): void => setIsCreateTaskModalOpen(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { getUserId } = useAuth();
  const { data } = useApi<Task[]>(apis.getTasksByUserId, getUserId());

  const handleOrderByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('orderBy', event.target.value);
      return newParams;
    });
  };

  const handleFilterByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('filterBy', event.target.value);
      return newParams;
    });
  };

  useEffect(() => {
    if (data) {
      let filteredData = data;

      const filterByParam = searchParams.get('filterBy');
      if (filterByParam && filterByParam !== 'all') {
        filteredData = filteredData.filter((task: Task) => task.status === filterByParam);
      }

      const orderByParam = searchParams.get('orderBy');
      if (orderByParam) {
        const [field, order] = orderByParam.split('|');
        filteredData = orderBy(filteredData, field, order as 'asc' | 'desc');
      }

      setTasks(filteredData);
    }
  }, [data, searchParams]);

  return (
    <>
      <div className="content-center justify-center flex pt-5">
        {searchParams.get('message') === 'task-created' && (
          <FeedbackMessage message="Tarefa criada com sucesso!" type="success" />
        )}
        {searchParams.get('message') === 'task-edited' && (
          <FeedbackMessage message="Tarefa editada com sucesso!" type="success" />
        )}
        {searchParams.get('message') === 'task-deleted' && (
          <FeedbackMessage message="Tarefa excluída com sucesso!" type="success" />
        )}
        {searchParams.get('message') === 'error' && (
          <FeedbackMessage message="Algo de errado aconteceu, tente novamente!" type="error" />
        )}
      </div>
      
      <div className={styles.container}>
        <div className={styles.group}>
          <div className={styles.titleRow}>
            <h3 className="text-2xl font-bold">Tarefas</h3>
            <div className='text-center'>
              <p className="text-sm text-gray-500">Status</p>
              <select className="bg-gray-300/90 rounded-sm" onChange={handleFilterByChange} value={searchParams.get('filterBy') || ''}>
                <option value="all">Todos</option>
                <option value={Status.PENDING}>{getStatusLabel(Status.PENDING)}</option>
                <option value={Status.DOING}>{getStatusLabel(Status.DOING)}</option>
                <option value={Status.DONE}>{getStatusLabel(Status.DONE)}</option>
              </select>
            </div>
            <div className='text-center'>
              <p className="text-sm text-gray-500">Ordenar por</p>
              <select className="bg-gray-300/90 rounded-sm" onChange={handleOrderByChange} value={searchParams.get('orderBy') || ''}>
                <option value={0} disabled={true} selected={true} hidden={true}>Selecione...</option>
                <option value="name|asc">Título ↑</option>
                <option value="name|desc">Título ↓</option>
                <option value="dueDate|asc">Vencimento ↑</option>
                <option value="dueDate|desc">Vencimento ↓</option>
              </select>
            </div>
            <Button
                label="Adicionar tarefa"
              onClick={() => setIsCreateTaskModalOpen(true)}
              className={ButtonStyles.primary}
            />
          </div>
          <div className={styles.columns}>
            <Column id={1} title={getStatusLabel(Status.PENDING)}>
              {tasks
                .filter((task: Task) => task.status === Status.PENDING)
                .map((task: Task) => (
                  <Card
                    key={task._id}
                    _id={task._id}
                    name={task.name}
                    description={task.description}
                    status={task.status}
                    dueDate={task.dueDate}
                  />
                ))}
            </Column>
            <Column id={2} title={getStatusLabel(Status.DOING)}>
              {tasks
                .filter((task: Task) => task.status === Status.DOING)
                .map((task: Task) => (
                  <Card
                    key={task._id}
                    _id={task._id}
                    name={task.name}
                    description={task.description}
                    status={task.status}
                    dueDate={task.dueDate}
                  />
                ))}
            </Column>
            <Column id={3} title={getStatusLabel(Status.DONE)}>
              {tasks
                .filter((task: Task) => task.status === Status.DONE)
                .map((task: Task) => (
                  <Card
                    key={task._id}
                    _id={task._id}
                    name={task.name}
                    description={task.description}
                    status={task.status}
                    dueDate={task.dueDate}
                  />
                ))}
            </Column>
          </div>
        </div>
      </div>

      <CreateTaskModal isOpen={isCreateTaskModalOpen} onClose={closeModal} />
    </>
  );
};

export default HomePage;
