
var StatusChecker = function(httpClient){
    if(!httpClient) throw new Error();
    this.httpClient = httpClient;
};

//StatusChecker.prototype.check = function(url, cb){ //changed url to service
//    this.httpClient.get(url, function(err, response){
//        if(err) return cb(err, null);
//TODO first thing: make sure URL works, check IDs later
//StatusChecker.prototype.check = function(url, cb){ //changed url to service
//    this.httpClient.get(url, function(err, response){
//        if(err) return cb(err, null);
//
//        //var status = response.result.status[0].containers[0].status; //parses response
//        // How do we decide what is "up":
//        var status;
//        var counter = 0;
//        for( var num in response.result.status){
//            var component = response.result.status[num];
//            //  service disruption security issue bad
//            if(component.containers[0].status === "Service Disruption" || component.containers[0].status === "Security Issue"){
//                status = component.containers[0].status;
//                break;
//            }
//            //  partial interruption, degraded performnace meh
//            else if (component.containers[0].status === "Partial Service Interruption" || component.containers[0].status === "Degraded Performance"){
//                counter++;
//                if (counter > 1){
//                    status = component.containers[0].status;
//                    // allows to check that there isn't a worse problem
//                }
//            }
//            // all operational is always good.
//            else{ //status is operational
//                if (counter === 0 && num === response.result.status.length){ //makes sure its on the last one
//                    // if all the statuses are operational
//                    status = component.containers[0].status
//                }
//            }
//
//        }
//
//        // check compnenets with ID TODO
//        cb(null, status);
//    });
//};


StatusChecker.prototype.check = function(service, cb){
    this.httpClient.get(service.api, function(err, response) {
        if (err) return cb(err, null);
        var status;
        //find component with the proper ID
        for( var num in response.result.status){
            var component = response.result.status[num];
            if (component.id === service.serviceid){
                // returns status of the component
                status = containerator(component.containers, service.containerid);
               break;
            }
        }
        cb(null, status)
    });

};

var containerator = function(container, id){
    if (container.length === 1){
        return container[0].status
    }
    else {
        for (var num in container) {
            if (container[num].id = id) {
                return container[num].status
            }
        }
    }
};


module.exports = StatusChecker;
