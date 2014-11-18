var expect = require("chai").expect;
var sinon = require("sinon");
var StatusChecker = require("api/services/StatusChecker");
var httpClientResponse = require("./fixtures/httpClientResponse.fixture");

describe("StatusChecker", function(){

  describe("constructor", function(){

    it("should throw an error if an http client is not provided", function(){
      var testWrapper = function(){
        return new StatusChecker();
      };
      expect(testWrapper).to.throw(Error);
    });

    it("should not throw an error if an http client is provided", function(){
      var testWrapper = function(){
        return new StatusChecker({});
      };
      expect(testWrapper).to.not.throw(Error);
    });

  });

  describe("#check", function(){

    var httpClient,
        urlToCheck;

    beforeEach(function(){
      httpClient = {
        get: function(){}
      };

      urlToCheck = {
        url: "https://status.io/1.0/status/544e810996cc7fe45400896c",
        id: "544e810a96cc7fe45400897b"
      };
    });

    it("should call the http client", function(){
      var mockHttpClient = sinon.mock(httpClient);
      mockHttpClient.expects("get").once().returns({});

      var statusChecker = new StatusChecker(httpClient);
      statusChecker.check(urlToCheck, function(){});

      mockHttpClient.verify();
    });

    it("should call the callback", function(){
      // Arrange
      var mockHttpClient = sinon.mock(httpClient),
          statusChecker = new StatusChecker(httpClient),
          callback = sinon.spy();

      mockHttpClient.expects("get").callsArgWith(1, httpClientResponse);

      // Act
      statusChecker.check(urlToCheck, callback);

      // Assert
      expect(callback.calledOnce).to.be.true;
    });

    it("should return service status", function(done){
      // Arrange
      var mockHttpClient = sinon.mock(httpClient),
          statusChecker = new StatusChecker(httpClient);

      mockHttpClient.expects("get").callsArgWith(1, httpClientResponse);

      // Act
      statusChecker.check(urlToCheck, function(status){
        // Assert
        var expectedResponse = httpClientResponse.result.status[0].containers[0].status;
        expect(status).to.equal(expectedResponse);
        done();
      });
    })

  });

});
