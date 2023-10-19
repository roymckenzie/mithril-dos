import m from 'mithril';
import Navigation from './Navigation';
import Header from './Header';
import ToDoController from '../../controllers/ToDoController';

interface State {
  controller: typeof ToDoController
}

const Layout: m.Comp<{},State> = {
  controller: ToDoController,
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
