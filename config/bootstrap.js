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
//var Service = require('../api/services/Service');

function addServiceStatusIfNew(serviceStatusData, uow, statusChecker, statusReporter){
    ServiceStatus.findOne({name: serviceStatusData.name }).exec(function(err, serviceStatus) {
        if(err) throw err;

        if (!serviceStatus){

            ServiceStatus.create(serviceStatusData).exec(function (err, serviceStatus) {
                if (err) throw err; // db object

                // for each DB entry, monitor its status
                var watcher = new Watcher(uow, statusChecker, statusReporter);
                watcher.watch(serviceStatus);// a database object
            });
        }
        else{
            var watcher = new Watcher(uow, statusChecker, statusReporter);
            watcher.watch(serviceStatus);// a database object
        }


    });
}

module.exports.bootstrap = function(cb) {


  var serviceStatusList = [ //(rollup) Database with one service
    {
      name: "Atmopshere API",
      status: "Unknown",
      //url: "https://atmosphere.status.io",
      api: "https://status.io/1.0/status/544e810996cc7fe45400896c",
      serviceid: "544ebe8296cc7fe454008e58", // This might not be a real thing TODO Which one is this?? API
      containerid: "544e810a96cc7fe45400897a"
    }// Each entry has IDs for everything
];

  var httpClient = new HttpClient(); // The thing that does all the  requests
  var uow = new UnitOfWork(ServiceStatus); // A single DB request
  var statusReporter = new StatusReporter(uow);
  var statusChecker = new StatusChecker(httpClient);

    //Create Groups
    //if group exist, don't make
    var atmoid;

    Group.findOne({name: 'Atmosphere'}).exec(function(err, serviceStatus) {
        if(serviceStatus){
            //save it's ID for population
            atmoid = serviceStatus.id;
        }
        else{
            Group.create({name:'Atmosphere', url:"https://atmosphere.status.io"}).exec(function(err, created){
                if(err) throw err;
                atmoid = created.id;
            });
        }
    });

//
  serviceStatusList.forEach(function(serviceStatusData){
      serviceStatusData.group = atmoid;
      addServiceStatusIfNew(serviceStatusData, uow, statusChecker, statusReporter)
  });

    //Populate
//TODO wont work asynchronously

    Group.find(atmoid).populate('services').exec(function(err,r){});

    cb();

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
};
