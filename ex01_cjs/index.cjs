const Square = require('./square.cjs');

const {f1, f2, a} = require('./example_exports.cjs');
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

// async/await way
(async () => {
    try {
        const result = await test();
        console.log('result', result);
    } catch(e){
        console.error(`error detected: ${e}`);
    }
})();

// scassical way
// test().then(res=>{
// console.log('success detected', res);
// }).catch(err=>{
// console.error(`error detected: ${err}`);
// }).finally(()=>{
// console.log('finaly detected');
// });

// wrong way (for cjs)
// try {
//     const result = await test();
//     console.log('result', result);
// } catch(e){
//     console.error(`error detected: ${e}`);
// }