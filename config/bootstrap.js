/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var UnitOfWork = require('../api/services/UnitOfWork');
var StatusChecker = require('../api/services/StatusChecker');
//var StatusCheckerFactory = require('api/services/ServiceStatusFactory');
var Watcher = require('../api/services/Watcher');
var HttpClient = require('../api/services/HttpClient');
var StatusReporter = require('../api/services/StatusReporter');
//var request = require('request');

module.exports.bootstrap = function(cb) {


  var serviceStatusList = [ //(rollup) Database with one service
    {
      name: "Atmopshere",
      status: "Unknown",
      url: "https://atmosphere.status.io",
      api: "https://status.io/1.0/status/544e810996cc7fe45400896c",
      serviceid: "", // TODO
      containerid: "" //TODO
    } // Each entry has IDs for everything
      // both IDs have to match to get data TODO
  ];

  var httpClient = new HttpClient();
  var uow = new UnitOfWork(ServiceStatus);
  var statusReporter = new StatusReporter(uow);
  var statusChecker = new StatusChecker(httpClient); // should take service, not URL TODO
    // What does a service look like? ID or Service Object? pulled from DB? TODO

  ServiceStatus.create(serviceStatusList).exec(function(err, created){
    if(err) throw err; // db object

    created.forEach(function(serviceStatus){ // for each DB entry, monitor its status
      var watcher = new Watcher(uow, statusChecker, statusReporter);
      watcher.watch(serviceStatus);
    });
  });

  cb();

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
};
