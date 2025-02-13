export enum Status {
  PENDING = 'pending',
  DOING = 'doing',
  DONE = 'done',
}

export const statusOptions = [
  { value: Status.PENDING, label: 'Pendente' },
  { value: Status.DOING, label: 'Em andamento' },
  { value: Status.DONE, label: 'Concluído' },
];

export const getStatusLabel = (status: Status) => {
  return statusOptions.filter((option) => option.value === status)[0].label;
};
