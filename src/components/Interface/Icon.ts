import m from 'mithril';
import trashIcon from '/trash.svg?raw';
import bars4 from '/bars-4.svg?raw';

const IconMap = {
  trash: trashIcon,
  'bars-4': bars4,
};

type IconName = keyof typeof IconMap;

export default (name: IconName, attributes: m.Attributes = {}) => {
  return m('span.icon', attributes, m.trust(IconMap[name]));
};
