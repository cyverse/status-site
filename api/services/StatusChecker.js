
var StatusChecker = function(httpClient){
  if(!httpClient) throw new Error();
  this.httpClient = httpClient;
};

StatusChecker.prototype.check = function(options, cb){
  this.httpClient.get(options, function(response){
    var status = response.result.status[0].containers[0].status;
    cb(status)
  });
};

module.exports = StatusChecker;
