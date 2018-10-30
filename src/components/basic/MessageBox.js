import Vue from 'vue';
import getScrollBarWidth from '../utils/getScrollBarWidth.js';
import Modal from './Modal.vue';
var MessageBoxConstructor = Vue.extend(Modal);
var MessageBox = function(options) {
  const body = document.body;
  var instance = new MessageBoxConstructor({
    el: document.createElement('div'),
    propsData: {
      title: options.title,
      messageType: options.type,
      footer: false,
      header: false,
      isMessage: true,
      show: false
    }
  });
  instance.$watch('show', function(val) {
    const scrollBarWidth = getScrollBarWidth();
    if (val) {
      this.show = true;
      body.classList.add('modal-open');
      if (scrollBarWidth !== 0) {
        body.style.paddingRight = scrollBarWidth + 'px';
      }
    }
    setTimeout(() => {
      this.$el.classList.remove('modal-open');
      this.$el.style.paddingRight = '0';
      this.show = false;
      this.$nextTick(function() {
        this.$el.remove();
      });
    }, options.time || 1000);
  });
  setTimeout(function() {
    instance.show = true;
    body.appendChild(instance.$el)
  }, 200);
};

export default MessageBox;
