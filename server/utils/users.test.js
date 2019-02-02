const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Bill',
            room: 'B'
        }, {
            id: '2',
            name: 'Jane',
            room: 'C'
        }, {
            id: '3',
            name: 'Zarek',
            room: 'B'
        }]
    });

    it('should add a new user', () => {
        const users = new Users();
        const user = {
            id: '123',
            name: 'Zarek',
            room: 'A'
        };
        const resUser = users.addUser(user.id, user.name, user.room);

        // the added user should look like the user array created above
        expect(users.users).toEqual([user])
    });

    it('should remove a user', () => {
        const userId = '1';
        const user = users.removeUser(userId);
        
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        const userId = '99';
        const user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find a user', () => {
        const userId = '2';
        const user = users.getUser(userId);

        // expect it to be the given id
        expect(user.id).toBe(userId)
    });

    it('should not find a user', () => {
        const userId = '6';
        const user = users.getUser(userId);

        expect(user).toNotExist();
    });

    it('should return names for B', () => {
        const userList = users.getUserList('B');
        
        expect(userList).toEqual(['Bill', 'Zarek'])
    });

    it('should return names for A', () => {
        const userList = users.getUserList('C');
        
        expect(userList).toEqual(['Jane'])
    });
})