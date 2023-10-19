import m from 'mithril'
import Controller from '../../controllers/ToDoItemController'

interface Attr {
  notCompletedCount: number;
  completedCount: number;
  trashedCount: number;
}

const dragEvents: m.Attributes = {
  ondragover: (event: DragEvent) => {
    event.preventDefault();
  },
  ondragenter: (event: DragEvent & { target: HTMLAnchorElement }) => {
    event.target.classList.add('dragged-to');
  },
  ondragleave: (event: DragEvent & { target: HTMLAnchorElement }) => {
    event.target.classList.remove('dragged-to');
  },
  ondrop: (event: DragEvent & { target: HTMLAnchorElement }) => {
    event.target.classList.remove('dragged-to');
    const toDoId = event.dataTransfer?.getData('id');

    if (!toDoId) return;

    switch (event.target.id) {
      case 'home':
        Controller.unComplete(toDoId);
        Controller.unTrash(toDoId);
        break;
      case 'completed':
        Controller.complete(toDoId);
        Controller.unTrash(toDoId);
        break;
      case 'trashed':
        Controller.trash(toDoId);
        break;
    }
  }
}

const Navigation: m.Comp<Attr> = {
  view: ({ attrs: { notCompletedCount, completedCount, trashedCount  }}) => {
    return m('nav.app-navigation',
      m('ul',
        m('li', m(m.route.Link, { id: 'home', href: '/to-dos', class: m.route.get() === '/to-dos' ? 'active' : null, ...dragEvents }, 'To-do', m('span.count', notCompletedCount))),
        m('li', m(m.route.Link, { id: 'completed', href: '/to-dos/completed', class: m.route.get() === '/to-dos/completed' ? 'active' : null, ...dragEvents  }, 'Completed', m('span.count', completedCount))),
        m('li', m(m.route.Link, { id: 'trashed', href: '/to-dos/trashed', class: m.route.get() === '/to-dos/trashed' ? 'active' : null, ...dragEvents }, 'Trash', m('span.count', trashedCount)))
      )
    );
  }
}

export default Navigation;
