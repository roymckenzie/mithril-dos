import m from 'mithril';
import ToDoList from '../ToDo/ToDoList';
import ToDoForm from '../ToDo/ToDoForm';
import NoToDos from '../ToDo/NoToDos';
import ToDoController from '../../controllers/ToDoController';

function Home(): m.Component {
  return {
    view() {
      return m(
        'article.home',
        m(ToDoForm),
        m(ToDoList, { toDos: ToDoController.notCompleted() }),
        ToDoController.notCompleted().length === 0
          ? m(NoToDos, 'No to-dos. Consider adding one.')
          : null,
      );
    },
  };
}

export default Home;
