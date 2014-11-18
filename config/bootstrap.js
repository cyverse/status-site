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

var UnitOfWork = require('api/services/UnitOfWork');
var StatusChecker = require('api/services/StatusChecker');
//var StatusCheckerFactory = require('api/services/ServiceStatusFactory');
var Watcher = require('api/services/Watcher');
var HttpClient = require('api/services/HttpClient');
var StatusReporter = require('api/services/StatusReporter');
//var request = require('request');

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  var serviceStatus = {
    name: "Atmopshere",
    status: "Unknown",
    url: "https://status.io/pages/544e810996cc7fe45400896c",
    api: "https://status.io/1.0/status/544e810996cc7fe45400896c"
  };

  var url = serviceStatus.api;
  var httpClient = new HttpClient();

  var uow = new UnitOfWork(ServiceStatus);
  var statusReporter = new StatusReporter(uow);
  var statusChecker = new StatusChecker(httpClient);

  ServiceStatus.create(serviceStatus).exec(function(err, created){
    if(err) throw err;

    var watcher = new Watcher(uow, statusChecker, statusReporter);
    watcher.watch(created);
  });

  cb();

  //httpClient.get(url, function(err, response){
  //  console.log(response);
  //});


  //var statusCheckerFactory = new StatusCheckerFactory();

  //request({
  //  url: "https://status.io/1.0/status/544e810996cc7fe45400896c",
  //  method: "GET"
  //}, function(error, response, body){
  //  console.log(response);
  //  console.log(body);
  //});

  //var watcher = new Watcher(uow, statusCheckerFactory);
  //watcher.watch();

};
