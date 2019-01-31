const expect = require('expect');

const {generateMessage} = require('./message');

describe('generate message', () => {
    it('should generate the correct message object', () => {
        let from = 'Me';
        let text = 'text';
        let message = generateMessage(from , text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text})
    });
});