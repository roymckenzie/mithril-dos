interface ToDo {
  id: string
  description: string
  created: number
  completed?: number
  trashed?: number
}

type CompletedToDo = Required<Pick<ToDo,'id' | 'description' | 'created' | 'completed'>>;
type TrashedToDo = Required<Pick<ToDo,'id' | 'description' | 'created' | 'trashed'>>;
