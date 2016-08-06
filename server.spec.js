var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./server');
var expect = chai.expect();

chai.use(chaiHttp);

describe('Server', function() {
    it('/ GET should respond with a 200 code', function() {
        chai.request(server)
            .get('/')
            .end(function(err, res) {
                expect(res).to.have.status(200);
            });
    });
});