var Promise = require('bluebird');

var Watcher = function(uow, statusChecker, statusReporter){
  if(!uow) throw new TypeError("uow");
  if(!statusChecker) throw new TypeError("statusChecker");
  if(!statusReporter) throw new TypeError("statusReporter");

  this.uow = uow;
  this.statusChecker = statusChecker;
  this.statusReporter = statusReporter;
};

Watcher.prototype.watch = function(service, cb){
  var statusChecker = this.statusChecker,
      statusReporter = this.statusReporter,
      that = this;

  statusChecker.check(service.api, function(err, status){
    if(err) return cb(err);

    statusReporter.report(service.id, status, function(err, response){
      if(err) return cb(err);

      setTimeout(function(){
        that.watch(service);
      }, 1000);
    });
  });
};

module.exports = Watcher;
