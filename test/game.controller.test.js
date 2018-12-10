const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

const endpointToTest = '/api/games';

describe('Games API POST', () => {


    it('should return a valid game when posting a valid object', (done) => {

        const token = require('../test/authorization.controller.test').token;

        console.log('TOKENA ' + token)
        chai.request(server)
            .post(endpointToTest)
            .set('x-access-token', token)
            .send({
                'name': 'gameName',
                'producer': 'producer',
                'year': 2018,
                'type': 'typeOfGame'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                //Get object from body the response.
                const Games = res.body;
                
                //Check if properties are still existent in object returned.
                Games.should.have.property('name');
                Games.should.have.property('producer');
                Games.should.have.property('year');
                Games.should.have.property('type');


                //Do the properties still match?
                Games.name.should.equal('gameName');
                Games.producer.should.equal('producer');
                Games.year.should.equal(2018);
                Games.type.should.equal('typeOfGame');
                
                done();
        })
    });

    it('should return a 500 error on posting an invalid object.', (done) => {
        const token = require('../test/authorization.controller.test').token;

        console.log('before exception tk=' + token);
        chai.request(server)
            .post(endpointToTest)
            .set('x-access-token', token)
            .send({
                'name': 'gameName',
            })
            .end((err, res) => {
                res.should.have.status(500)

                res.body.should.be.a('object')

                done();
        })
    });
})

describe('Calling an invalid route or failed call, should return an object of type ApiError', () => {

    it('should return a 404 error.', (done) => {

        chai.request(server)
            .get('/api/gameszz')
            .send()
            .end((err, res) => {
                res.should.have.status(404)

                res.body.should.be.a('object');

                const apiError = res.body;

                //Check if properties are still existent in object returned.
                apiError.should.have.property('errorName');
                apiError.should.have.property('errorStatus');
                apiError.should.have.property('timeStamp');

                 //Check if values match the expected return value.
                 apiError.errorName.should.equal('Non existing endpoint');

                done();
        })
    });
})

describe('Games API PUT', () => {

    it('should return a valid game when puting a valid object', (done) => {
        const token = require('../test/authorization.controller.test').token;

        chai.request(server)
            .put(endpointToTest + "/1")
            .set('x-access-token', token)
            .send({
                'name': 'gameName',
                'producer': 'producer',
                'year': 2018,
                'type': 'typeOfGame'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const Games = res.body;
                
                //Check if properties are still existent in object returned.
                Games.should.have.property('name');
                Games.should.have.property('producer');
                Games.should.have.property('year');
                Games.should.have.property('type');


                //Do the properties still match?
                Games.name.should.equal('gameName');
                Games.producer.should.equal('producer');
                Games.year.should.equal(2018);
                Games.type.should.equal('typeOfGame');

                
                //debug
                //console.dir(res.body);
                
                done();
        })
    });

    it('should return a 404 error that object cannot be modified as it is non existent', (done) => {
        const token = require('../test/authorization.controller.test').token;

        chai.request(server)
            .put(endpointToTest + "/50")
            .set('x-access-token', token)
            .send({
                'name': 'gameName',
                'type': 'typeOfGame'
            })
            .end((err, res) => {
                res.should.have.status(404)
                res.body.should.be.a('object')

                const response = res.body;
                
                //Check if properties are still existent in object returned.
                 response.should.have.property('errorName');
                 response.should.have.property('timeStamp');
                 response.should.have.property('errorStatus');

                // //Do the properties still match?
                response.errorName.should.equal('Object not found');


                done();
        })
    });
})


describe('Games API GetAll', () => {

    it('should return a valid array of games (x) item', (done) => {
        const token = require('../test/authorization.controller.test').token;

        chai.request(server)
            .get(endpointToTest)
            .set('x-access-token', token)
            .send()
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')

                console.dir(res.body);
                //Take the first element;
                const Games = res.body;

                for(var i = 0; i < Games.length; i++){

                    //Object games consists out of (name, producer, year, type)
                    if(Games[i].name && Games[i].producer && Games[i].year  && Games[i].type){

                        //Check if properties are still existent in object returned.
                        Games[i].should.have.property('name');
                        Games[i].should.have.property('producer');
                        Games[i].should.have.property('year');
                        Games[i].should.have.property('type');
                    }
                }
                done();
        })
    });
})

describe('Games API GetById', () => {

    it('should return a valid game when getting object at position 3', (done) => {
        const token = require('../test/authorization.controller.test').token;
 
        chai.request(server)
            .get(endpointToTest + '/1')
            .set('x-access-token', token)
            .send()
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const Games = res.body;
                
                //Check if properties are still existent in object returned.
                Games.should.have.property('name');
                Games.should.have.property('producer');
                Games.should.have.property('year');
                Games.should.have.property('type');

                done();
        })
    });
})

describe('Games API Delete', () => {

    it('should return status 200 and the message succesfully removed ', (done) => {
        const token = require('../test/authorization.controller.test').token;
 
        chai.request(server)
            .del(endpointToTest + '/1')
            .set('x-access-token', token)
            .send()
            .end((err, res) => {
                console.log('identi' + err)
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body;
                
                //Check if properties are still existent in object returned.
                response.should.have.property('message');

                //Do the properties still match?
                response.message.should.equal('Succesfully removed');

                //console.dir(res.body);
                done();
        })
    });
})


describe('Games API Delete Non Existing', () => {

    it('should return status 404', (done) => {
        const token = require('../test/authorization.controller.test').token;

        chai.request(server)
            .del(endpointToTest + '/1000')
            .set('x-access-token', token)
            .send()
            .end((err, res) => {
                res.should.have.status(404)
                res.body.should.be.a('object')

                const response = res.body;
                
                //Check if properties are still existent in object returned.
                 response.should.have.property('errorName');
                 response.should.have.property('timeStamp');
                 response.should.have.property('errorStatus');

                // //Do the properties still match?
                response.errorName.should.equal('Object not found');

                //console.dir(res.body);
                done();
        })
    });
})