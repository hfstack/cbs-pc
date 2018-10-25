<template>
  <div>
    <p class="valid" :class="[additionalClass]" v-if="show && type === 'success'">
      <!-- <i class="iconhandle">&#xe610;</i> -->
      <slot></slot>
    </p>
    <p class="invalid" :class="[additionalClass]" v-else-if="show && type === 'fail'">
      <!-- <i class="iconhandle">&#xe62a;</i> -->
      <slot></slot>
    </p>
  </div>
</template>

<script>
import coerceBoolean from '../utils/coerceBoolean.js';

export default {
  props: {
    show: {
      coerce: coerceBoolean,
      default: false
    },
    additionalClass: {
      default: ''
    },
    type: {
      default: 'fail'
    }
  }
};
</script>
<style lang="less">
  .invalid{
    color: #fa4535;
    font-size: 12px;
    margin-top: 8px;

    .iconhandle {
      font-size: 14px;
    }
  }
</style>
