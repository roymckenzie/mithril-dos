import m from 'mithril';
import ToDoController from '../../controllers/ToDoController';
import icon from '../Interface/Icon';
import NoToDos from '../ToDo/NoToDos';
import ToDoList from '../ToDo/ToDoList';

function Trashed(): m.Component {
  return {
    view() {
      return m(
        'article.completed',
        ToDoController.trashed().length === 0 ? m(NoToDos, 'No trashed to-dos.') : null,
        ToDoController.trashed().length > 0
          ? m(
              'menu.controls',
              m(
                'li',
                m(
                  'button.delete-all',
                  {
                    onclick: () => ToDoController.deleteTrashed(),
                  },
                  icon('trash', { class: 'h-4 w-4' }),
                  'Delete all',
                ),
              ),
            )
          : null,
        m(ToDoList, { toDos: ToDoController.trashed() }),
      );
    },
  };
}

export default Trashed;
