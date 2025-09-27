import Square from "./square.mjs";

import {f1, f2, a} from "./example_exports.mjs";
f1();
f2();
console.log('a=', a);

const mySquare = new Square(3);
console.log(`The area of mySquare is ${mySquare.area()}`); 


function test() {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve('success');
        }, 400);
        setTimeout(()=>{
            reject('error');
        }, 500);
    });
}

// OK (mjs)
try {
    const result = await test();
    console.log('result', result);
} catch(e){
    console.error(`error detected: ${e}`);
}