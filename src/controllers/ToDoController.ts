function ToDoController(toDos: ToDo[]) {
  /**
   * ToDos
   */
  const _toDos = toDos;

  /**
   * ToDos marked as completed.
   * 
   * @returns {CompletedToDo[]}
   */
  function completed() {
    const completed = notTrashed().filter(toDo => toDo.completed) as CompletedToDo[];
    return completed.toSorted((a, b) => b.completed - a.completed);
  }

  /**
   * ToDos marked as not completed.
   * 
   * @returns {ToDo[]}
   */
  function notCompleted() {
    return notTrashed()
      .filter(toDo => !toDo.completed)
      .toSorted((a, b) => b.created - a.created)
      .toSorted((a, b) => a.order - b.order);
  }

  /**
   * ToDos marked as trashed.
   * 
   * @returns {TrashedToDo[]}
   */
  function trashed() {
    const trashed = _toDos.filter(toDo => toDo.trashed) as TrashedToDo[];
    return trashed.toSorted((a, b) => b.trashed - a.trashed);
  }

  /**
   * ToDos not marked as trashed.
   * 
   * @returns {ToDo[]}
   */
  function notTrashed() {
    return _toDos.filter(toDo => !toDo.trashed);
  }

  /**
   * Get the index of a ToDo that has matching id.
   * 
   * @param toDoId - ToDo ID
   * @returns {number | -1} Index of ToDo
   */
  function targetToDoIndex(toDoId: string) {
    return _toDos.findIndex(toDo => toDo.id === toDoId);
  }

  /**
   * Mark a ToDo as complete.
   * 
   * @param toDoId - ToDo ID
   */
  function complete(toDoId: string) {
    const index = targetToDoIndex(toDoId);
    _toDos[index].completed = Date.now();

    updateStorage();
  }

  /**
   * Mark a ToDo as not complete.
   * 
   * @param toDoId - ToDo ID
   */
  function unComplete(toDoId: string) {
    const index = targetToDoIndex(toDoId);
    delete _toDos[index].completed;

    updateStorage();
  }

  /**
   * Mark a ToDo as trashed (but not destroyed).
   * 
   * @param toDoId - ToDo ID
   */
  function trash(toDoId: string) {
    const index = targetToDoIndex(toDoId);
    _toDos[index].trashed = Date.now();

    updateStorage();
  }

  /**
   * Mark a ToDo as not trashed.
   * 
   * @param toDoId - ToDo ID
   */
  function unTrash(toDoId: string) {
    const index = targetToDoIndex(toDoId);
    delete _toDos[index].trashed;

    updateStorage();
  }

  /**
   * Permantently destroy a ToDo.
   * 
   * @param toDoId - ToDo ID
   */
  function destroy(toDoId: string) {
    const index = targetToDoIndex(toDoId);
    _toDos.splice(index, 1);

    updateStorage();
  }

  /**
   * Permanently destroy all ToDos marked as trashed.
   */
  function destroyAllTrashed() {
    if (!confirm('Are you sure you want to permanently delete your trashed to-dos?')) return;
    trashed().forEach(toDo => {
      const index = _toDos.indexOf(toDo);
      _toDos.splice(index, 1);
    });

    updateStorage();
  }

  /**
   * Add a new ToDo.
   * 
   * @param toDoText - Text of new ToDo
   * @returns {boolean} `true` if the operation was successful, `false` if it was not
   */
  function add(toDoText: string): boolean {
    if (toDoText.length === 0) {
      alert('Your to-do appears to be blank.');
      return false;
    }

    _toDos.push({
      created: Date.now(),
      id: crypto.randomUUID(),
      order: 0,
      description: toDoText,
    });

    updateStorage();
    return true;
  }

  /**
   * Reorder a ToDo.
   * 
   * @param toDoId - ToDo ID
   * @param afterToDoId - ToDo ID to place ToDo with `toDoId` after
   */
  function reorder(toDoId: string, afterToDoId: string) {
    const toDoIndex = targetToDoIndex(toDoId);
    const afterToDo = _toDos.find(toDo => toDo.id === afterToDoId);
    if (toDoIndex === -1 || !afterToDo) return;
    _toDos[toDoIndex].order = afterToDo.order + 0.5;

    updateStorage();
  }

  /**
   * Update `localStorage`
   */
  function updateStorage() {
    localStorage.setItem('toDos', JSON.stringify(_toDos));
  }

  return {
    add,
    destroy,

    complete,
    unComplete,

    trash,
    unTrash,

    reorder,

    destroyAllTrashed,

    completed,
    notCompleted,
    trashed,
  };
}

const toDoStorage = localStorage.getItem('toDos');
const toDos: ToDo[] = [];

if (toDoStorage) {
  const _toDos: ToDo[] = JSON.parse(toDoStorage);
  _toDos.forEach(toDo => toDos.push(toDo));
}

export default ToDoController(toDos);
