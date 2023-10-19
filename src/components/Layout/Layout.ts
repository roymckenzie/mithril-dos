import m from 'mithril';
import Navigation from './Navigation';
import Header from './Header';
import Controller, { ToDoItemController } from '../../controllers/ToDoItemController';

interface State {
  controller: ToDoItemController
}

const Layout: m.Comp<{},State> = {
  controller: Controller,
  view: ({ children, state: { controller } }) => {
    return m('.app',
      m(Header),
      m(Navigation, {
        completedCount: controller.completed().length,
        notCompletedCount: controller.notCompleted().length,
        trashedCount: controller.trashed().length }),
      m('main.app-main', children)
    )
  }
}

export default Layout;
