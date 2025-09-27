import Square from "./square.mjs";

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