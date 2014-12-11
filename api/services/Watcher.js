var Promise = require('bluebird');
var pollingInterval = 1*10*1000; // poll every minute
//var pollingInterval = 1*1*1000; // poll every minute
//TODO but does this really poll every minute?

var Watcher = function(uow, statusChecker, statusReporter){
  if(!uow) throw new TypeError("uow");
  if(!statusChecker) throw new TypeError("statusChecker");
  if(!statusReporter) throw new TypeError("statusReporter");

  this.uow = uow;
  this.statusChecker = statusChecker;
  this.statusReporter = statusReporter;
};


//Watcher.prototype._check = function(url){
//  var statusChecker = this.statusChecker;
//
//  return new Promise(function(resolve, reject){
//    statusChecker.check(url, function(err, status){
//      if(err) return reject(err);
//      resolve(status);
//    });
//  })
//};

//TODO
Watcher.prototype._check = function(service){
    var statusChecker = this.statusChecker;

    return new Promise(function(resolve, reject){
        console.log("checking...");
        statusChecker.check(service, function(err, status){
            if(err) return reject(err);
            resolve(status);
        });
    })
};

Watcher.prototype._report = function(id, status){
  var statusReporter = this.statusReporter;

  return new Promise(function(resolve, reject){
    statusReporter.report(id, status, function(err, response){
      if(err) return reject(err);
      resolve(response);
    });
  })
};

Watcher.prototype._waitUntilNextCheck = function(service){
    console.log("waiting...");
  setTimeout(function(){
    this.watch(service);
  }.bind(this), pollingInterval);
};

Watcher.prototype.watch = function(service, cb){
  var statusChecker = this.statusChecker,
      statusReporter = this.statusReporter,
      that = this;

  this._check(service)
      .then(function(status){
          console.log("reporting...");
        that._report(service.id, status)
      })
      .then(function(result){
        that._waitUntilNextCheck(service);
      });
};

module.exports = Watcher;
