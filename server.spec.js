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
});

describe('timeHelpers', function() {

    describe('isUnixTimestamp', function() {
        it('Time should be returned as a number', function() {
            var newTime = server.timeHelpers.isUnixTimestamp('4');

            expect(newTime).to.be.a('number');
        })
    });
});