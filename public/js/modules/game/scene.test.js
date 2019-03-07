const Scene = require('./scene.js');

describe('check upper cell', ()=> {
    beforeAll(() => {
        Object.defineProperty(window.bus, 'subscribe', {
          configurable: true,
        });
        window.bus.subscribe = jest.fn();
    });

    const scene = new Scene();
    const window = {
        bus: {
            subscribe: jest.fn()
        }
    }
    
    it('should be up', ()=>{
        const from = 8;
        const to = 1;
        
        const expected = 'up';
        const actual = Scene(from, to);
        expect(actual).toEqual(expected);
    });
    
    it('should be 0', ()=>{
        jest.spyOn(window.bus, 'subscribe');
        const from = 6;
        const to = 1;
        
        const expected = '0';
        const actual = Scene(from, to);
        expect(actual).toEqual(expected);
    });
});

// describe('check left cell', ()=> {
//     const scene = new Scene();

//     it('smth', ()=>{

//     });
// });

// describe('check right cell', ()=> {
//     const scene = new Scene();

//     it('smth', ()=>{

//     });
// });

// describe('check down cell', ()=> {
//     const scene = new Scene();

//     it('smth', ()=>{

//     });
// });