interface ToDo {
  id: string;
  description: string;
  created: number;
  order: number;
  completed?: number;
  trashed?: number;
}

type CompletedToDo = Required<
  Pick<ToDo, 'id' | 'description' | 'order' | 'created' | 'completed'>
>;
type TrashedToDo = Required<
  Pick<ToDo, 'id' | 'description' | 'order' | 'created' | 'trashed'>
>;
