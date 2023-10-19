import m from 'mithril';
import ToDoList from '../ToDoList/ToDoList';
import ToDoForm from '../ToDoForm/ToDoForm';
import NoToDos from '../ToDoList/NoToDos';
import Controller, { ToDoItemController } from '../../controllers/ToDoItemController';

interface State {
  controller: ToDoItemController;
}

const Home: m.Comp<{},State> = {
  controller: Controller,
  view: ({ state: {controller} }) => {
    return m('article.home',
      m(ToDoForm),
      m(ToDoList, { toDoItems: controller.notCompleted() }),
      controller.notCompleted().length === 0 ? m(NoToDos, 'No to-dos. Consider adding one.') : null,
    );
  }
}

export default Home;
