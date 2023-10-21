import m from 'mithril';
import ToDoList from '../ToDo/ToDoList';
import ToDoController from '../../controllers/ToDoController';
import NoToDos from '../ToDo/NoToDos';

interface State {
  controller: typeof ToDoController;
}

const Completed: m.Comp<{}, State> = {
  controller: ToDoController,
  view() {
    return m(
      'article.completed',
      this.controller.completed().length === 0
        ? m(NoToDos, 'No completed to-dos. Consider completing one.')
        : null,
      m(ToDoList, { toDos: this.controller.completed() }),
    );
  },
};

export default Completed;
