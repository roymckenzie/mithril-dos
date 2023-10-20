import m from 'mithril';

const NoToDos: m.Comp = {
  view: ({ children }) => {
    return m('aside[class=no-to-dos]', children);
  },
};

export default NoToDos;
