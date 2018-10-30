<template>
  <div class="datepicker">
    <input class="form-control datepicker-input" :class="{'with-reset-button': showResetButton, 'form-disabled': disabled}" type="text"
           :style="{width:width}"
           @click="inputClick"
           v-model="value" readonly :placeholder="placeholder" />
    <i class="bicon" :class="{ 'bicon-has-value': value}" @click="inputClick">&#xe617;</i>
    <div class="datepicker-popup" v-show="displayDayView">
      <div class="datepicker-inner">
        <div class="datepicker-body">
          <div class="datepicker-ctrl">
            <span class="month-btn datepicker-preBtn iconfont" @click="preNextMonthClick(0)">&#xe62f;</span>
            <span class="month-btn datepicker-nextBtn iconfont" @click="preNextMonthClick(1)">&#xe62e;</span>
            <p @click="switchMonthView">{{stringifyDayHeader(currDate)}}</p>
          </div>
          <div class="datepicker-weekRange">
            <span v-for="w in text.daysOfWeek">{{w}}</span>
          </div>
          <div class="datepicker-dateRange">
            <span v-for="d in dateRange" :class="d.sclass" @click="daySelect(d.date, $event)">{{d.text}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="datepicker-popup" v-show="displayMonthView">
      <div class="datepicker-inner">
        <div class="datepicker-body">
          <div class="datepicker-ctrl">
            <span class="month-btn datepicker-preBtn iconfont" @click="preNextYearClick(0)">&#xe62f;</span>
            <span class="month-btn datepicker-nextBtn iconfont" @click="preNextYearClick(1)">&#xe62e;</span>
            <p @click="switchDecadeView">{{stringifyYearHeader(currDate)}}</p>
          </div>
          <div class="datepicker-monthRange">
            <template v-for="(m, index) in text.months">
              <span :class="{'datepicker-dateRange-item-active': value &&
                  (text.months[parse(value).getMonth()] === m) &&
                  currDate.getFullYear() === parse(value).getFullYear()}"
                      @click="monthSelect(index)"
              >{{m.substr(0,3)}}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="datepicker-popup" v-show="displayYearView">
      <div class="datepicker-inner">
        <div class="datepicker-body">
          <div class="datepicker-ctrl">
            <span class="month-btn datepicker-preBtn iconfont" @click="preNextDecadeClick(0)">&#xe62f;</span>
            <span class="month-btn datepicker-nextBtn iconfont" @click="preNextDecadeClick(1)">&#xe62e;</span>
            <p>{{stringifyDecadeHeader(currDate)}}</p>
          </div>
          <div class="datepicker-monthRange decadeRange">
            <template v-for="decade in decadeRange">
              <span :class="{'datepicker-dateRange-item-active': value &&
                  parse(value).getFullYear() === decade.text}"
                    @click.stop="yearSelect(decade.text)"
              >{{decade.text}}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="datepicker-popup" v-show="displayTimeView">
      <div class="datepicker-inner">
        <div class="datepicker-body">
          <div class="datepicker-ctrl">
            <!-- <span class="month-btn datepicker-preBtn iconhandle" @click="preNextDayClick(0)">&#xe642;</span>
            <span class="month-btn datepicker-nextBtn iconhandle" @click="preNextDayClick(1)">&#xe643;</span> -->
            <p @click="switchDayView">{{stringifyTimeHeader(tempDate)}}</p>
          </div>
          <div class="datepicker-timeRange">
            <template v-for="time in timeRange">
              <span :class="time.sclass" @click.stop="timeSelect(time.text, $event)">{{time.text}}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="datepicker-popup" v-show="displayMinutesView">
      <div class="datepicker-inner">
        <div class="datepicker-body">
          <div class="datepicker-ctrl">
            <!-- <span class="month-btn datepicker-preBtn iconhandle" @click="preNextDayClick(0)">&#xe642;</span>
            <span class="month-btn datepicker-nextBtn iconhandle" @click="preNextDayClick(1)">&#xe643;</span> -->
            <p @click="switchDayView">{{stringifyTimeHeader(tempDate)}}</p>
          </div>
          <div class="datepicker-timeRange">
            <template v-for="time in minuteRange">
              <span :class="time.sclass" @click.stop="minuteSelect(time.text, $event)">{{time.text}}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="datepicker-popup" v-show="displaySecondView">
      <div class="datepicker-inner">
        <div class="datepicker-body">
          <div class="datepicker-ctrl">
            <!-- <span class="month-btn datepicker-preBtn iconhandle" @click="preNextDayClick(0)">&#xe642;</span>
            <span class="month-btn datepicker-nextBtn iconhandle" @click="preNextDayClick(1)">&#xe643;</span> -->
            <p @click="switchDayView">{{stringifyTimeHeader(tempDate)}}</p>
          </div>
          <div class="datepicker-timeRange">
            <template v-for="time in secondRange">
              <span :class="time.sclass" @click.stop="secondSelect(time.text, $event)">{{time.text}}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import EventListener from '../utils/EventListener.js'
