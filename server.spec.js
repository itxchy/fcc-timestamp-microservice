/* global done */

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

        var testJSON = { unix: 1470687311, natural_date: 'August 8th 2016' };

        chai.request(server.server)
            .get('/1470687311')
            .end(function(err, res) {
                expect(res.body).to.eql(testJSON);
                done();
            });
    });

    it('/-1470687311 GET should return the correct date, May 25th 1923', function() {

        var testJSON = { unix: -1470687311, natural_date: 'May 25th 1923' };

        chai.request(server.server)
            .get('/-1470687311')
            .end(function(err, res) {
                expect(res.body).to.eql(testJSON);
                done();
            });
    });

    it('/August 8th 2016 GET should return the correct Unix timestamp, 1470687311', function() {

        var testJSON = { unix: 1470687311, natural_date: 'August 8th 2016' };

        chai.request(server.server)
            .get('/August 8th 2016')
            .end(function(err, res) {
                expect(res.body).to.eql(testJSON);
                done();
            });
    });

    it('/August 8th 20166 GET should return null', function() {

        var testJSON = { unix: null, natural_date: null };

        chai.request(server.server)
            .get('/August 8th 20166')
            .end(function(err, res) {
                expect(res.body).to.eql(testJSON);
                done();
            });
    });

    it('/August 38th 2016 GET should return null', function() {

        var testJSON = { unix: null, natural_date: null };

        chai.request(server.server)
            .get('/August 38th 2016')
            .end(function(err, res) {
                expect(res.body).to.eql(testJSON);
                done();
            });
    });

    it('/Augus 8th 2016 GET should return null', function() {

        var testJSON = { unix: null, natural_date: null };

        chai.request(server.server)
            .get('/Augus 38th 2016')
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

    describe('validateDate', function() {

        it('if natural date format is valid (MMMM Do YYYY) return the date', function() {
            var validDate = server.timeHelpers.validateDate('August 8th 2016');

            expect(validDate).to.eql('August 8th 2016');
        });

        it('if month is invalid, return false', function() {
            var invalidMonth = server.timeHelpers.validateDate('Augus 8th 2016');

            expect(invalidMonth).to.be.false;
        });

        it('if day is invalid, return false', function() {
            var invalidDay = server.timeHelpers.validateDate('August 54th 2016');

            expect(invalidDay).to.be.false;
        });

        it('if year is invalid, return false', function() {
            var invalidYear = server.timeHelpers.validateDate('August 8th 20166');

            expect(invalidYear).to.be.false;
        });

    });
});
