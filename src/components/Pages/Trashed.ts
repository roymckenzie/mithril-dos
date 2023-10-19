import m from 'mithril';
import ToDoList from '../ToDoList/ToDoList';
import ToDoController from '../../controllers/ToDoController';
import NoToDos from '../ToDoList/NoToDos';

interface State {
  controller: typeof ToDoController;
}

const Trashed: m.Comp<{},State> = {
  controller: ToDoController,
  view: ({ state: { controller }}) => {
    return m('article.completed',
      controller.trashed().length === 0 ? m(NoToDos, 'No trashed to-dos.') : null,
      m(ToDoList, { toDos: controller.trashed() })
    );
  }
}

export default Trashed;
