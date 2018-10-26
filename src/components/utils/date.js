/**
* 将时间格式化到年/月/日
*/
export function formatToHMS(date) {
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