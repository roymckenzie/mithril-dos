import m from 'mithril';
import ToDoList from '../ToDoList/ToDoList';
import Controller, { ToDoItemController } from '../../controllers/ToDoItemController';
import NoToDos from '../ToDoList/NoToDos';

interface State {
  controller: ToDoItemController;
}

const Trashed: m.Comp<{},State> = {
  controller: Controller,
  view: ({ state: { controller }}) => {
    return m('article.completed',
      controller.trashed().length === 0 ? m(NoToDos, 'No trashed to-dos.') : null,
      m(ToDoList, { toDoItems: controller.trashed() })
    );
  }
}

export default Trashed;
