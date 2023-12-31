import m from 'mithril';
import ToDoController from '../../controllers/ToDoController';

interface Attr {
  notCompletedCount: number;
  completedCount: number;
  trashedCount: number;
}

const dragEvents: m.Attributes = {
  ondragover(event: DragEvent) {
    event.preventDefault();
  },
  ondragenter(event: DragEvent & { target: HTMLAnchorElement }) {
    event.target.classList.add('dragover');
  },
  ondragleave(event: DragEvent & { target: HTMLAnchorElement }) {
    event.target.classList.remove('dragover');
  },
  ondrop(event: DragEvent & { target: HTMLAnchorElement }) {
    event.target.classList.remove('dragover');
    if (!event.dataTransfer) return;
    const toDoId = event.dataTransfer.getData('id');

    if (!toDoId) return;

    switch (event.target.id) {
      case 'home':
        ToDoController.unComplete(toDoId);
        ToDoController.unTrash(toDoId);
        break;
      case 'completed':
        ToDoController.complete(toDoId);
        ToDoController.unTrash(toDoId);
        break;
      case 'trashed':
        ToDoController.trash(toDoId);
        break;
    }
  },
};

function Navigation(): m.Component<Attr> {
  return {
    view({ attrs: { notCompletedCount, completedCount, trashedCount } }) {
      return m(
        'nav.app-navigation',
        m(
          'ul',
          m(
            'li',
            m(
              m.route.Link,
              {
                id: 'home',
                href: '/to-dos',
                class: m.route.get() === '/to-dos' ? 'active' : null,
                ...dragEvents,
              },
              'To-do',
              m('span.count', notCompletedCount),
            ),
          ),
          m(
            'li',
            m(
              m.route.Link,
              {
                id: 'completed',
                href: '/to-dos/completed',
                class: m.route.get() === '/to-dos/completed' ? 'active' : null,
                ...dragEvents,
              },
              'Completed',
              m('span.count', completedCount),
            ),
          ),
          m(
            'li',
            m(
              m.route.Link,
              {
                id: 'trashed',
                href: '/to-dos/trashed',
                class: m.route.get() === '/to-dos/trashed' ? 'active' : null,
                ...dragEvents,
              },
              'Trashed',
              m('span.count', trashedCount),
            ),
          ),
        ),
      );
    },
  };
}

export default Navigation;
