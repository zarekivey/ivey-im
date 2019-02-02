const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        const res = isRealString(98);
        expect(res).toBe(false);
    })

    it('should reject string with only space characters', () => {
        const res = isRealString('     ');
        expect(res).toBe(false);
    })

    it('should allow a string with normal characters', () => {
        const res = isRealString('  valid   ');
        expect(res).toBe(true);
    })
})