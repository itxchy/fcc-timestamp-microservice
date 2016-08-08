var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./server');
var expect = chai.expect;

chai.use(chaiHttp);

describe('Server', function() {
    it('/ GET should respond with a 200 code', function() {
        
        chai.request(server.server)
            .get('/')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('/1470687311 GET should return the correct date, August 8th 2016', function() {

        var testJSON = { unix: 1470687311, naturalDate: 'August 8th 2016' };

        chai.request(server.server)
            .get('/1470687311')
            .end(function(err, res) {
                expect(res.body).to.eql(testJSON);
                done();
            });
    });

    it('/August 8th 2016 GET should return the correct Unix timestamp, 1470687311', function() {

        var testJSON = { unix: 1470687311, naturalDate: 'August 8th 2016' };

        chai.request(server.server)
            .get('/August 8th 2016')
            .end(function(err, res) {
                expect(res.body).to.eql(testJSON);
                done();
            });
    });

});

describe('timeHelpers', function() {

    describe('isUnixTimestamp', function() {

        it('if time is a number, but a string type, time should be returned as a number', function() {
            var newTimeFromString = server.timeHelpers.isUnixTimestamp('4');
            var newTimeFromNumber = server.timeHelpers.isUnixTimestamp(4);

            expect(newTimeFromString).to.be.a('number');
            expect(newTimeFromNumber).to.be.a('number');
        });

        it('if time is not a number, or a number as a string, false should be returned', function() {
            var newTime = server.timeHelpers.isUnixTimestamp('not a number');

            expect(newTime).to.be.false;
        });
    });
});