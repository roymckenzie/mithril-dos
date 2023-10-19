
export interface ToDoItemController {
  toDoItems: ToDoItem[];
  newToDoText: string;

  targetToDoIndex(id: string): void;
  
  complete(id: string): void;
  unComplete(id: string): void;
  
  trash(id: string): void;
  unTrash(id: string): void;
  
  add(): void;
  delete(id: string): void;
  
  updateStorage(): void;

  completed(): ToDoItem[];
  notCompleted(): ToDoItem[];

  trashed(): ToDoItem[];
  notTrashed(): ToDoItem[];
}

class Controller implements ToDoItemController {

  newToDoText = ''
  toDoItems: ToDoItem[];

  constructor(toDoItems: ToDoItem[]) {
    this.toDoItems = toDoItems;
  }

  completed() {
    return this.notTrashed().filter(toDo => toDo.completed).toSorted((a,b) => b.completed - a.completed);
  }

  notCompleted() {
    return this.notTrashed().filter(toDo => !toDo.completed).toSorted((a,b) => b.created - a.created);
  }

  trashed() {
    return this.toDoItems.filter(toDo => toDo.trashed).toSorted((a,b) => b.trashed - a.trashed);
  }

  notTrashed() {
    return this.toDoItems.filter(toDo => !toDo.trashed);
  }

  targetToDoIndex(id: string) {
    return this.toDoItems.findIndex(toDo => toDo.id === id);
  }

  complete(id: string) {
    const index = this.targetToDoIndex(id);
    this.toDoItems[index].completed = Date.now();

    this.updateStorage();
  }

  unComplete(id: string) {
    const index = this.targetToDoIndex(id);
    delete this.toDoItems[index].completed;

    this.updateStorage();
  }

  trash(id: string) {
    const index = this.targetToDoIndex(id);
    this.toDoItems[index].trashed = Date.now();


    this.updateStorage();
  }

  unTrash(id: string) {
    const index = this.targetToDoIndex(id);
    delete this.toDoItems[index].trashed

    this.updateStorage();
  }

  delete(id: string) {
    const index = this.targetToDoIndex(id);
    this.toDoItems.splice(index, 1);

    this.updateStorage();
  }

  add() {
    this.toDoItems.push({
      created: Date.now(),
      id: crypto.randomUUID(),
      description: this.newToDoText
    });

    this.newToDoText = '';

    this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem('toDos', JSON.stringify(this.toDoItems));
  }
}

const toDoStorage = localStorage.getItem('toDos');
const toDos: ToDoItem[] = [];

if (toDoStorage) {
  const _toDos: ToDoItem[] = JSON.parse(toDoStorage)
  _toDos.forEach(toDo => toDos.push(toDo));
}

export default new Controller(toDos);
