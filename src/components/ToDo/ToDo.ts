import m from 'mithril';
import ToDoController from '../../controllers/ToDoController';
import icon from '../Interface/Icon';

interface Attr {
  toDo: ToDo;
}

enum ToDoAction {
  Delete = 'delete',
  Trash = 'trash',
  Complete = 'complete',
  UnComplete = 'unComplete',
}

interface State {
  dragLeaveTimeout?: number;
  handleToDoAction(event: PointerEvent, action: ToDoAction): void;
  handleToDoDrag(event: DragEvent, toDo: ToDo): void;
}

const ToDoListItem: m.Comp<Attr, State> = {
  handleToDoDrag(event: DragEvent, toDo: ToDo) {
    if (!(event.target instanceof HTMLElement)) return;
    const targetToDoElement = event.target.closest('.to-do');

    if (!targetToDoElement) return;

    switch (event.type) {
      case 'dragstart':
        targetToDoElement.classList.add('dragging');
        if (!event.dataTransfer) return;
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('id', toDo.id);
        break;
      case 'dragend':
        targetToDoElement.classList.remove('dragging');
        if (!event.dataTransfer) return;
        event.dataTransfer.clearData();
        break;
      case 'dragover':
        targetToDoElement.classList.add('dragover');
        clearTimeout(this.dragLeaveTimeout);
        break;
      case 'dragleave':
        this.dragLeaveTimeout = setTimeout(() => {
          targetToDoElement.classList.remove('dragover');
        }, 100);
        break;
      case 'drop':
        if (!event.dataTransfer) return;
        const draggedToDoId = event.dataTransfer.getData('id');
        targetToDoElement.classList.remove('dragover');

        ToDoController.reorder(draggedToDoId, targetToDoElement.id);
        break;
    }
  },
  handleToDoAction(event, action) {
    if (!(event.target instanceof HTMLElement)) return;
    event.preventDefault();
    const toDo = event.target.closest('.to-do');
    if (!toDo) return;

    if (action === ToDoAction.Delete) {
      if (!confirm('Are you sure you want to completely delete this to-do?')) {
        return;
      }
    }

    ToDoController[action](toDo.id);
  },
  view({ attrs: { toDo } }) {
    return m(
      'li.to-do[draggable]',
      {
        id: toDo.id,
        ondragstart: (event: DragEvent) => this.handleToDoDrag(event, toDo),
        ondragend: (event: DragEvent) => this.handleToDoDrag(event, toDo),
        ondragover: (event: DragEvent) => this.handleToDoDrag(event, toDo),
        ondragleave: (event: DragEvent) => this.handleToDoDrag(event, toDo),
        ondrop: (event: DragEvent) => this.handleToDoDrag(event, toDo),
      },
      m(
        'span.wrapper',
        icon('bars-4', { class: 'h-5 w-5 drag-handle' }),
        m('span.to-do-text', toDo.description),
        m(
          'button.trash-to-do',
          {
            onclick: toDo.trashed
              ? (event: PointerEvent) => this.handleToDoAction(event, ToDoAction.Delete)
              : (event: PointerEvent) => this.handleToDoAction(event, ToDoAction.Trash),
          },
          toDo.trashed ? 'Delete' : icon('trash', { class: 'h-4 w-4' }),
        ),
        toDo.trashed
          ? null
          : m('input[type=checkbox].complete-to-do', {
              checked: toDo.completed,
              name: 'complete-to-do',
              onclick: toDo.completed
                ? (event: PointerEvent) => this.handleToDoAction(event, ToDoAction.UnComplete)
                : (event: PointerEvent) => this.handleToDoAction(event, ToDoAction.Complete),
              disabled: toDo.trashed ? true : false,
            }),
      ),
    );
  },
};

export default ToDoListItem;
