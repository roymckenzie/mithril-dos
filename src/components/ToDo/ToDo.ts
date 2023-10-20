import m from 'mithril';
import ToDoController from '../../controllers/ToDoController';
import icon from '../Interface/Icon';

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
          if (!event.dataTransfer) return;
          event.dataTransfer.dropEffect = 'move';
          event.dataTransfer.effectAllowed = 'move';
          event.dataTransfer.setData('id', toDo.id);
        },
        ondragend: (event: DragEvent & { target: HTMLElement }) => {
          if (!event.dataTransfer) return;
          event.dataTransfer.clearData();
        },
      },
      icon('bars-4', { class: 'h-5 w-5 drag-handle' }),
      m(
        'label',
        {
          onclick: (e: PointerEvent) => e.preventDefault(),
          for: toDo.trashed ? null : toDo.id,
        },
        toDo.description,

        m(
          'button.trash-to-do',
          {
            onclick: toDo.trashed ? deleteToDo : trashToDo,
            'data-to-do-id': toDo.id,
          },
          toDo.trashed
            ? 'Delete'
            : icon('trash', { class: 'h-4 w-4' }),
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
