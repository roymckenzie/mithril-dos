import m from 'mithril';
import ToDoListItem from './ToDoListItem';

interface Attr {
  toDoItems: ToDoItem[];
}

const ToDoList: m.Component<Attr> = {
  view: ({ attrs: { toDoItems }}) => {
    return m('ul.to-do-list',
      toDoItems.map(toDoItem => {
        return m(ToDoListItem, { toDoItem, key: toDoItem.id });
      })
    );
  }
}

export default ToDoList;
