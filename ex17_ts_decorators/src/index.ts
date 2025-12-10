function theClassDecorator(constructor: any): any {
    return class extends constructor {
        createdAt = new Date();
    };
}

function thePropDecoratorReadonly(target: any, key: string): void {
    let value: any;
    const getter = function () {
      return value;
    };
    const setter = function (newValue: any) {
        if (value === undefined) {
            value = newValue;
        } else {
            throw new Error('property "' + key + '" is readonly');
        }
    };
    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
    });
}

function theMethodDecoratorLog(target: any, key: string, description: PropertyDescriptor): void {
    const original = description.value;
    description.value = function (...args: any[]) {
        console.log(`Called method ${key} with args: `, args);
        const result = original.apply(this, args);
        console.log('Method result: ', result);
        return result;
    }
}

function theParamDecoratorLog(target: any, key: string, index: number): void {
    console.log(`Called method ${key} parameter index: ${index}`);
}

@theClassDecorator
class User {
    @thePropDecoratorReadonly
    username: string;
    private age: number;

    // the comment!
    constructor(username: string, age: number) {
        this.username = username;
        this.age = age;
    }

    @theMethodDecoratorLog
    greet(@theParamDecoratorLog message: string, @theParamDecoratorLog showMessage: boolean = true): string {
        if(showMessage) {
            return `${message}, ${this.username} (${this.age})!`;
        }
        return `${this.username} (${this.age})!`;
    }
}

const user1 = new User("Ivan", 21);

console.log('Test Param Decorator Log (See console log)');

// Uncomment below line to test @theParamDecoratorLog
// throw 'STOP';

// @ts-ignore (see reportableClassDecorator in https://www.typescriptlang.org/docs/handbook/decorators.html#class-decorators)
console.log('Test Class Decorator TEST >>> ', user1.createdAt);
// throw 'STOP';

// Uncomment below two lines to test @thePropDecoratorReadonly
// console.log('The Property Decorator Readonly Test:')
// user1.username = "Petr";

console.log('Test Method Decorator Log:');
console.log(user1.greet("Здравствуйте"));
console.log(user1.greet("Здравствуйте", false));
