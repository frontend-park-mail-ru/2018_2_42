const Unit = require('./unit.js');
const TEAMS = require('../conf/teams.js');
const WEAPONS = require('../conf/weapons.js');

describe('check same weapon fight', ()=>{
    it('should be tie PAPER-PAPER', ()=>{
        const u1 = new Unit(null, WEAPONS.PAPER);
        const u2 = new Unit(null, WEAPONS.PAPER);

        const expected = null;
        const actual = Unit.GetWinner(u1, u2)

        expect(actual).toEqual(expected, 'expected tie PAPER-PAPER');
    });

    it('should be tie ROCK-ROCK', ()=>{
        const u1 = new Unit(null, WEAPONS.ROCK);
        const u2 = new Unit(null, WEAPONS.ROCK);
        
        const expected = null;
        const actual = Unit.GetWinner(u1, u2)

        expect(actual).toEqual(expected, 'expected tie ROCK-ROCK');
    });

    it('should be tie SCISSORS-SCISSORS', ()=>{
        const u1 = new Unit(null, WEAPONS.SCISSORS);
        const u2 = new Unit(null, WEAPONS.SCISSORS);
        
        const expected = null;
        const actual = Unit.GetWinner(u1, u2)

        expect(actual).toEqual(expected, 'expected tie SCISSORS-SCISSORS');
    });
});

describe('check 1st argument', ()=>{
    it('should be 1st unit winner', ()=>{
        const u1 = new Unit(null, WEAPONS.SCISSORS);
        const u2 = new Unit(null, WEAPONS.PAPER);

        const expected = u1;
        const actual = Unit.GetWinner(u1, u2)

        expect(actual).toEqual(expected);
    });

    it('should be 2nd winner', ()=>{
        const u1 = new Unit(null, WEAPONS.SCISSORS);
        const u2 = new Unit(null, WEAPONS.ROCK);

        const expected = u2;
        const actual = Unit.GetWinner(u1, u2)

        expect(actual).toEqual(expected);
    });

    it('should be 1st winner', ()=>{
        const u1 = new Unit(null, WEAPONS.PAPER);
        const u2 = new Unit(null, WEAPONS.ROCK);

        const expected = u1;
        const actual = Unit.GetWinner(u1, u2)

        expect(actual).toEqual(expected);
    });

    it('should be 2nd winner', ()=>{
        const u1 = new Unit(null, WEAPONS.PAPER);
        const u2 = new Unit(null, WEAPONS.SCISSORS);

        const expected = u2;
        const actual = Unit.GetWinner(u1, u2)

        expect(actual).toEqual(expected);
    });

    it('should be 1st winner', ()=>{
        const u1 = new Unit(null, WEAPONS.ROCK);
        const u2 = new Unit(null, WEAPONS.SCISSORS);

        const expected = u1;
        const actual = Unit.GetWinner(u1, u2)

        expect(actual).toEqual(expected);
    });

    it('should be 2nd winner', ()=>{
        const u1 = new Unit(null, WEAPONS.ROCK);
        const u2 = new Unit(null, WEAPONS.PAPER);

        const expected = u2;
        const actual = Unit.GetWinner(u1, u2)

        expect(actual).toEqual(expected, 'expected paper win rock');
    });
});

describe('check 2nd argument', ()=>{
    it('should be 2nd winner', ()=>{
        const u1 = new Unit(null, WEAPONS.PAPER);
        const u2 = new Unit(null, WEAPONS.SCISSORS);

        const expected = u2;
        const actual = Unit.GetWinner(u1, u2)

        expect(actual).toEqual(expected);
    });

    it('should be 1st winner', ()=>{
        const u1 = new Unit(null, WEAPONS.ROCK);
        const u2 = new Unit(null, WEAPONS.SCISSORS);

        const expected = u1;
        const actual = Unit.GetWinner(u1, u2)

        expect(actual).toEqual(expected);
    });

    it('should be 2nd winner', ()=>{
        const u1 = new Unit(null, WEAPONS.ROCK);
        const u2 = new Unit(null, WEAPONS.PAPER);

        const expected = u2;
        const actual = Unit.GetWinner(u1, u2)

        expect(actual).toEqual(expected);
    });

    it('should be 1st winner', ()=>{
        const u1 = new Unit(null, WEAPONS.SCISSORS);
        const u2 = new Unit(null, WEAPONS.PAPER);

        const expected = u1;
        const actual = Unit.GetWinner(u1, u2)

        expect(actual).toEqual(expected);
    });

    it('should be 2nd winner', ()=>{
        const u1 = new Unit(null, WEAPONS.SCISSORS);
        const u2 = new Unit(null, WEAPONS.ROCK);

        const expected = u2;
        const actual = Unit.GetWinner(u1, u2)

        expect(actual).toEqual(expected);
    });

    it('should be 1st winner', ()=>{
        const u1 = new Unit(null, WEAPONS.PAPER);
        const u2 = new Unit(null, WEAPONS.ROCK);

        const expected = u1;
        const actual = Unit.GetWinner(u1, u2)

        expect(actual).toEqual(expected);
    });
});