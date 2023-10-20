import m from 'mithril';
import trashIcon from '../../../public/trash.svg?raw';

const IconMap = {
  trash: trashIcon,
};

type IconName = keyof typeof IconMap;

export default (name: IconName, classNames?: string) => {
  return m('span.icon', { class: classNames }, m.trust(IconMap[name]));
};
