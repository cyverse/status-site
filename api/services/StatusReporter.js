var StatusReporter = function(uow){
  if(!uow) throw new Error();
  this.uow = uow;
};

StatusReporter.prototype.report = function(id, status, cb){
  var ServiceStatus = this.uow.ServiceStatus;

  ServiceStatus.findOne(id).exec(function(err, serviceStatus){
    if(err) return cb(err);

    ServiceStatus.update(serviceStatus.id, {status: status}).exec(function(err, updated){

        cb(err, updated);
    });
    // updates parsed status response to DB


  });
};

module.exports = StatusReporter;
