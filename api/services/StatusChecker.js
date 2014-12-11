
var StatusChecker = function(httpClient){
    if(!httpClient) throw new Error();
    this.httpClient = httpClient;
};



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
