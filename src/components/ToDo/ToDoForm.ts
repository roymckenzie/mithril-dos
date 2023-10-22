import m from 'mithril';
import ToDoController from '../../controllers/ToDoController';

function ToDoForm(): m.Component {
  var newToDoText = '';

  return {
    view() {
      return m(
        'form.to-do-form',
        m('input.new-to-do-text[id=new-to-do-input][type=text][placeholder=Type a new to-do.]', {
          value: newToDoText,
          onkeyup: (event: KeyboardEvent & { target: HTMLInputElement }) =>
            (newToDoText = event.target.value),
        }),
        m(
          'button.add-to-do',
          {
            disabled: newToDoText.length > 0 ? false : true,
            onclick: (event: PointerEvent) => {
              event.preventDefault();
              if (ToDoController.add(newToDoText)) {
                newToDoText = '';
              }
            },
          },
          'Add',
        ),
      );
    },
  };
}

export default ToDoForm;
