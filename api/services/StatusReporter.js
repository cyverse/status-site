var StatusReporter = function(uow){
  if(!uow) throw new Error();
  this.uow = uow;
};

StatusReporter.prototype.report = function(id, status, cb){
  var ServiceStatus = this.uow.ServiceStatus;

  ServiceStatus.findOne(id).exec(function(err, serviceStatus){
  // uses ID to identify matching service
    if(err) return cb(err);

    ServiceStatus.update(serviceStatus.id, {status: status}).exec(function(err, updated){

//        request({
//            url: "https://private-39405-statusio.apiary-proxy.com/v2/metric/update",
//            body: JSON.stringify(SOMETHING),
//            headers: {  "x-api-id": "75744ed0-af87-49ce-8003-eea50469cf63",
//                        "x-api-key": "6aj1eg+MwZ+8p601YlknqclWC2tCOHLxzTT4+BMQBJ8gsmhd7Zt/Rw2bchkNFL1xGLbqJfnbEulKA4aePWoiuQ==",
//                        "Content-Type": "application/json"},
//            method: "POST"
//        }, function (error, response, body) {
//            console.log(body);
//
//        }); TODO How do we send this not as a custom metric?

        cb(err, updated);
    }); // updates parsed status response to DB

      // Needs to send to Status.io instead of DB TODO for later
      // request


  });
};

module.exports = StatusReporter;
