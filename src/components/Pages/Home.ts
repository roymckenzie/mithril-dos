import m from 'mithril';
import ToDoList from '../ToDo/ToDoList';
import ToDoForm from '../ToDo/ToDoForm';
import NoToDos from '../ToDo/NoToDos';
import ToDoController from '../../controllers/ToDoController';

interface State {
  controller: typeof ToDoController;
}

const Home: m.Comp<{}, State> = {
  controller: ToDoController,
  view() {
    return m(
      'article.home',
      m(ToDoForm),
      m(ToDoList, { toDos: this.controller.notCompleted() }),
      this.controller.notCompleted().length === 0
        ? m(NoToDos, 'No to-dos. Consider adding one.')
        : null,
    );
  },
};

export default Home;