import translations from './translations.js'
import coerceBoolean from '../utils/coerceBoolean.js'
import getCurDate from '../utils/getCurDate.js'
import { isSameDay } from '../utils/dateUtils.js'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    format: {
      default: 'yyyy-MM-dd'
    },
    disabledDate: {
      type: Function,
      default () {
      }
    },
    width: {
      type: String,
      default: '200px'
    },
    showResetButton: {
      type: Boolean,
      default: false
    },
    lang: {
      type: String,
      default: 'cn'
    },
    placeholder: {
      type: String
    },
    rangeflag: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    onChange: {
      default: null
    },
    time: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    disabled: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    hms: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    }
  },
  mounted () {
    // this.$dispatch('child-created', this)
    this.currDate = this.parse(this.value) || this.parse(new Date())
    this._closeEvent = EventListener.listen(window, 'click', (e) => {
    if (!this.$el.contains(e.target)) this.close()
  })
  },
  beforeDestroy () {
    if (this._closeEvent) this._closeEvent.remove()
  },
  data () {
    return {
      currDate: new Date(),
      timeRange: [],
      dateRange: [],
      minuteRange: [
        {
          text: '00分',
          sclass: ''
        },
        {
          text: '15分',
          sclass: ''
        },
        {
          text: '45分',
          sclass: ''
        },
        {
          text: '59分',
          sclass: ''
        }
      ],
      secondRange: [
        {
          text: '00秒',
          sclass: ''
        },
        {
          text: '59秒',
          sclass: ''
        }
      ],
      decadeRange: [],
      tempDate: new Date(),
      displayTimeView: false,
      displayDayView: false,
      displayMonthView: false,
      displayYearView: false,
      displayMinutesView: false,
      displaySecondView: false
    }
  },
  watch: {
    currDate () {
      this.getDateRange()
    },
    tempDate () {
      this.getTimeRange()
    },
    value (val) {
      if (!val) {
        this.currDate = new Date();
        return;
      }
      this.$emit('update:value', val);
      this.currDate = this.parse(this.value)
    }
  },
  computed: {
    text () {
      return translations(this.lang)
    }
  },
  methods: {
    /**
     * 关闭
     */
    close () {
      this.displayDayView = this.displayTimeView = this.displayMonthView = this.displayYearView = this.displayMinutesView = this.displaySecondView = false;
    },

    /**
     * input框点击事件，唤起日历选择
     */
    inputClick () {
      if(this.disabled) return false;
      if (this.displayMonthView || this.displayYearView || this.displayMinutesView || this.displaySecondView) {
        this.displayDayView = false
      } else {
        this.displayDayView = !this.displayDayView
      }
    },

    /**
     * 十年选择向前或向后点击处理函数
     *
     * @param {Number} flag 标识：0->向前，1->向后
     */
    preNextDecadeClick (flag) {
      const year = this.currDate.getFullYear()
      const months = this.currDate.getMonth()
      const date = this.currDate.getDate()

      if (flag === 0) {
        this.currDate = new Date(year - 10, months, date)
      } else {
        this.currDate = new Date(year + 10, months, date)
      }
    },

    /**
     * 月向前或向后点击处理函数
     *
     * @param {Number} flag 标识：0->向前，1->向后
     */
    preNextMonthClick (flag) {
      const year = this.currDate.getFullYear()
      const month = this.currDate.getMonth()
      const date = this.currDate.getDate()

      if (flag === 0) {
        const preMonth = this.getYearMonth(year, month - 1)
        this.currDate = new Date(preMonth.year, preMonth.month, date)
      } else {
        const nextMonth = this.getYearMonth(year, month + 1)
        this.currDate = new Date(nextMonth.year, nextMonth.month, date)
      }
    },

    /**
     * 年向前或向后点击处理函数
     *
     * @param {Number} flag 标识：0->向前，1->向后
     */
    preNextYearClick (flag) {
      const year = this.currDate.getFullYear()
      const months = this.currDate.getMonth()
      const date = this.currDate.getDate()

      if (flag === 0) {
        this.currDate = new Date(year - 1, months, date)
      } else {
        this.currDate = new Date(year + 1, months, date)
      }
    },

    /**
     * 天向前或向后点击处理函数
     */
    // preNextDayClick (flag) {
    //   const year = this.currDate.getFullYear()
    //   const month = this.currDate.getMonth()
    //   const date = this.currDate.getDate()

    //   if (flag === 0) {
    //     const preDay = this.getMonthDay(year, month, date - 1)
    //     this.currDate = new Date(preDay.year, preDay.month, preDay.date)
    //   } else {
    //     const nextDay = this.getMonthDay(year, month, date + 1)
    //     this.currDate = new Date(nextDay.year, nextDay.month, nextDay.date)
    //   }
    // },

    /**
     * 年份选择处理函数，切换到月选择
     */
    yearSelect (year) {
      this.displayYearView = false
      this.displayMonthView = true
      this.currDate = new Date(year, this.currDate.getMonth(), this.currDate.getDate())
    },

    /**
     * 天选择处理函数
     *
     * @param {Date} date 日期
     * @param {Object} el 选择的元素
     */
    daySelect (date, event) {
      if (event.target.classList[0] === 'datepicker-item-disable') {
        return false
      } else if (this.time) {
        this.tempDate = date
        this.displayDayView = false
        this.displayTimeView = true
      } else {
        this.currDate = date
        this.value = this.stringify(this.currDate);
        this.displayDayView = false
      }
      if (this.rangeflag) {
        // this.onChange(date);
      }
    },
    /**
     * 时间选择
     */
    timeSelect (newTime, event) {
      if (event.target.classList[0] === 'datepicker-item-disable') {
        return false
      } else if (this.time && !this.hms) {
        newTime = newTime.split(':');
        this.tempDate.setHours(parseInt(newTime[0]))
        this.tempDate.setMinutes(newTime[1])
        if(newTime[2]) {
          this.tempDate.setSeconds(newTime[2])
        }
        this.currDate = this.tempDate
        this.value = this.stringify(this.currDate);
        this.displayTimeView = false;
      } else if(this.time && this.hms){
        this.displayTimeView = false
        this.displayMinutesView = true
        this.tempDate.setHours(parseInt(newTime))
        this.currDate = this.tempDate
        this.value = this.stringify(this.currDate);
      } else {
        // this.currDate = date
        // this.value = this.stringify(this.currDate)
        this.displayDayView = false
      }
      if (this.rangeflag) {
        this.onChange(newTime);
      }
      
    },
    /**
     * 分选择
     */
    minuteSelect(newTime, event) {
      if (event.target.classList[0] === 'datepicker-item-disable') {
        return false
      } else if (this.time && this.hms) {
        this.displayMinutesView = false
        this.displaySecondView= true
        this.tempDate.setMinutes(parseInt(newTime))
        this.currDate = this.tempDate
        this.value = this.stringify(this.currDate);
      } else {
        // this.currDate = date
        // this.value = this.stringify(this.currDate)
        this.displayDayView = false
      }
      if (this.rangeflag) {
        this.onChange(date);
      }
    },
    // timeSelect (time, event) {
    //   if (event.target.classList[0] === 'datepicker-item-disable') {
    //     return false
    //   }
    //   time = time.split(':');
    //   this.tempDate.setHours(parseInt(time[0]))
    //   this.tempDate.setMinutes(time[1])
    //   if(time[2]) {
    //     this.tempDate.setSeconds(time[2])
    //   }
    //   this.currDate = this.tempDate
    //   this.value = this.stringify(this.currDate);
    //   this.displayTimeView = false;
    // },
    secondSelect(newTime, event){
      if (event.target.classList[0] === 'datepicker-item-disable') {
        return false
      } else if (this.time && this.hms) {
        this.displaySecondView= false
        this.tempDate.setSeconds(parseInt(newTime))
        this.currDate = this.tempDate
        this.value = this.stringify(this.currDate);
      } else {
        // this.currDate = date
        // this.value = this.stringify(this.currDate)
        this.displayDayView = false
      }
      if (this.rangeflag) {
        this.onChange(date);
      }
    },
    /**
     * 切换到天选择
     */
    switchDayView () {
      this.displayTimeView = false
      this.displayDayView = true
    },

    /**
     * 切换到月份选择
     */
    switchMonthView () {
      this.displayDayView = false
      this.displayMonthView = true
    },

    /**
     * 切换到年份选择
     */
    switchDecadeView () {
      this.displayMonthView = false
      this.displayYearView = true
    },

    /**
     * 月份选择处理函数
     *
     * @param {Number} index 几月
     */
    monthSelect (index) {
      this.displayMonthView = false
      this.displayDayView = true
      this.currDate = new Date(this.currDate.getFullYear(), index, this.currDate.getDate())
    },

    /**
     * 获取年和月
     */
    getYearMonth (year, month) {
      if (month > 11) {
        year++
        month = 0
      } else if (month < 0) {
        year--
        month = 11
      }
      return {year: year, month: month}
    },

    // getMonthDay (year, month, day) {
    //   if (day === 0) {
    //     month--;
    //     let yearMonth = this.getYearMonth(year, month)
    //     day = this.dayCount(yearMonth.year, yearMonth.month)
    //     yearMonth.date = day
    //     return yearMonth
    //   } else if ()
    // },

    /**
     * 获取年份选择时的头部字符串，如`2010-2020`
     */
    stringifyDecadeHeader (date) {
      const yearStr = date.getFullYear().toString()
      const firstYearOfDecade = yearStr.substring(0, yearStr.length - 1) + 0
      const lastYearOfDecade = parseInt(firstYearOfDecade, 10) + 10
      return firstYearOfDecade + '-' + lastYearOfDecade
    },

    /**
     * 根据日期获取日历头部字符串，如`一月 2016`
     */
    stringifyDayHeader (date) {
      return this.text.months[date.getMonth()] + ' ' + date.getFullYear()
    },

    /**
     * 根据日期获取月份字符串，如`一月`
     */
    parseMonth (date) {
      return this.text.months[date.getMonth()]
    },

    /**
     * 日期转年份
     */
    stringifyYearHeader (date) {
      return date.getFullYear()
    },

    /**
     * 根据日期转换为天的字符串，如`20 八月 2016`
     */
    stringifyTimeHeader (date) {
      return ('0' + date.getDate()).slice(-2) + ' ' + this.text.months[date.getMonth()] + ' ' + date.getFullYear()
    },

    /**
     * 日期转字符串
     */
    stringify (date, format = this.format) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const monthName = this.parseMonth(date)
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds();
      return format
              .replace(/yyyy/g, year)
              .replace(/MMMM/g, monthName)
              .replace(/MMM/g, monthName.substring(0, 3))
              .replace(/MM/g, ('0' + month).slice(-2))
              .replace(/dd/g, ('0' + day).slice(-2))
              .replace(/yy/g, year)
              .replace(/M(?!a)/g, month)
              .replace(/d/g, day)
              .replace(/hh/g, ('0' + hour).slice(-2))
              .replace(/ii/g, ('0' + minute).slice(-2))
              .replace(/ss/g, ('0' + second).slice(-2))
    },

    /**
     * 将字符串解析为时间
     */
    parse (str) {
      if (!str) {
        return null;
      }
      if (str.length === 10 && (this.format === 'dd-MM-yyyy' || this.format === 'dd/MM/yyyy')) {
        str = str.substring(3, 5) + '-' + str.substring(0, 2) + '-' + str.substring(6, 10)
      }
      const date = new Date(str)
      return isNaN(date.getFullYear()) ? null : date
    },

    /**
     * 获取每月天数
     */
    getDayCount (year, month) {
      const dict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if (month === 1) {
        if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
          return 29
        }
      }
      return dict[month]
    },

    getTimeRange() {
      this.timeRange = []
      for (let i = 0; i < 24; i++) {
        let hour = ('0' + i).slice(-2);
        let now = new Date();
        let currHour = now.getHours();
        let sclass = ''
        if (isSameDay(this.tempDate, now) && currHour >= i) {
          sclass = 'datepicker-item-disable'
        }
        if (this.currDate.getHours() === i && isSameDay(this.tempDate, now) && currHour < i) {
          sclass = 'datepicker-dateRange-item-active'
        }
        this.timeRange.push({
          text: hour + ':00',
          sclass: sclass
        });
      }
    },
    /**
     * 获取时间区间
     */
    getDateRange () {
      this.dateRange = []
      this.decadeRange = []
      const time = {
        year: this.currDate.getFullYear(),
        month: this.currDate.getMonth(),
        day: this.currDate.getDate()
      }
      const yearStr = time.year.toString()
      const firstYearOfDecade = (yearStr.substring(0, yearStr.length - 1) + 0) - 1
      for (let i = 0; i < 12; i++) {
        this.decadeRange.push({
          text: firstYearOfDecade + i
        })
      }

      const currMonthFirstDay = new Date(time.year, time.month, 1)
      let firstDayWeek = currMonthFirstDay.getDay() + 1
      if (firstDayWeek === 0) {
        firstDayWeek = 7
      }
      const dayCount = this.getDayCount(time.year, time.month)
      if (firstDayWeek > 1) {
        const preMonth = this.getYearMonth(time.year, time.month - 1)
        const prevMonthDayCount = this.getDayCount(preMonth.year, preMonth.month)
        for (let i = 1; i < firstDayWeek; i++) {
          const dayText = prevMonthDayCount - firstDayWeek + i + 1
          let date = new Date(preMonth.year, preMonth.month, dayText)
          this.dateRange.push({
            text: dayText,
            date: date,
            sclass: this.disabledDate(date) ? 'datepicker-item-disable' : 'datepicker-item-gray'
          })
        }
      }

      for (let i = 1; i <= dayCount; i++) {
        const date = new Date(time.year, time.month, i)
        const week = date.getDay()
        let sclass = ''
        if (this.disabledDate(date)) {
          sclass = 'datepicker-item-disable'
        }
        if (i === time.day) {
          if (this.value) {
            const valueDate = this.parse(this.value)
            if (valueDate) {
              if (valueDate.getFullYear() === time.year && valueDate.getMonth() === time.month) {
                sclass = 'datepicker-dateRange-item-active'
              }
            }
          }
        }
        this.dateRange.push({
          text: i,
          date: date,
          sclass: sclass
        })
      }

      if (this.dateRange.length < 42) {
        const nextMonthNeed = 42 - this.dateRange.length
        const nextMonth = this.getYearMonth(time.year, time.month + 1)

        for (let i = 1; i <= nextMonthNeed; i++) {
          let date = new Date(nextMonth.year, nextMonth.month, i)
          this.dateRange.push({
            text: i,
            date: date,
            sclass: this.disabledDate(date) ? 'datepicker-item-disable' : 'datepicker-item-gray'
          })
        }
      }
    }
  }
}
</script>

