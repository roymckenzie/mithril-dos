import m from 'mithril';
import ToDoController from '../../controllers/ToDoController';

interface State {
  updateNewToDo(event: KeyboardEvent): void;
}

const ToDoForm: m.Comp<{}, State> = {
  updateNewToDo(event: KeyboardEvent & { target: HTMLInputElement }) {
    ToDoController.newToDoText = event.target.value;
  },
  view: ({ state: { updateNewToDo } }) => {
    return m(
      'form.to-do-form',
      m(
        'input.new-to-do-text[id=new-to-do-input][type=text][placeholder=Type a new to-do.]',
        {
          value: ToDoController.newToDoText,
          onkeyup: updateNewToDo,
        },
      ),
      m(
        'button.add-to-do',
        {
          onclick: (e: PointerEvent) => {
            e.preventDefault();
            ToDoController.add();
          },
        },
        'Add',
      ),
    );
  },
};

export default ToDoForm;
