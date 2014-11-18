var expect = require("chai").expect;
var sinon = require("sinon");
var Watcher = require("api/services/Watcher");

describe("Watcher", function(){

  describe("constructor", function(){

    it("should throw an error if no arguments provided", function(){
      var testWrapper = function(){
        return new Watcher();
      };
      expect(testWrapper).to.throw(Error);
    });

    it("should not throw an error", function(){
      var testWrapper = function(){
        var uow = {};
        var statusChecker = {};
        var statusReporter = {};
        return new Watcher(uow, statusChecker, statusReporter);
      };
      expect(testWrapper).to.not.throw(Error);
    });

  });

});
