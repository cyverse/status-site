var UnitOfWork = function(serviceStatus){
  if(!serviceStatus) throw new Error("serviceStatus");
  this.ServiceStatus = serviceStatus;
};

module.exports = UnitOfWork;
