<template>
<div class="select-group" :class="{open: show}" ref="container" :disabled="disabled" >
  <span class="select-toggle" :class="{
      'selblue': value == displayColor.blue && isconfirm,
      'selyellow': value == displayColor.yellow && isconfirm,
      'seldisabled': value == displayColor.disabled && isconfirm,
      'border1px': border
    }" ref="trigger">
    {{selectItem && selectItem[keyname]}}
    <i class="bicon" v-show="!show">&#xe613;</i>
    <i class="bicon" v-show="show">&#xe611;</i>
  </span >
  <ul class="select-menu" v-show="!disabled && show" :class="{'select-top': direction === 'top'}" :style="{'width': width}">
    <template v-if="options.length" >
      <li v-if="search" class="dselect-search">
        <input type="text" v-model="iFilterKey" :placeholder="placeholder">
        <i class="bicon magnifier">&#xe61d;</i>
      </li>
      <li v-for="option in iFilteredData" :id="option.id || option[idName]" :class="{'active': isSelected(option)}">
        <a @click="select($event, (option.id || option[idName]))">
          {{ option.label || option[keyname] }}
        </a>
      </li>
      <li class="no-data" v-if="search && !iFilteredData.length">无匹配数据</li>
    </template>
  </ul>
  <confirmmodal v-if="isconfirm" :title="confirmModal.title" :show.sync="confirmModal.show" :type="confirmModal.type" :ok-text="confirmModal.oktext"  :desc="confirmModal.desc" :on-ok="confirmModal.action"></confirmmodal>
</div>

</template>

<script>
/* eslint-disable no-extra-boolean-cast */
import EventListener from '../utils/EventListener';
import coerceBoolean from '../utils/coerceBoolean';
import messagebox from 'components/basic/MessageBox';
import confirmmodal from '../layout/ConfirmModal';

