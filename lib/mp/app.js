
const VM = require('./vm');
const initRootVM = require('./init-root-vm');
const callHook = require('./call-hook');
const app = {};

app.init = function init(vm, opt) {
  App({
    data: {
      $root: {}
    },
    //	Function	生命周期函数--监听小程序初始化	当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
    onLaunch(options) {
      const rootVM = this.rootVM = initRootVM(this, opt);

      callHook(rootVM,'onLaunch', options);
    },
    //	Function	生命周期函数--监听小程序显示	当小程序启动，或从后台进入前台显示，会触发 onShow
    onShow(options) {
      const rootVM = this.rootVM;

      callHook(rootVM,'onShow', options);
    },
    //	Function	生命周期函数--监听小程序隐藏	当小程序从前台进入后台，会触发 onHide
    onHide() {
      const rootVM = this.rootVM;

      callHook(rootVM,'onHide');
    },
    //	Function	错误监听函数	当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
    onError(msg) {
      const rootVM = this.rootVM;
      callHook(rootVM,'onError', msg);
    },
    //	Function	页面不存在监听函数	当小程序出现要打开的页面不存在的情况，会带上页面信息回调该函数，详见下文
    onPageNotFound(options) {
      const rootVM = this.rootVM;
      callHook(rootVM,'onPageNotFound', options);
    },
    eventProxy: function (e) {
      const rootVM = this.rootVM;

      const eventId = e.target.dataset.eventId;
      if (eventId) {
        $vm.$event = {
          _mp: e
        }
        $vm[eventId](e);
      }
    }
  });
};

module.exports = app;