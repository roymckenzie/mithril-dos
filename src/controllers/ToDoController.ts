class ToDoController {
  newToDoText = '';
  readonly toDos: ToDo[];

  constructor(toDos: ToDo[]) {
    this.toDos = toDos;
  }

  completed() {
    const completed = this.notTrashed().filter(toDo => toDo.completed) as CompletedToDo[];
    return completed
      .toSorted((a, b) => b.completed - a.completed)
  }

  notCompleted() {
    return this.notTrashed()
      .filter(toDo => !toDo.completed)
      .toSorted((a, b) => b.created - a.created)
      .toSorted((a, b) => a.order - b.order);
  }

  trashed() {
    const trashed = this.toDos.filter(toDo => toDo.trashed) as TrashedToDo[];
    return trashed.toSorted((a, b) => b.trashed - a.trashed);
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

  deleteTrashed() {
    if (!confirm('Are you sure you want to permanently delete your trashed to-dos?')) return;
    this.trashed().forEach(toDo => {
      const index = this.toDos.indexOf(toDo);
      this.toDos.splice(index, 1);
    });
  }

  add() {
    if (this.newToDoText.length === 0) return alert('Your to-do appears to be blank.');
    this.toDos.push({
      created: Date.now(),
      id: crypto.randomUUID(),
      order: 0,
      description: this.newToDoText,
    });

    this.newToDoText = '';

    this.updateStorage();
  }

  reorder(toDoId: string, afterToDoId: string) {
    const toDoIndex = this.targetToDoIndex(toDoId);
    const afterToDo = this.toDos.find(toDo => toDo.id === afterToDoId);
    if (toDoIndex === -1 || !afterToDo) return;
    this.toDos[toDoIndex].order = afterToDo.order + 0.5;

    this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem('toDos', JSON.stringify(this.toDos));
  }
}

const toDoStorage = localStorage.getItem('toDos');
const toDos: ToDo[] = [];

if (toDoStorage) {
  const _toDos: ToDo[] = JSON.parse(toDoStorage);
  _toDos.forEach(toDo => toDos.push(toDo));
}

export default new ToDoController(toDos);
