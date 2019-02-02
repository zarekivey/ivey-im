class Users {
    constructor() {
        this.users = [];
    }
    // new user and all of their info
    addUser (id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser (id) {
        const user = this.getUser(id);

        if (user) {
            // a new array not containing the selected user
            this.users = this.users.filter((user) => user.id !== id)
        }

        return user;
    }
    getUser (id) {
        // finding the user
        return this.users.filter((user) => user.id === id)[0]
    }
    getUserList (room) {
        // if the users room matches 
        const users = this.users.filter((user) => user.room === room);
        // array pf the users that match
        const namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};