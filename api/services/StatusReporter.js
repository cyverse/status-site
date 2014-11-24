var StatusReporter = function(uow){
  if(!uow) throw new Error();
  this.uow = uow;
};

StatusReporter.prototype.report = function(id, status, cb){
  var ServiceStatus = this.uow.ServiceStatus;

  ServiceStatus.findOne(id).exec(function(err, serviceStatus){ // uses ID to identify matching service
    if(err) return cb(err);

    ServiceStatus.update(serviceStatus.id, {status: status}).exec(function(err, updated){
      cb(err, updated);
    }); // updates parsed status response to DB

      //Needs to send to Status.io instead of DB TODO for later
  });
};

module.exports = StatusReporter;
