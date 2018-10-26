/**
 * 移动web站设置html的fontSize
 * 750宽度为100px rem = 效果图像像素(750 / 100);
 */
export function remChange () {
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var widthProportion = function () {
    var doc = document.body || document.documentElement;
    var p = doc.clientWidth;
    var fontSize = p / 7.5;
    if (fontSize >= 100) {
      fontSize = 100;
    }
    return fontSize;
  };
  var changePage = function () {
    document.getElementsByTagName('html')[0].setAttribute('style', 'font-size:' + widthProportion() + 'px !important');
  };

  changePage();
  window.addEventListener(resizeEvt, changePage, false);
}
