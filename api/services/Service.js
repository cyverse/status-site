var request = require('request');


var Service = function(){
    //(rollup) Database with one service
    this.serviceObject = [{ // Does this represent Atmosphere? YES
        name: "",
        status: "Unknown",
        url: "https://atmosphere.status.io",
        api: "https://status.io/1.0/status/544e810996cc7fe45400896c",
        serviceid: "", // This might not be a real thing TODO which is this/How do I get this??
        containerid: "544e810a96cc7fe45400897a" //This corresponds to Tucson
    } // Each entry has IDs for everything
    // > Status
    //    > service1 (serviceid)
    //        > container (containerid, same for each)
    // TODO both IDs have to match to get data
    ];
};

//Service = function(name, url, id){
//    //(rollup) Database with one service
//    var serviceObject = [{ // Does this represent Atmo/DE or Auth-API-WebApp?
//        name: name,
//        status: "Unknown",
//        url: url,
//        api: "https://status.io/1.0/status/544e810996cc7fe45400896c",
//        serviceid: id, // This might not be a real thing TODO Which one is this??
//        containerid: "" //This corresponds to Tucson TODO
//    } // Each entry has IDs for everything
//        // > Status
//        //    > service1 (serviceid)
//        //        > container (containerid, same for each)
//        // TODO both IDs have to match to get data
//    ];
//};

Service.prototype.setName = function(newName){
    serviceObject.name = newName;
};

Service.prototype.setURL = function(newUrl){
    serviceObject.url = newUrl;
};

Service.prototype.setId = function(newId){
    serviceObject.serviceId = newId; //This might be completely useless.
};

Service.prototype.get = function(cb){
    request({
        url: this.serviceObject.url,
        method: "GET"
    }, function (error, response, body) {
        if(error) return cb(error);
        var bodyJSON = JSON.parse(body);
        return cb(null, bodyJSON);
    });
};

module.exports = Service;