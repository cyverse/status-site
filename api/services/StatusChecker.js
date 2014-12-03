
var StatusChecker = function(httpClient){
    if(!httpClient) throw new Error();
    this.httpClient = httpClient;
};



//StatusChecker.prototype.check = function(url, cb){ //changed url to service
//    this.httpClient.get(url, function(err, response){
//        if(err) return cb(err, null);
//TODO first thing: make sure URL works, check IDs later
StatusChecker.prototype.check = function(url, cb){ //changed url to service
    this.httpClient.get(url, function(err, response){
        if(err) return cb(err, null);

        //var status = response.result.status[0].containers[0].status; //parses response
        // Does it need to iterate through status?? Yes.
        // How do we decide what is "up":
        var status;
        var counter = 0;
        for( var num in response.result.status){
            var component = response.result.status[num];
            if(component.containers[0].status === "Service Disruption" || component.containers[0].status === "Security Issue"){
                status = component.containers[0].status;
                break;
            }
            else if (component.containers[0].status === "Partial Service Interruption" || component.containers[0].status === "Degraded Performance"){
                counter++;
                if (counter > 1){
                    status = component.containers[0].status;
                    // allows to check that there isn't a worse problem
                }
            }
            else{ //status is operational
                if (counter === 0 && num === response.result.status.length){ //makes sure its on the last one
                    // if all the statuses are operational
                    status = component.containers[0].status
                }
            }

        }

        // all operational is always good.

        //  partial interruption, degraded performnace meh

        //  service disruption security issue bad

        // check compnenets with ID TODO
        cb(null, status);
    });
};

//TODO this is what I'm actually working on;
// Need to check status of specific components, which match a certain ID (container and component)
//

module.exports = StatusChecker;
