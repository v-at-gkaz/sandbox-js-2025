export interface User {
    name: string;
    age: number;
    parent?: User;
}

export type User2 = {
    name: string;
}

export const qwe = "rty";

export class User3 {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}