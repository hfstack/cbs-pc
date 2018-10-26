<template>
  <div class="countdown-container" :style="{'color': color}" v-show="start" :msgPartern="msgPartern" :endTime="endTime" :callback="callback" :endText="endText">
    <template  v-if="format === 'dd-hh-mm-ss'"> 
      <span class="c-b c-d" v-if="data.day > 0">{{data.day}} days</span><span class="c-b">{{data.hour}}</span><span class="c-a">:</span><span class="c-b">{{data.min}}</span><span class="c-a">:</span><span class="c-b">{{data.sec}}</span><span class="label-end"></span>
    </template>
    <template v-if="format === 'hh-mm-ss-mm'">
     <span class="c-b">{{data.hour}}</span><span class="c-a">:</span><span class="c-b">{{data.min}}</span><span class="c-a">:</span><span class="c-b">{{data.sec}}</span><span class="label-end">{{msgPartern.endWord}}</span><span class="c-a">:</span><span>{{data.ms}}</span>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: '',
      data: {},
      start: false
    }
  },
  props: {
    endTime: {
      default: ''
    },
    startTime: {
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    msgPartern: {
      type: Object,
      default: () => {
        return {
          startWord: '',
          endWord: ''
        }
      }
    },
    endText: {
      type: String,
      default: ''
    },
    callback: {
      type: Function,
      default: () => {}
    },
    format: {
      type: String,
      default: 'dd-hh-mm-ss'
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (!this.endTime) {
      this.data = {
        day: '-',
        hour: '-',
        min: '-',
        sec: '-',
        ms: '-'
      }
    } else {
      this.countdown(this.endTime);
    }
  },
  watch: {
    endTime: function(val) {
      this.countdown(val);
    }
  },
  methods: {
    countdown(timestamp) {
      let self = this;
      let ms = 9;
      let timer = setInterval(function() {
        self.start = true;
        let nowTime = new Date();
        let endTime = new Date(timestamp);
        let t = endTime.getTime() - nowTime.getTime();
        if (t > 0) {
          let day = Math.floor(t / 86400000);
          let hour = Math.floor((t / 3600000) % 24);
          let min = Math.floor((t / 60000) % 60);
          let sec = Math.floor((t / 1000) % 60);
          // day = day < 10 ? '0' + day : day;
          hour = hour < 10 ? '0' + hour : hour;
          min = min < 10 ? '0' + min : min;
          sec = sec < 10 ? '0' + sec : sec;
          ms = ms > 0 ? ms : 9;
          ms--;
          self.data = {
            day: day,
            hour: hour,
            min: min,
            sec: sec,
            ms: '0' + ms
          };
          if (self.data.min === '00') {
            self.data.ms = '00';
          }
        } else {
          clearInterval(timer);
          self.content = self.endText;
          self._callback();
        }
      }, 100);
    },
    _callback() {
      if (this.callback && this.callback instanceof Function) {
        this.callback(...this);
      }
    }
  }
}
</script>
<style lang="less">
@import "~less/tool.less";
 .countdown-container {
    display: inline-block;
    color: #e92626;
    font-size: 22/@rem;
    // margin-left: -8/@rem;
    span{
      width: 36/@rem;
      height: 40/@rem;
      line-height: 40/@rem;
      border-radius: 6/@rem;
      font-size: 22/@rem;
      padding: 0 5/@rem;
      &.label{
        display: none;
      }
      &.label-end{
        display: none;
      }
    }
    .c-b{
      background: #fff;
    }
    .c-a{
      color: #fff;
      margin: 0 2/@rem;
    }
    .c-d{
      margin-right: 20/@rem;
    }
  }
</style>


