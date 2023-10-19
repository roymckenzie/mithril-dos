import m from 'mithril';
import ToDoList from '../ToDoList/ToDoList';
import Controller, { ToDoItemController } from '../../controllers/ToDoItemController';
import NoToDos from '../ToDoList/NoToDos';

interface State {
  controller: ToDoItemController;
}

const Completed: m.Comp<{},State> = {
  controller: Controller,
  view: ({ state: { controller }}) => {
    return m('article.completed',
      controller.completed().length === 0 ? m(NoToDos, 'No completed to-dos. Consider completing one.') : null,
      m(ToDoList, { toDoItems: controller.completed() })
    );
  }
}

export default Completed;
