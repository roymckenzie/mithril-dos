import m from 'mithril';
import ToDoController from '../../controllers/ToDoController';

interface Attr {
  toDo: ToDo;
}

interface State {
  trashToDo(event: PointerEvent): void;
  deleteToDo(event: PointerEvent): void;
  completeToDo(event: PointerEvent): void;
  unCompleteToDo(event: PointerEvent): void;
}

const ToDoListItem: m.Comp<Attr, State> = {
  deleteToDo(event: PointerEvent & { target: HTMLButtonElement }) {
    event.preventDefault();
    event.stopPropagation();
    if (!confirm('Are you sure you want to completely delete this to-do?')) {
      return;
    }
    const toDoId = event.target.getAttribute('data-to-do-id');
    if (!toDoId) return;
    ToDoController.delete(toDoId);
  },
  trashToDo(event: PointerEvent & { target: HTMLButtonElement }) {
    event.preventDefault();
    event.stopPropagation();
    const toDoId = event.target.getAttribute('data-to-do-id');
    if (!toDoId) return;
    ToDoController.trash(toDoId);
  },
  completeToDo(event: PointerEvent & { target: HTMLInputElement }) {
    event.preventDefault();
    ToDoController.complete(event.target.id);
  },
  unCompleteToDo(event: PointerEvent & { target: HTMLInputElement }) {
    event.preventDefault();
    ToDoController.unComplete(event.target.id);
  },
  view: ({
    attrs: { toDo },
    state: { completeToDo, unCompleteToDo, trashToDo, deleteToDo },
  }) => {
    return m(
      'li.to-do[draggable]',
      {
        ondragstart: (event: DragEvent & { target: HTMLElement }) => {
          event.target.classList.add('dragging');
          if (!event.dataTransfer) return;
          event.dataTransfer.dropEffect = 'move';
          event.dataTransfer.effectAllowed = 'move';
          event.target.style.cursor = 'grabbing';
          event.dataTransfer.setData('id', toDo.id);
          event.dataTransfer.setData('text/plain', 'This can be dragged!');
        },
        ondragend: (event: DragEvent & { target: HTMLElement }) => {
          event.target.classList.remove('dragging');
        },
      },
      m(
        'label',
        {
          onclick: (e: PointerEvent) => e.preventDefault(),
          for: toDo.trashed ? null : toDo.id,
        },
        toDo.description,
        toDo.trashed
          ? null
          : m(
              'button.trash-to-do',
              {
                onclick: toDo.trashed ? deleteToDo : trashToDo,
                'data-to-do-id': toDo.id,
              },
              'Trash',
            ),
        toDo.trashed
          ? null
          : m('input[type=checkbox].complete-to-do', {
              checked: toDo.completed,
              id: toDo.id,
              onclick: toDo.completed ? unCompleteToDo : completeToDo,
              disabled: toDo.trashed ? true : false,
            }),
      ),
    );
  },
};

export default ToDoListItem;
