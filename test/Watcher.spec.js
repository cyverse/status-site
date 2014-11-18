var expect = require("chai").expect;
var sinon = require("sinon");
var Watcher = require("api/services/Watcher");

describe.only("Watcher", function(){

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
        var serviceCheckerFactory = {};
        return new Watcher(uow, serviceCheckerFactory);
      };
      expect(testWrapper).to.not.throw(Error);
    });

  });

  describe("#watch", function(){

    it("should ")

  })

});
