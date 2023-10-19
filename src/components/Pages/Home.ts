import m from 'mithril';
import ToDoList from '../ToDoList/ToDoList';
import ToDoForm from '../ToDoForm/ToDoForm';
import NoToDos from '../ToDoList/NoToDos';
import ToDoController from '../../controllers/ToDoController';

interface State {
  controller: typeof ToDoController;
}

const Home: m.Comp<{},State> = {
  controller: ToDoController,
  view: ({ state: {controller} }) => {
    return m('article.home',
      m(ToDoForm),
      m(ToDoList, { toDos: controller.notCompleted() }),
      controller.notCompleted().length === 0 ? m(NoToDos, 'No to-dos. Consider adding one.') : null,
    );
  }
}

export default Home;
