var page = require('./page');
var app = require('./app');
var dataSync = require('./data-sync');
var events = require('./events');

module.exports = {
  initMP($vm) {
    var mpType = $vm.mpType || 'page';
    if (mpType === 'app') {
      app.init($vm);
    } else {
      page.init($vm);
    }
  },
  updateData: dataSync.updateData,
  initDataToMP: dataSync.initDataToMP,
  proxyEvent: events.proxyEvent,
  addEventHandler: events.addEventHandler,
  install(Regular) {
    var proto = Regular.prototype;
    proto._addMPEventHandler = events.addEventHandler;
    proto._removeMPEventHandler = events.removeEventHandler;
    proto._updateMPData = dataSync.updateData;
    return Regular;
  }
}