import m from 'mithril';
import ToDoController from '../../controllers/ToDoController';
import Header from './Header';
import Navigation from './Navigation';

function Layout(): m.Component {
  return {
    view({ children }) {
      return m(
        '.layout',
        m(Header),
        m(Navigation, {
          completedCount: ToDoController.completed().length,
          notCompletedCount: ToDoController.notCompleted().length,
          trashedCount: ToDoController.trashed().length,
        }),
        m('main.app-main', children),
      );
    },
  };
}

export default Layout;
