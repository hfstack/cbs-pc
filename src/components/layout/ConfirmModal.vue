<template>
  <modal :show.sync="show" :title="title" effect="fade" :type="type"  class="confirm" width="416">
    <template slot="modal-header">
      <div class="modal-header">
        <i class="bicon warn" v-if="type === 'warn'">&#xe695;</i>
        <i class="bicon success" v-if="type === 'success'">&#xe60b;</i>
        <i class="bicon error" v-if="type === 'error'">&#xe60c;</i>
        <h4 class="modal-title">
          <slot name="title">
            {{title}}
          </slot>
        </h4>
      </div>
    </template>
    <template slot="modal-body">
      <div class="modal-body">
        <template v-if="title">
          <p>
            {{desc}}
          </p>
        </template>
        <template v-else>
          <p class="body-center"><i class="bicon warn">&#xe695;</i>{{desc}}</p>
        </template>
      </div>
    </template>
    <template slot="modal-footer">
      <div class="modal-footer clearfix">
        <a class="btn btn-blue btn-default fr btn-ok"  @click="onOk">{{ okText }}</a>
        <a class="btn btn-default fr mr15 btn-lg" @click="close" >{{ cancelText }}</a>
      </div>
    </template>
  </modal>
</template>

<script>
import coerceBoolean from 'components/utils/coerceBoolean';

export default {

  props: {
    title: {
      required: true,
      type: String
    },
    desc: {
      required: true,
      type: String
    },
    type: {
      type: String
    },
    onOk: {
      type: Function,
      default: function() {
        return null
      }
    },
    okText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    show: {
      required: true,
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    warn: {
      type: String,
      default: 'warn'
    },
    onClose: {
      type: Function,
      default: () => {}
    }
  },
  watch: {
    show: function(val) {
      this.$emit('update:show', val);
    }
  },
  methods: {
    close() {
      this.show = false;
      this.$emit('update:show', false);
      this.onClose();
    }
  }
};
</script>
<style lang="less">
  .people-count{
    color:#29b6b0;
  }
  .confirm{
    .bicon{
      font-size: 20px;
      margin-right: 16px;
    }
    .warn{
      color: #ffaa00;
    }
    .success{
      color: #87d068;
    }
    .error{
      color: #ff5500;
    }
    .modal-header{
      border: none;
      height: 22px;
      line-height: 22px;
      font-size: 14px;
      color: #666666;
      padding: 0;
      .modal-title{
        display: inline-block;
      }
    }
    .modal-content{
      box-sizing: border-box;
      padding: 30px ;
      height: 180px;
    }
    .modal-footer{
      border: none;
      position: absolute;
      right: 10px;
      bottom: 10px;
      padding: 0;
    }
    .modal-body{
      margin-top: 8px;
      box-sizing: border-box;
      padding: 0 40px;
      height: 86px;
      .body-center{
        text-align: center;
        font-size: 14px;
        color: #666666;
        padding-top: 20px;
      }
    }
    .btn-ok{
      height: 32px;
      line-height: 32px;
      padding: 0 26px;
    }
  }
</style>
