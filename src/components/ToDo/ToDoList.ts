import m from 'mithril';
import ToDoListItem from './ToDo';

interface Attr {
  toDos: ToDo[];
}

const ToDoList: m.Component<Attr> = {
  view({ attrs: { toDos } }) {
    return m(
      'ol.to-do-list',
      toDos.map(toDo => {
        return m(ToDoListItem, { toDo, key: toDo.id });
      }),
    );
  },
};

export default ToDoList;
