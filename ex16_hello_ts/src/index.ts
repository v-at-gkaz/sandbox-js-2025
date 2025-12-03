import {User, User2, User3, qwe} from "./lib.js";

function check(user: User): boolean {
    return user.age >=18;
}

const user1: User = {
    name: "Masha",
    age: 12,
};

const user2: User = {
    name: "Ivan",
    age: 23
};

const user3: User2 = {
    name: "Johnson"
};

const user4 = new User3('Vasya');

console.log(`Access to the user ${user1.name}: ${check(user1) ? 'Allow' : 'Deny'}`);
console.log(`Access to the user ${user2.name}: ${check(user2) ? 'Allow' : 'Deny'}`);

console.log('qwe=', qwe);
console.log('user3=', user3);
console.log('user4=', user4);