import m from 'mithril';
import ToDoList from '../ToDo/ToDoList';
import ToDoController from '../../controllers/ToDoController';
import NoToDos from '../ToDo/NoToDos';

interface State {
  controller: typeof ToDoController;
}

const Completed: m.Comp<{}, State> = {
  controller: ToDoController,
  view: ({ state: { controller } }) => {
    return m(
      'article.completed',
      controller.completed().length === 0
        ? m(NoToDos, 'No completed to-dos. Consider completing one.')
        : null,
      m(ToDoList, { toDos: controller.completed() }),
    );
  },
};

export default Completed;
