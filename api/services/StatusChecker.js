
var StatusChecker = function(httpClient){
  if(!httpClient) throw new Error();
  this.httpClient = httpClient;
};
// check for the current status of the given service
// TODO should take a service rather than HTTPClient

//StatusChecker.prototype.check = function(url, cb){
//  this.httpClient.get(url, function(err, response){
//    if(err) return cb(err, null);
//    var status = response.result.status[0].containers[0].status; //parses response
//      //check compnenets with ID TODO
//    cb(null, status);
//  });
//};


StatusChecker.prototype.check = function(service, cb){
    this.httpClient.get(service.url, function(err, response){
        if(err) return cb(err, null);



        var status = response.result.status[0].containers[0].status; //parses response
        // what is status[0] - it should check against IDs?
        //check compnenets with ID TODO
        cb(null, status);
    });
};


module.exports = StatusChecker;
