/**
* 将时间格式化到年/月/日 显示：分钟
*/
export function formatDate(date) {
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '00' : minutes;
  month = ('0' + month).slice(-2);
  day = ('0' + day).slice(-2);
  return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes;
}
/**
* 将时间格式化到年/月/日
*/
export function formatDateNew(date) {
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = ('0' + month).slice(-2);
  day = ('0' + day).slice(-2);
  return year + '/' + month + '/' + day;
}
export function isSameDay(date1, date2) {
  return formatDate(date1) === formatDate(date2);
}

export function formatDateTime(date) {
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  let dateStr = formatDate(date);
  let timeStr = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
  return dateStr + ' ' + timeStr;
}
/**
* 将时间格式化到年/月/日 显示：分钟：秒
*/
export function formatToMs(date) {
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '00' : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  month = ('0' + month).slice(-2);
  day = ('0' + day).slice(-2);
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}
/**
 * 当前时间到天
 */
export function currentDateToDay(opts) {
  let curyear = new Date();

  if (opts && opts.date) {
    curyear = new Date(opts.date);
  }

  if (opts && opts.day) {
    curyear.setDate(curyear.getDate() + opts.day);
  }

  let year = curyear.getFullYear();
  let month = curyear.getMonth() + 1;
  let day = curyear.getDate();

  month = month > 9 ? month : '0' + month;
  day = day > 9 ? day : '0' + day;
  return year + '/' + month + '/' + day;
};
/**
 * 当前时间到小时
 * @param  {[type]} opts [description]
 * @return {[type]}      [description]
 */
export function currentDateToHour(opts) {
  let curyear = new Date();

  if (opts && opts.date) {
    curyear = new Date(opts.date);
  }

  if (opts && opts.day) {
    curyear.setDate(curyear.getDate() + opts.day);
  }

  let year = curyear.getFullYear();
  let month = curyear.getMonth() + 1;
  let day = curyear.getDate();
  let hours = curyear.getHours();
  hours = hours < 10 ? '0' + hours : hours;
  month = month > 9 ? month : '0' + month;
  day = day > 9 ? day : '0' + day;
  return year + '/' + month + '/' + day + ' ' + hours + ':' + '00';
};
/**
 * 日期选择器结束日期修改 统一修改问 时:59:59
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
export function endTimeHandle(date) {
  if (!date) return;
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();

  hours = hours < 10 ? '0' + hours : hours;
  month = ('0' + month).slice(-2);
  day = ('0' + day).slice(-2);
  return year + '/' + month + '/' + day + ' ' + hours + ':' + '59:59';
}
export function startTimeHandle(date) {
  if (!date) return;
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();

  hours = hours < 10 ? '0' + hours : hours;
  month = ('0' + month).slice(-2);
  day = ('0' + day).slice(-2);
  return year + '/' + month + '/' + day + ' ' + hours + ':' + '00:00';
}
export function timeFormatTo235959(date) {
  if (!date) return;
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = ('0' + month).slice(-2);
  day = ('0' + day).slice(-2);
  return year + '/' + month + '/' + day + ' 23:59:59';
}
export function timeFormatTo000000(date) {
  if (!date) return '';
  if (typeof date !== 'object') {
    date = new Date(date);
  }
  console.log(date)
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = ('0' + month).slice(-2);
  day = ('0' + day).slice(-2);
  return year + '/' + month + '/' + day + ' 00:00:00';
}
