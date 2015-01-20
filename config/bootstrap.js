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

// check for groups
  // take group list and create if doesn't exist

// then: make services
  // create service if not exists

// then: populate groups
  // add services to group if not in it

// then: done


function watchService(service){
  // create DI-esque objects
  var httpClient = new HttpClient(); // The thing that does all the  requests
  var uow = new UnitOfWork(ServiceStatus); // A single DB request
  var statusReporter = new StatusReporter(uow);
  var statusChecker = new StatusChecker(httpClient);

  var watcher = new Watcher(uow, statusChecker, statusReporter);
  watcher.watch(service);// a database object
}

function addServicesToGroup(group, serviceDataList){
  serviceDataList.forEach(function(serviceData){
    // find group
    // create or update
    var options = {
      api: serviceData.api,
      serviceid: serviceData.serviceid,
      containerid: serviceData.containerid
    };

    ServiceStatus.findOne(options).exec(function(err, service) {
      // set the group for the service
      serviceData.group = group.id;

      if(!service){
        ServiceStatus.create(serviceData).exec(function(err, service){
          if(err) throw err;
          // watch service
          watchService(service);
        });
      }else{
        // update, then watch
        ServiceStatus.update(service.id, serviceData).exec(function(err, services){
          if(err) throw err;
          // watch service
          watchService(services[0]);
        });
      }
    });
  });
}

function createGroupAndAddServices(groupData, servicesData){

  // 1. find group
  Group.findOne({name: groupData.name}).exec(function(err, group) {
    if(!group) {
      Group.create(groupData).exec(function(err, group){
        if(err) throw err;
        // add services to newly created group
        addServicesToGroup(group, servicesData);
      });
    } else {
      // group already exists so just add services
      Group.update(group.id, groupData).exec(function(err, groups){
        if(err) throw err;
        // add services to newly created group
        addServicesToGroup(groups[0], servicesData);
      });
    }
  });
}

module.exports.bootstrap = function(cb) {
  var atmosphereGroup,
      atmosphereServices,
      deGroup,
      deServices;

  // ----------
  // Atmosphere
  // ----------

  atmosphereGroup = {
    name: "Atmosphere",
    url: "http://atmosphere.status.io"
  };

  atmosphereServices = [
    {
      name: "API",
      status: "Unknown",
      api: "https://api.status.io/1.0/status/544e810996cc7fe45400896c",
      serviceid: "544ebe8296cc7fe454008e58",
      containerid: "544e810a96cc7fe45400897a"
    },
    {
      name: "Web App",
      status: "Unknown",
      api: "https://api.status.io/1.0/status/544e810996cc7fe45400896c",
      serviceid: "544e810a96cc7fe45400897b",
      containerid: "544e810a96cc7fe45400897a"
    }
  ];

  createGroupAndAddServices(atmosphereGroup, atmosphereServices);



  // ----------
  // DE
  // ----------

  deGroup = {
    name: "Discovery Environment",
    url: "http://iplantde.status.io"
  };

  deServices = [
    {
      name: "API",
      status: "Unknown",
      api: "https://api.status.io/1.0/status/54b6f25d22de98fe5e00028f",
      serviceid: "",
      containerid: ""
    }
  ];

  //createGroupAndAddServices(deGroup, deServices);

  // ----------
  // Data Store
  // ----------

  coreGroup = {
    name: "Core Services",
    url: "http://iplantcore.status.io"
  };

  coreServices = [
    {
      name: "Data Store",
      status: "Unknown",
      api: "https://api.status.io/1.0/status/54b6f6d8683bac79200003dc",
      serviceid: "54b6f6d8683bac79200003ec",
      containerid: "54b6f6d8683bac79200003eb"
    },
    {
      name: "Bisque",
      status: "Unknown",
      api: "https://api.status.io/1.0/status/54b6f6d8683bac79200003dc",
      serviceid: "54b6fdd3683bac7920000400",
      containerid: "54b6f6d8683bac79200003eb"
    },
    {
      name: "Main Website",
      status: "Unknown",
      api: "https://api.status.io/1.0/status/54b6f6d8683bac79200003dc",
      serviceid: "54b6ff7f22de98fe5e0002b9",
      containerid: "54b6f6d8683bac79200003eb"
    }
  ];
  //createGroupAndAddServices(coreGroup, coreServices);TODO


  //-----------------
  //  Authentication
  //-----------------

  authGroup = {
    name: "Authentication",
    url: "http://atmosphere.status.io"
  };

  authServices = [
    {
      name: "CAS 3",
      status: "Unknown",
      api: "https://status.io/1.0/status/544e810996cc7fe45400896c",
      serviceid: "54b9522322de98fe5e000384",
      containerid: "54b6f6d8683bac79200003eb"
    },
    {
      name: "CAS 4.0",
      status: "Unknown",
      api: "https://status.io/1.0/status/544e810996cc7fe45400896c",
      serviceid: "54b9522e683bac79200004e4",
      containerid: "54b6f6d8683bac79200003eb"
    }
  ];
//createGroupAndAddServices(deGroup, deServices);TODO




    setTimeout(function(){
        Group.find().populate("services").exec(function(err, groups){
            //console.log(groups);
        })
    }, 2000);

  // ------------------
  // Bootstrap Callback
  // ------------------

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();


};
