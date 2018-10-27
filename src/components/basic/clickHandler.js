export function clickHandler (self, options) {
  /**
   * @note 点击助手  relationType 类型(1:URL 2:商品 3:专场)
   * @param self Vue钩子
   * @param options {} 对象集合
   *        options.item     商品数据
   *        options.index    商品的位置
   *        options.monitor  埋点
   *        options.tabindex tab的位置
   *        options.openType 0代表sdk用百川H5的方式打开        1代表用native方式打开
   * @sp    mlnewopen APP打开新webview方案
   **/
  if (options.item.relationType === 1) {
    // URL类型
    nativeOpenHander(options.item.goodsContent, options.monitor);
  } else if (options.item.relationType === 2) {
    // URL类型
    if (options.item.goodsType === 2 || options.item.goodsType === 3 || options.item.goodsType === 4) {
      nativeOpenHander(options.item.goodsContent, options.monitor);
      return;
    }
    // 淘系商品类型
    let apiUrl = '/item/convert';
    let itemId = +options.item.goodsContent;
    let monitor = options.monitor;
    if (!itemId) {
      return;
    }
    try {
      monitor = JSON.parse(monitor);
      apiUrl += '?dcm=' + monitor.dcm + '&dpm=' + monitor.dpm;
    } catch (e) {
      // do sth
    }
    self.$http.post(apiUrl, {
      itemId: itemId,
      os: window.JQG && window.JQG.isIos ? 'ios' : 'android'
    }).then((res) => {
      if (res && res.data && res.data.success && res.data.list && res.data.list.clickUrl) {
        nativeOpenHander(res.data.list.clickUrl, monitor);
      } else {
        // @TODO 跳转失败提示
      }
    }, () => {
      // @TODO 网络错误
    });
  } else if (options.item.relationType === 3) {
    // 专场页
    let tabindex = 1;
    if (options.tabindex) {
      tabindex = '3-' + (+options.tabindex + 1);
    }
    // 专场类型
    window.location.href = '//' + window.location.host + '/special/index?martId=' + options.item.relationId + '&martTitle=' + encodeURIComponent(options.item.title) + '&dcm=' + options.item.dcm + '&dpm=maila-' + (window.JQG && window.JQG.appId) + '.15.' + tabindex + '.' + (+options.index + 1) + '&mlnewopen';
  }
  // native 打开助手
  function nativeOpenHander (url, monitor) {
    try {
      monitor = JSON.parse(monitor);
      let deviceId = window.MailaSDK && window.MailaSDK.getDeviceId() ? '&s_device_id=' + window.MailaSDK.getDeviceId() : '';
      url += (url.indexOf('?') !== -1 ? '&' : '?') + 'dcm=' + monitor.dcm + '&dpm=' + monitor.dpm + '&device_id=' + self.$cookie.get('_coll_ci') + deviceId;
      callback();
    } catch (e) {
      callback();
    }
    function callback () {
      // @note window.mailaUrlCallback 执行前设为true，执行完毕设为false后，url正常跳转
      // @type boolean
      if (window.mailaUrlCallback) {
        var interval = setInterval(function () {
          if (!window.mailaUrlCallback) {
            clearInterval(interval);
            wakeMain();
          }
        }, 500);
      } else {
        wakeMain();
      }
    }
    function wakeMain () {
      // 如果某些APP未把 手淘开放方式 加入url scheme白名单
      // 追加阿里妈妈只唤起H5参数
      url += '&nowake=1';
      // 外链
      var isOutsideUrl = monitor && monitor.dcm && monitor.dcm.split('.')[1] === '0' && url.indexOf('/link?tag=1&id') === -1;
      // 如果是外链url类型， 主动发送点击埋点
      if (isOutsideUrl) {
        self.$http.get('/click?dcm=' + monitor.dcm + '&dpm=' + monitor.dpm, {}).then((res) => {});
        window.location.href = url;
      } else {
        window.MailaApp && window.MailaApp.showUrl && window.MailaApp.showUrl(url, options.openType || 0);
      }
    }
  }
};
