
var StatusChecker = function(httpClient){
    if(!httpClient) throw new Error();
    this.httpClient = httpClient;
};


// check for the current status of the given service
// TODO should take a service rather than HTTPClient

StatusChecker.prototype.check = function(url, cb){
  this.httpClient.get(url, function(err, response){
    if(err) return cb(err, null);
    var status = response.result.status[0].containers[0].status; //parses response
      //check compnenets with ID TODO
    cb(null, status);
  });
};


StatusChecker.prototype.check = function(url, cb){ //changed url to service
    this.httpClient.get(url, function(err, response){
        if(err) return cb(err, null);
        var status = response.result.status[0].containers[0].status; //parses response
        // Does it need to iterate through status??
        // How do we decide what is "up"
        // check compnenets with ID TODO
        cb(null, status);
    });
};

//TODO this is what I'm actually working on;
// Need to check status of specific components, which match a certain ID (container and component)
//

module.exports = StatusChecker;
