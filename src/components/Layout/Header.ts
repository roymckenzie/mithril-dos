import m from 'mithril';

function Header(): m.Component {
  return {
    view() {
      return m(
        'header.app-header',
        m(
          'hgroup',
          m('h1', 'Mithril-Dos'),
          m(
            'p',
            'The to-do app built with ',
            m('a[href=https://mithril.js.org/][target=_blank][rel=external]', 'Mithril'),
            '.',
          ),
        ),
      );
    },
  };
}

export default Header;
