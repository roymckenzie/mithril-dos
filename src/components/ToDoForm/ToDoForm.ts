import m from "mithril";
import ToDoItemController from "../../controllers/ToDoItemController";

interface State {
  updateNewToDo(event: KeyboardEvent): void;
}

const ToDoForm: m.Comp<{},State> = {
  updateNewToDo(event: KeyboardEvent & { target: HTMLInputElement }) {
    ToDoItemController.newToDoText = event.target.value;
  },
  view: ({ state: { updateNewToDo }}) => {
    return m('form.to-do-form',
      m('input.new-to-do-text[id=new-to-do-input][type=text][placeholder=Type a new to-do.]', {
        value: ToDoItemController.newToDoText,
        onkeyup: updateNewToDo,
      }),
      m('button.add-to-do', { 
        onclick: (e: PointerEvent) => {
          e.preventDefault();
          ToDoItemController.add();
        }
      }, 'Add')
    )
  }
}

export default ToDoForm;
