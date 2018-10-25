// 整数除以100
export function integerDeal(num, len) {
  num = num.toString();
  let length = num.length;
  if (length >= 3) {
    let m = num.slice(0, length - len);
    let n = num.slice(length - len);
    return m + '.' + n;
  } else if (length === 1) {
    return '0.0' + num;
  } else if (length === 2) {
    return '0.' + num;
  }
}
// 小数除以100
export function decimalsDeal(num) {
  if (num.toString().split('.')[1]) {
    let m = num.toString().split('.')[1];
    let n = num.toString().split('.')[0];
    if (m.length === 1) {
      m = m + '0';
    }
    return n + m;
  } else {
    num = num * 100;
    return num;
  }
}
