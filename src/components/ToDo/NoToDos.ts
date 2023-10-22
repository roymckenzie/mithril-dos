import m from 'mithril';

function NoToDos(): m.Component {
  return {
    view({ children }) {
      return m('aside[class=no-to-dos]', children);
    },
  };
}

export default NoToDos;
