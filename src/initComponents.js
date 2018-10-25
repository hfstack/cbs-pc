import Headers from 'components/layout/Header.vue';
import InvalidTip from 'components/basic/InvalidTip';
const Components = {
  Headers,
  InvalidTip
};

export default function(Vue) {
  var keys = Object.keys(Components);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let component = Components[key];
    Vue.component(component.name || key.toLowerCase(), Components[key]);
  }
}