export default {
  components: {
    confirmmodal
  },
  props: {
    placeholder: {
      type: String
    },
    trigger: {
      type: String,
      default: 'hover'
    },
    idName: {
      type: String,
      default: 'id'
    },
    isconfirm: {
      default: false
    },
    confirmparams: {
      default: null
    },
    confirmurl: {
      default: null
    },
    activitytype: {
      default: null
    },
    keyname: {
      type: String,
      default: 'label'
    },
    value: {},
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    onSelect: {
      type: Function,
      default: () => {}
    },
    search: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    disabled: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    confirm: {
      type: Object,
      default: null
    },
    requestParams: {
      type: Object,
      default: {}
    },
    method: {
      type: String,
      default: 'put'
    },
    selectval: {
      default: null
    },
    displayColor: {
      type: Object,
      default: {
        blue: 1,
        yellow: 2,
        disabled: 3
      }
    },
    direction: {
      type: String,
      default: 'bottom'
    },
    // 是否选择边框
    border: {
      type: Boolean,
      default: false
    },
    // select 宽度
    width: {
      type: String,
      default: '160px'
    }
  },
  data() {
    return {
      iFilterKey: '',
      show: false,
      confirmModal: {
        show: false,
        title: this.confirm ? this.confirm.title : '状态',
        desc: this.confirm ? this.confirm.desc : '确认修改状态？',
        type: this.confirm ? this.confirm.type : 'delete',
        action: this.confirm && this.confirm.action ? this.confirm.action : this.clickSelect
      }
    };
  },
  watch: {
    'value': function(val) {
      this.$emit('update:value', val);
    }
  },
  mounted() {
    const triger = this.$refs.trigger;
    const container = this.$refs.container;
    if (this.trigger === 'hover') {
      this._mouseenterEvent = EventListener.listen(triger, 'mouseenter', (e) => {
        this.show = true;
      });
      this._mouseleaveEvent = EventListener.listen(container, 'mouseleave', (e) => {
        this.show = false;
      });
    } else {
      let that = this;
      this._clickEvent = triger.addEventListener('click', function(event) {
        that.toggleDropdown(event);
      }, false);
      this._documentEvent = EventListener.listen(document, 'click', (e) => {
        if (e.target.className === 'dselect-search') {
          return false;
        }
        this.show = false;
      });
    }
  },
  computed: {
    selectItem(item) {
      if (this.value) {
        let item = this.options.filter((item) => {
          return (item.id || item[this.idName]) === this.value;
        });
        return item && item[0];
      } else {
        let first = this.options[0];
        this.value = this.idName ? (first && first[this.idName]) : (first && first.id);
        return first;
      }
    },
    'iFilteredData': function() {
      let filterKey = this.iFilterKey && this.iFilterKey.toLowerCase();
      let data = this.options;
      data = data.filter(function(row) {
        return Object.keys(row).some(function(key) {
          if (key === 'imgUrl') {
            return false;
          } else {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
          }
        });
      });
      return data;
    }
  },
  methods: {
    /**
     * 选中某个值
     */
    select(e, v) {
      if (this.isconfirm) {
        this.selectval = v;
        this.confirmModal.selectval = v;
        this.confirmModal.show = true;
        // this.confirm.show = true;
        // this.confirmModal.selectval = v;
        return;
      }
      this.value = v;
      this.toggleDropdown(e);
      this.onSelect(v);
    },
    clickSelect() {
      var params;
      if (this.requestParams) {
        params = this.requestParams;
      } else {
        params = {
          id: this.confirmparams,
          activityType: this.activitytype,
          val: this.confirmModal.selectval
        };
      }
      this.$http[this.method](this.confirmurl, params).then((res) => {
        res = res.json();
        if (res.success) {
          this.confirmModal.show = false;
          this.value = this.confirmModal.selectval;
          this.onSelect(this.confirmModal.selectval);
          this.$dispatch('changeSuccess');
          messagebox({
            title: '修改状态成功!',
            type: 'success'
          });
        } else {
          messagebox({
            title: res.message || '修改状态失败!',
            type: 'error'
          });
        }
      }, (res) => {
        // error callback
        messagebox({
          title: res.message || '网络错误！',
          type: 'error'
        });
      });
      this.toggleDropdown();
    },
    /**
     * 当前是否选中
     */
    isSelected(option) {
      if (!this.value) {
        return this.options.indexOf(option) === 0;
      }
      return this.value === (option.id || option[this.idName]);
    },
    /**
     * 切换下拉框
     */
    toggleDropdown(e) {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      this.show = !this.show;
    }
  },
  beforeDestory() {
    if (this._mouseenterEvent) {
      this._mouseenterEvent.remove();
      this._mouseleaveEvent.remove();
    }
    if (this._clickEvent) {
      this._clickEvent.remove();
    }
  }
};
</script>
<style lang="less">
  .border1px {
    border: 1px solid #ccc;
    width: 160px;
    padding: 0 26px 0 8px;
    text-align: left;
    .bicon{
      position: absolute;
      right: 11px;
    }
  }
  .select-group{
    position: relative;
  }
  .select-group .selblue {
    background-color: #59ace2;
    color: #fff !important;
  }
  .select-group .selyellow {
    background-color: #f1c500;
  }
  .select-group .seldisabled {
    background-color: #bec3c7;
  }
  .select-group .btn-default {
    color: #444 !important;
    text-decoration: none;
  }
  .select-top{
    bottom: 34px;
    left: 0;
    top: auto;
  }
  .select-menu{
    font-size: 12px;
    overflow-x: hidden;
    .no-data{
      height: 34px;
      line-height: 34px;
      font-size: 12px;
      padding-left: 32px;
    }
  }
  .dselect-search{
    position: relative;
    .bicon{
      &.magnifier{
        position: absolute;
        color: #dddddd;
        font-size: 12px;
        top: 8px;
        left: 270px;
      }
    }
    
    input{
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      padding: 0 16px;
      padding-right: 24px;
      width: 100%;
      border: 1px solid #fff;
      border-radius: 2px;
      outline:none;
      color: #666;
      font-size: 12px;
    }
  }
  // placeholder颜色
  ::-webkit-input-placeholder {
    color: #dddddd;
  }
  ::-moz-placeholder {
    color: #dddddd;
  }
  :-ms-input-placeholder {
    color: #dddddd;
  }
  :-moz-placeholder {
    color: #dddddd;
  }
</style>
