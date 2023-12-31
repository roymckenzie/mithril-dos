import m from 'mithril';
import ToDoController from '../../controllers/ToDoController';
import icon from '../Interface/Icon';

interface Attr {
  toDo: ToDo;
}

enum ToDoAction {
  Destroy = 'destroy',
  Trash = 'trash',
  Complete = 'complete',
  UnComplete = 'unComplete',
}

function ToDoListItem(): m.Component<Attr> {
  let dragLeaveTimeout: number;

  var editingToDo = false;
  var newToDoDescription = '';

  function handleToDoDrag(event: DragEvent, toDoId: string) {
    if (!(event.target instanceof HTMLElement)) return;
    const targetToDoElement = event.target.closest('.to-do') as HTMLElement;

    if (!targetToDoElement) return;

    switch (event.type) {
      case 'dragstart':
        targetToDoElement.classList.add('dragging');
        if (!event.dataTransfer) return;
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('id', toDoId);
        break;
      case 'dragend':
        targetToDoElement.classList.remove('dragging');
        if (!event.dataTransfer) return;
        event.dataTransfer.clearData();
        break;
      case 'dragover':
        event.preventDefault();
        targetToDoElement.classList.add('dragover');
        clearTimeout(dragLeaveTimeout);
        break;
      case 'dragleave':
        dragLeaveTimeout = window.setTimeout(() => {
          targetToDoElement.classList.remove('dragover');
        }, 300);
        break;
      case 'drop':
        if (!event.dataTransfer) return;
        const draggedToDoId = event.dataTransfer.getData('id');
        targetToDoElement.classList.remove('dragover');

        ToDoController.reorder(draggedToDoId, targetToDoElement.id);
        break;
    }
  }

  function handleToDoAction(event: PointerEvent, action: ToDoAction) {
    if (!(event.target instanceof HTMLElement)) return;
    event.preventDefault();
    const toDo = event.target.closest('.to-do');
    if (!toDo) return;

    if (action === ToDoAction.Destroy) {
      if (!confirm('Are you sure you want to completely delete this to-do?')) {
        return;
      }
    }

    ToDoController[action](toDo.id);
  }

  function setEditing() {
    editingToDo = true;
    setTimeout(() => {
      const textArea = document.querySelector('#edit-to-do') as HTMLTextAreaElement;
      if (!textArea) return;
      textArea.style.height = 0 + 'px';
      textArea.style.height = textArea.scrollHeight + 'px';
      textArea.focus();
    }, 1);
  }

  function descriptionKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      setEditing();
    }
  }

  function handleKeyDown(event: KeyboardEvent & { target: HTMLTextAreaElement}, toDoId: string) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      updateToDo(toDoId);
    }
  }

  function handleInput(event: InputEvent & { target: HTMLTextAreaElement }) {
    newToDoDescription = event.target.value;
    event.target.style.height = 0 + 'px';
    event.target.style.height = event.target.scrollHeight + 'px';
  }

  function updateToDo(toDoId: string) {
    ToDoController.update(toDoId, newToDoDescription);
    editingToDo = false;
  }

  return {
    oninit({ attrs: { toDo } }) {
      newToDoDescription = toDo.description;
    },
    view({ attrs: { toDo } }) {
      return m(
        'li.to-do[draggable]',
        {
          id: toDo.id,
          ondragstart: (event: DragEvent) => handleToDoDrag(event, toDo.id),
          ondragend: (event: DragEvent) => handleToDoDrag(event, toDo.id),
          ondragover: (toDo.completed || toDo.trashed) ? null : (event: DragEvent) => handleToDoDrag(event, toDo.id),
          ondragleave: (toDo.completed || toDo.trashed) ? null : (event: DragEvent) => handleToDoDrag(event, toDo.id),
          ondrop: (toDo.completed || toDo.trashed) ? null : (event: DragEvent) => handleToDoDrag(event, toDo.id),
        },
        m(
          'span.wrapper',
          icon('bars-4', { class: 'h-5 w-5 drag-handle' }),
          editingToDo && (!(toDo.completed || toDo.trashed))
            ? m('textarea[id=edit-to-do][rows=1]', {
              value: newToDoDescription,
                onkeydown: (event: KeyboardEvent & { target: HTMLTextAreaElement }) => handleKeyDown(event, toDo.id),
                oninput: (event: InputEvent & { target: HTMLTextAreaElement }) => handleInput(event), 
                onblur: () => updateToDo(toDo.id),
              })
            : m('span.to-do-text[tabindex=0]', { onclick: setEditing, onkeydown: (event: KeyboardEvent) => descriptionKeyDown(event) }, toDo.description),
          m(
            'button.trash-to-do',
            {
              onclick: toDo.trashed
                ? (event: PointerEvent) => handleToDoAction(event, ToDoAction.Destroy)
                : (event: PointerEvent) => handleToDoAction(event, ToDoAction.Trash),
            },
            toDo.trashed ? 'Delete' : icon('trash', { class: 'h-4 w-4' }),
          ),
          toDo.trashed
            ? null
            : m('input[type=checkbox].complete-to-do', {
                checked: toDo.completed,
                name: 'complete-to-do',
                onclick: toDo.completed
                  ? (event: PointerEvent) => handleToDoAction(event, ToDoAction.UnComplete)
                  : (event: PointerEvent) => handleToDoAction(event, ToDoAction.Complete),
                disabled: toDo.trashed ? true : false,
              }),
        ),
      );
    },
  };
}

export default ToDoListItem;
