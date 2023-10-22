import m from 'mithril';
import ToDoList from '../ToDo/ToDoList';
import ToDoController from '../../controllers/ToDoController';
import NoToDos from '../ToDo/NoToDos';

function Completed(): m.Component {
  return {
    view() {
      return m(
        'article.completed',
        ToDoController.completed().length === 0
          ? m(NoToDos, 'No completed to-dos. Consider completing one.')
          : null,
        m(ToDoList, { toDos: ToDoController.completed() }),
      );
    },
  };
}

export default Completed;
