/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function(req, res){
    Group.find().populate("services").exec(function(err, results){
      res.view("homepage", {Results: results});
    })
  }

};

