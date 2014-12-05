var request = require('request');

var HttpClient = function(){

};

HttpClient.prototype.get = function(url, cb){
  request({
    url: url,
    method: "GET"
  }, function (error, response, body) {
    if(error) return cb(error);
      //console.log(body);
    var bodyJSON = JSON.parse(body);
    return cb(null, bodyJSON);
  });
};


module.exports = HttpClient;
