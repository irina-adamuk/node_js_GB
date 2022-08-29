#!/usr/bin/env node

const fs = require("fs");
const { stdin } = require("process");
const readline = require("readline");
// const yargs = require("yargs");
const path = require('path');
const inquirer = require('inquirer');

const executionDir = process.cwd();

// console.log(process.argv);

const [filePath] = process.argv.slice(2);

// const options = yargs.usage("Use: -p <path to file>").options("p", {
//   alias: "path",
//   describe: "Path to file",
//   type: "string",
//   demandOption: true,
// }).argv;
// console.log(options);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// rl.question("Введите путь до файла: ", (filePath) => {
//   rl.question("Введите кодировку файла: ", (encode) => {
//     fs.readFile(filePath, "utf8", (err, data) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log(data);
//       rl.close();
//     });
//   });
// });

// const question = async (query) =>
//   new Promise((resolve, reject) => {
//     rl.question(query, (data) => resolve(data));
//   });

// (async () => {
//   const filePath = await question("Введите путь до файла: ");
//   const encode = await question("Введите кодировку файла: ");

// 	console.log(path.join(__dirname, filePath))
//   fs.readFile(filePath, encode, (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(data);

//   });
// 	rl.close();
// })();



const fileFilter = (fileOrDir) => fs.lstatSync(fileOrDir).isFile();
const list = fs.readdirSync(executionDir).filter(fileFilter);

// console.log(list);

inquirer
  .prompt([
    {
      name: "fileName",
      type: "list", // input, number, confirm, list, checkbox, password
      message: "Выбирите файл для чтения",
      choices: list,
    },
  ])
  .then(({ fileName }) => {

    const fullFilePath = path.join(executionDir, fileName);

    fs.readFile(fullFilePath, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
    });
  });