<style lang="less">
.datepicker{
  position: relative;
  display: inline-block;
  .form-control {
    font-size: 12px;
  }
  .bicon{
    position: absolute;
    right: 11px;
    top: 8px;
    color: #666;
    font-size: 12px;
    line-height: 1;
  }
  .iconhandle{
    position: absolute;
    right: 11px;
    top: 8px;
    color: #888;
    line-height: 1;
  }
  .bicon-has-value {
    color: #666;
  }
  &:hover {
    .form-control {
      // border-color: #888;
    }
     .iconhandle {
       // color: #444;
     }
   }
}
input.datepicker-input.with-reset-button {
  padding-right: 25px;
}
.datepicker > button.close {
  position: absolute;
  top: calc(50% - 13px);
  right: 10px;
  outline: none;
  z-index: 2;
}
.datepicker > button.close:focus {
  opacity: .2;
}
.datepicker-popup{
  position: absolute;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  margin-top: 2px;
  z-index: 1000;
  box-shadow: 0 6px 12px rgba(0,0,0,0.175);
}
.datepicker-inner{
  width: 218px;
}
.datepicker-body{
  padding: 10px 10px;
}
.datepicker-ctrl p,
.datepicker-ctrl span,
.datepicker-body span{
  display: inline-block;
  width: 28px;
  line-height: 28px;
  height: 28px;
  border-radius: 4px;
  font-size: 14px;
}
.datepicker-ctrl p {
  width: 65%;
}
.datepicker-popup .datepicker-ctrl span {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  line-height: 28px;
  color: #666;
  &:hover {
     background: #eee;
  }
}
.datepicker-body span {
  text-align: center;
}
.datepicker-monthRange span,
.datepicker-timeRange span {
  width: 48px;
  height: 36px;
  line-height: 36px;
}
.datepicker-item-disable {
  background-color: white!important;
  cursor: not-allowed!important;
}
.decadeRange span:first-child,
.decadeRange span:last-child,
.datepicker-item-disable,
.datepicker-item-gray{
  color: #ddd;
}

.datepicker-dateRange-item-active:hover,
.datepicker-dateRange-item-active {
  background: #108ee9 !important;
  color: white!important;
}
.datepicker-monthRange,
.datepicker-timeRange {
  margin-top: 10px
}
.datepicker-monthRange span,
.datepicker-timeRange span,
.datepicker-ctrl span,
.datepicker-ctrl p,
.datepicker-dateRange span {
  cursor: pointer;
}
.datepicker-monthRange span:hover,
.datepicker-timeRange span:hover,
.datepicker-ctrl p:hover,
.datepicker-ctrl i:hover,
.datepicker-dateRange span:hover,
.datepicker-dateRange-item-hover {
  background-color : #eeeeee;
}
.datepicker-weekRange span{
  font-weight: bold;
}
.datepicker-label{
  background-color: #f8f8f8;
  font-weight: 700;
  padding: 7px 0;
  text-align: center;
}
.datepicker-ctrl{
  position: relative;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  text-align: center;
}
.month-btn{
  font-weight: bold;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.datepicker-preBtn{
  left: 2px;
}
.datepicker-nextBtn{
  right: 2px;
}
</style>
