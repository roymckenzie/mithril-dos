import m from 'mithril';
import ToDoList from '../ToDo/ToDoList';
import ToDoController from '../../controllers/ToDoController';
import NoToDos from '../ToDo/NoToDos';
import icon from '../Interface/Icon';

interface State {
  controller: typeof ToDoController;
}

const Trashed: m.Comp<{}, State> = {
  controller: ToDoController,
  view() {
    return m(
      'article.completed',
      this.controller.trashed().length === 0
        ? m(NoToDos, 'No trashed to-dos.')
        : null,
      this.controller.trashed().length > 0
        ? m(
            'menu.controls',
            m(
              'li',
              m(
                'button.delete-all',
                {
                  onclick: () => this.controller.deleteTrashed(),
                },
                icon('trash', { class: 'h-4 w-4' }),
                'Delete all',
              ),
            ),
          )
        : null,
      m(ToDoList, { toDos: this.controller.trashed() }),
    );
  },
};

export default Trashed;
