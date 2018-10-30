<template>
  <div role="dialog"
    v-bind:class="{
    'modal': true,
    'fade': effect === 'fade',
    'message-box': isMessage,
    'delete': type === 'delete'
    }"
    ref="modal"
    >
    <div class="modal-dialog" role="document" v-bind:style="{width: optionalWidth}">
      <div class="modal-content">
        <slot name="modal-header" v-if="!isMessage">
          <div class="modal-header">
            <i class="iconhandle close" @click="close">&#xe63f;</i>
            <h4 class="modal-title" >
              <slot name="title">
                {{title}}
              </slot>
            </h4>
          </div>
        </slot>
        <slot name="modal-body">
          <div class="modal-body">
            <template v-if="isMessage">
              <p v-if="messageType === 'success'">
                <i class="bicon success">&#xe602;</i>
                {{title}}
              </p>
              <p v-else>
                <i class="bicon error">&#xe653;</i>
                {{title}}
              </p>
            </template>
          </div>
        </slot>
        <slot name="modal-footer" v-if="footer">
          <div class="modal-footer">
            <a class="btn btn-green btn-pd-lg mr15" v-bind:class="{'btn-orange': type === 'delete'}" @click="onOk">{{ okText }}</a>
            <a class="btn btn-default btn-pd-lg" @click="close">{{ cancelText }}</a>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import getScrollBarWidth from '../utils/getScrollBarWidth.js'
import EventListener from '../utils/EventListener.js'
import coerceBoolean from '../utils/coerceBoolean.js'
export default {
  props: {
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    title: {
      type: String,
      default: ''
    },
    show: {
      require: true,
      type: Boolean,
      coerce: coerceBoolean,
      twoWay: true
    },
    width: {
      default: 300
    },
    onOk: {
      type: Function,
      default () {}
    },
    effect: {
      type: String,
      default: 'fade'
    },
    backdrop: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    footer: {
      type: Boolean,
      coerce: coerceBoolean,
      default: true
    },
    isMessage: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    messageType: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    onClose: {
      default: null
    }
  },
  mounted () {
    this.$watch('show', (val) => {
      const el = this.$refs.modal
      const body = document.body
      const scrollBarWidth = getScrollBarWidth()
      const contentBox = el.querySelector('.modal-content')
      const dialogBox = el.querySelector('.modal-dialog')
      if (val) {
        contentBox.focus()
        el.style.display = 'block'
        setTimeout(() => {
          el.classList.add('in')
          setTimeout(() => {
            const dialogHeight = dialogBox.offsetHeight
            const dialogWidth = dialogBox.offsetWidth
            const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            if (dialogHeight > windowHeight) {
              dialogBox.style.top = '50px'
            } else {
              dialogBox.style.top = ((windowHeight - dialogHeight) / 2) - 50 + 'px'
            }
            if (this.isMessage) {
              dialogBox.style.left = ((windowWidth) / 2) + 'px'
            } else {
              dialogBox.style.left = ((windowWidth - dialogWidth) / 2) + 'px'
            }
          }, 0)
        }, 0)
        body.classList.add('modal-open')
        if (scrollBarWidth !== 0) {
          body.style.paddingRight = scrollBarWidth + 'px'
        }
        if (this.backdrop) {
          this._blurModalContentEvent = EventListener.listen(this.$refs.modal, 'click', (e) => {
            if (e.target === el) {
              if (this.onClose) {
                this.onClose()
                return
              } else {
                this.$emit('update:show', false)
                // this.show = false
              }
            }
          })
        }
      } else {
        if (this._blurModalContentEvent) this._blurModalContentEvent.remove()
        el.classList.remove('in')
        setTimeout(() => {
          el.style.display = 'none'
          body.classList.remove('modal-open')
          body.style.paddingRight = '0'
        }, 30)
      }
    }, { immediate: true })
  },
  computed: {
    optionalWidth () {
      // 兼容写法 es6
      Number.isInteger = Number.isInteger || function(value) {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
      };

      if (this.width === null) {
        return null
      } else if (Number.isInteger(+this.width)) {
        return this.width + 'px'
      }
      return this.width
    }
  },
  methods: {
    close () {
      if (this.onClose) {
        this.onClose()
        return
      }
      this.$emit('update:show', false)
      // this.show = false
    }
  },
  destroyed () {
    if (this._blurModalContentEvent) {
      this._blurModalContentEvent.remove()
    }
    document.body.classList.remove('in')
    document.body.classList.remove('modal-open')
    document.body.style.paddingRight = '0'
  }
}
</script>
