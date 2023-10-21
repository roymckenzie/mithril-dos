import m from 'mithril';
import Navigation from './Navigation';
import Header from './Header';
import ToDoController from '../../controllers/ToDoController';

interface State {
  controller: typeof ToDoController;
}

const Layout: m.Comp<{}, State> = {
  controller: ToDoController,
  view({ children }) {
    return m(
      '.layout',
      m(Header),
      m(Navigation, {
        completedCount: this.controller.completed().length,
        notCompletedCount: this.controller.notCompleted().length,
        trashedCount: this.controller.trashed().length,
      }),
      m('main.app-main', children),
    );
  },
};

export default Layout;
