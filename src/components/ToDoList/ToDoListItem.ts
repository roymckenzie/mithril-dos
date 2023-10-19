import m from 'mithril';
import ToDoItemController from '../../controllers/ToDoItemController';

interface Attr {
  toDoItem: ToDoItem;
}

interface State {
  deleteToDo(event: PointerEvent): void;
  trashToDo(event: PointerEvent): void;
  completeToDo(event: PointerEvent): void;
  unCompleteToDo(event: PointerEvent): void;
}

const ToDoListItem: m.Comp<Attr, State> = {
  deleteToDo(event: PointerEvent & { target: HTMLButtonElement }) {
    event.preventDefault();
    event.stopPropagation();
    if(!confirm('Are you sure you want to completely delete this to-do?')) {
      return;
    }
    const toDoId = event.target.getAttribute('data-to-do-id');
    if (!toDoId) return;
    ToDoItemController.delete(toDoId);
  },
  trashToDo(event: PointerEvent & { target: HTMLButtonElement }) {
    event.preventDefault();
    event.stopPropagation();
    const toDoId = event.target.getAttribute('data-to-do-id');
    if (!toDoId) return;
    ToDoItemController.trash(toDoId);
  },
  completeToDo(event: PointerEvent & { target: HTMLInputElement }) {
    event.preventDefault();
    ToDoItemController.complete(event.target.id);
  },
  unCompleteToDo(event: PointerEvent & { target: HTMLInputElement }) {
    event.preventDefault();
    ToDoItemController.unComplete(event.target.id);
  },
  view: ({ attrs: { toDoItem }, state: { completeToDo, unCompleteToDo, trashToDo, deleteToDo } }) => {
    return m(
      'li.to-do[draggable]',
      {
        ondragstart: (event: DragEvent & { target: HTMLElement }) => {
          event.target.classList.add('dragging');
          if (!event.dataTransfer) return;
          event.dataTransfer.dropEffect = 'move';
          event.dataTransfer.effectAllowed = 'move';
          event.target.style.cursor = 'grabbing'
          event.dataTransfer.setData('id', toDoItem.id);
          event.dataTransfer.setData('text/plain', 'This can be dragged!');
        },
        ondragend: (event: DragEvent & { target: HTMLElement}) => {
          event.target.classList.remove('dragging');
        }
      },
      m(
        'label',
        {
          for: toDoItem.id
        },
        toDoItem.description,
        m(
          'button.delete-to-do',
          {
            onclick: toDoItem.trashed ? deleteToDo : trashToDo,
            'data-to-do-id': toDoItem.id
          },
          toDoItem.trashed ? 'Delete' : 'Trash'
        ),
        m(
          'input[type=checkbox].complete-to-do',
          {
            checked: toDoItem.completed,
            id: toDoItem.id,
            onclick: toDoItem.completed ? unCompleteToDo : completeToDo,
            disabled: toDoItem.trashed ? true : false
          }
        )
      ),
    );
  }
}

export default ToDoListItem;
