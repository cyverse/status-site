
var StatusChecker = function(httpClient){
  if(!httpClient) throw new Error();
  this.httpClient = httpClient;
};

StatusChecker.prototype.check = function(url, cb){
  this.httpClient.get(url, function(err, response){
    if(err) return cb(err, null);
    var status = response.result.status[0].containers[0].status;
    cb(null, status);
  });
};

module.exports = StatusChecker;
