const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generate message', () => {
    it('should generate the correct message object', () => {
        const from = 'Me';
        const text = 'text';
        const message = generateMessage(from , text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text})
    });
});

describe('generateLcationMessage', () => {
    it('should generate correct location object', () => {
        const from ='TestName';
        const latitude = 1;
        const longitude = 2;
        const url = 'https://www.google.com/maps?q=1,2'
        const message = generateLocationMessage(from, latitude, longitude)

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, url})
    });
});