<template>
  <label class="checkbox-control"
    v-bind:class="{
      'active': checked
    }"
  >
    <input type="checkbox" :name="name" autocomplete="off" :checked="checked"/>
    <i class="icon iconfont" v-bind:class="{'bicon': checked}" @click="handleClick"><span>{{checked ? '&#xe625;' : ''}}</span></i>
    <slot></slot>
  </label>
</template>

<script>
import coerceBoolean from '../utils/coerceBoolean.js';

export default {
  props: {
    checked: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    disabled: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    name: {
      type: String
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        // this.$emit('update:checked',  this.checked)
        this.$emit('update:checked',  !this.checked)
      }
      this.onChange(this.checked);
    }
  }
};
</script>
