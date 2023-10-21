import m from 'mithril';
import ToDoController from '../../controllers/ToDoController';

interface State {
  controller: typeof ToDoController;
  updateNewToDo(event: KeyboardEvent): void;
}

const ToDoForm: m.Comp<{}, State> = {
  controller: ToDoController,
  updateNewToDo(event: KeyboardEvent & { target: HTMLInputElement }) {
    this.controller.newToDoText = event.target.value;
  },
  view() {
    return m(
      'form.to-do-form',
      m('input.new-to-do-text[id=new-to-do-input][type=text][placeholder=Type a new to-do.]', {
        value: this.controller.newToDoText,
        onkeyup: this.updateNewToDo,
      }),
      m(
        'button.add-to-do',
        {
          disabled: this.controller.newToDoText.length > 0 ? false : true,
          onclick: (e: PointerEvent) => {
            e.preventDefault();
            this.controller.add();
          },
        },
        'Add',
      ),
    );
  },
};

export default ToDoForm;
