import { exit, stdin, stdout, stderr, argv, env } from 'node:process';
import readline from 'node:readline';
//console.log('Hello');
//exit(147);

//stdout.write("Hello, Stdout\n");
//stderr.write("Hello, Stderr\n");

// const input = [];

// stdin.on('data', data => {
//     console.log('data detected: ', data.toString());
//     input.push(data.toString());
// });

// stdin.on('end', () => {
//     console.log('end tedected. Data: ', input.join("\n"));
//     exit(0);
// });

// stdin.on('close', () => {
//     console.log('close tedected. Data: ', input.join("\n"));
//     exit(0);
// });

// process.on('SIGINT', () => {
//     console.log('SIGINT tedected. Data: ', input.join("\n"));
//     exit(0);
// });

// process.on('SIGTERM', () => {
//     console.log('SIGTERM tedected. Data: ', input.join("\n"));
//     exit(0);
// });

console.log('Набор аргументов argv:', argv);

// console.log('Переменные окружения env:', env);

// exit(0);

const isTTY = stdin.isTTY;

if (isTTY) {
  console.log('Стандартный ввод осуществляется из терминала (TTY) (интерактивный режим)');
} else {
  console.log('Стандартный ввод осуществляется НЕ из терминала (TTY) (режим работы через конвейер)');
}

// создаётся интерфейс для чтения stdin
const rl = readline.createInterface({
  input: stdin,
  output: stdout
});

// с эту переменную собираем данные из стандартного ввода
let input = '';

// обрабатывается событие ввода одной строки (после ввода и нажатия на Enter)
rl.on('line', (line) => {
  console.log(`Прочитана строка: \n${line}`);
  input += line + '\n';
});

// обрабатывается событие получения сигнала завершения приложения (SIGINT)
rl.on('close', () => {
  console.log(`Получен ввод: \n${input}`);
  exit(0);
});

// при плоучении процессом сигнала SIGINT вызывается событие закрытия 
// интерфейса readline
process.on('SIGINT', () => {
  rl.close();
});