import Headers from 'components/layout/Header.vue';
import InvalidTip from 'components/basic/InvalidTip';
import DSelect from 'components/layout/DSelect';
const Components = {
  Headers,
  InvalidTip,
  DSelect
};

export default function(Vue) {
  var keys = Object.keys(Components);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let component = Components[key];
    Vue.component(component.name || key.toLowerCase(), Components[key]);
  }
}
