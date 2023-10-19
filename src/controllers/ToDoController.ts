
class ToDoController {

  newToDoText = ''
  toDos: ToDo[];

  constructor(toDos: ToDo[]) {
    this.toDos = toDos;
  }

  completed() {
    const completed = this.notTrashed().filter(toDo => toDo.completed) as CompletedToDo[]
    return completed.toSorted((a,b) => b.completed - a.completed)
  }

  notCompleted() {
    return this.notTrashed().filter(toDo => !toDo.completed).toSorted((a,b) => b.created - a.created);
  }

  trashed() {
    const trashed = this.toDos.filter(toDo => toDo.trashed) as TrashedToDo[]
    return trashed.toSorted((a,b) => b.trashed - a.trashed);
  }

  notTrashed() {
    return this.toDos.filter(toDo => !toDo.trashed);
  }

  targetToDoIndex(id: string) {
    return this.toDos.findIndex(toDo => toDo.id === id);
  }

  complete(id: string) {
    const index = this.targetToDoIndex(id);
    this.toDos[index].completed = Date.now();

    this.updateStorage();
  }

  unComplete(id: string) {
    const index = this.targetToDoIndex(id);
    delete this.toDos[index].completed;

    this.updateStorage();
  }

  trash(id: string) {
    const index = this.targetToDoIndex(id);
    this.toDos[index].trashed = Date.now();


    this.updateStorage();
  }

  unTrash(id: string) {
    const index = this.targetToDoIndex(id);
    delete this.toDos[index].trashed;

    this.updateStorage();
  }

  delete(id: string) {
    const index = this.targetToDoIndex(id);
    this.toDos.splice(index, 1);

    this.updateStorage();
  }

  add() {
    this.toDos.push({
      created: Date.now(),
      id: crypto.randomUUID(),
      description: this.newToDoText,
    });

    this.newToDoText = '';

    this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem('toDos', JSON.stringify(this.toDos));
  }
}

const toDoStorage = localStorage.getItem('toDos');
const toDos: ToDo[] = [];

if (toDoStorage) {
  const _toDos: ToDo[] = JSON.parse(toDoStorage)
  _toDos.forEach(toDo => toDos.push(toDo));
}

export default new ToDoController(toDos);
