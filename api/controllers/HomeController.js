/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function(req, res){
    ServiceStatus.find().exec(function(err, results){
      res.view("homepage", {statusResults: results});
    })
  }

};

