const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

const endpointToTest = '/api/games'

describe('Games API POST', () => {

    it('should return a valid game when posting a valid object', (done) => {
 
        chai.request(server)
            .post(endpointToTest)
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

                //debug
                //console.dir(res.body);

                done();
        })
    });
})

describe('Games API POST invalid object', () => {

    it('should return a 500 error on posting an invalid object.', (done) => {
 
        chai.request(server)
            .post(endpointToTest)
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

describe('Calling an invalid route should throw a ApiError', () => {

    it('should return a 404 error.', (done) => {
 
        chai.request(server)
            .get('/api/gameszz')
            .send()
            .end((err, res) => {
                res.should.have.status(404)
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

                apiError.should.have.property('errorName');
                apiError.should.have.property('errorStatus');
                apiError.should.have.property('timeStamp');

                done();
        })
    });
})

describe('Games API PUT', () => {

    it('should return a valid game when puting a valid object', (done) => {
 
        //In memory there is an object in the array at pos 0.

        chai.request(server)
            .put(endpointToTest + "/0")
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
})

describe('Games API GetAll', () => {
    //In memory there is an object in the array at pos 0(default). And added by post, we should have 2 elements total.

    it('should return a valid array of games (2) item', (done) => {
 
        chai.request(server)
            .get(endpointToTest)
            .send()
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')

                console.dir(res.body);
                //Take the first element;
                const Games = res.body;

                for(var i = 0; i < res.body.length; i++){

                    if (res.body.hasOwnProperty('producer') && res.body.hasOwnProperty('year') && res.body.hasOwnProperty('type')) {

                        //Check if properties are still existent in object returned.
                        Games[i].should.have.property('name');
                        Games[i].should.have.property('producer');
                        Games[i].should.have.property('year');
                        Games[i].should.have.property('type');

                        //Do the properties still match?
                        Games[i].name.should.equal('gameName');
                        Games[i].producer.should.equal('producer');
                        Games[i].year.should.equal(2018);
                        Games[i].type.should.equal('typeOfGame');
                    }
                }
                //debug
                //console.dir(res.body);
                done();
        })
    });
})

describe('Games API GetById', () => {

    it('should return a valid game when getting object at position 1', (done) => {
 
        chai.request(server)
            .get(endpointToTest + '/1')
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


                //Do the properties still match?
                Games.name.should.equal('gameName');
                Games.producer.should.equal('producer');
                Games.year.should.equal(2018);
                Games.type.should.equal('typeOfGame');

                done();
        })
    });
})

describe('Games API Delete', () => {

    it('should return status 200 and the message succesfully removed ', (done) => {
 
        chai.request(server)
            .del(endpointToTest + '/1')
            .send()
            .end((err, res) => {
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