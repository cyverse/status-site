var request = require('request');

var HttpClient = function(){

};

HttpClient.prototype.get = function(url, cb){
  //request({
  //  url: url,
  //  method: "GET"
  //}, function (error, response, body) {
  //  if(error) return cb(error);
  //  return cb(null, body);
  //});

  var body = {
    result: {
      status: [
        {
          id: "544e810a96cc7fe45400897b",
          name: "Web Application",
          containers: [
            {
              id: "544e810a96cc7fe45400897a",
              name: "Tucson",
              status: "Operational",
              status_code: 100
            }
          ]
        }
      ]
    }
  };

  cb(null, body)
};

module.exports = HttpClient;
