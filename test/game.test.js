
const chai = require('chai')
const assert = require('assert')
const Game = require('../src/models/game.model')


chai.should();


describe('Game', () => {

it('Should be initialized succesfully when privind valid arguments', (done) => {

    const game = new Game(' abc ', ' def ', 2018, ' fps ');


    game.should.have.property('name').that.is.a('string').and.equals('abc');
    game.name.should.be.a('string');
    game.should.have.property('year').equal(2018);
    game.should.not.have.property('password');

    assert.equal(game.name ,'abc', 'Names do not match');

    done();
});


});

