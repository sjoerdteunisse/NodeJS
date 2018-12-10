class Game {
    constructor(name, prod, yr, tp, uId){
        this.name = name.trim();
        this.producer = prod;
        this.year = yr;
        this.type = tp;
        this.userId = uId;
    }
}

module.exports = Game;

