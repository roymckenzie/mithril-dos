import m from 'mithril';
import trashIcon from '../../../public/trash.svg?raw';
import bars3 from '../../../public/bars-3.svg?raw';
import bars4 from '../../../public/bars-4.svg?raw';

const IconMap = {
  trash: trashIcon,
  'bars-3': bars3,
  'bars-4': bars4,
};

type IconName = keyof typeof IconMap;

export default (name: IconName, attributes: m.Attributes = {}) => {
  return m('span.icon', attributes, m.trust(IconMap[name]));
};
