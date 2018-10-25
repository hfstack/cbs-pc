/**
 * 列表排序
 */
export default function(opts) {
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
  // let hours = curyear.getHours();
  // let minutes = curyear.getMinutes();
  // let seconds = curyear.getSeconds();

  month = month > 9 ? month : '0' + month;
  day = day > 9 ? day : '0' + day;
  return year + '/' + month + '/' + day ;
};
