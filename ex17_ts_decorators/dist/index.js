"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function timestamped(constructor) {
    return class extends constructor {
        constructor() {
            super(...arguments);
            this.createdAt = new Date();
        }
    };
}
function readonly(target, key) {
    console.log('debug @readonly > ', key, target);
}
let User = class User {
    constructor(username, age) {
        this.username = username;
        this.age = age;
    }
    greet(message) {
        return `${message}, ${this.username} (${this.age})!`;
    }
};
__decorate([
    readonly
], User.prototype, "username", void 0);
User = __decorate([
    timestamped
], User);
const user1 = new User("Ivan", 21);
console.log(user1.greet("Здравствуйте"));
