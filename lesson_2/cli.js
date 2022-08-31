#!/usr/bin/env node

const fs = require("fs");
const { stdin, exit } = require("process");
const readline = require("readline");
// const yargs = require("yargs");
const path = require('path');
const inquirer = require('inquirer');



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
// const list = fs.readdirSync(executionDir).filter(fileFilter);
let executionDir = process.cwd();
const MESSAGE_CHOOSE_PATH = 'Выбрать свой путь';


const getList = (dirPath) => {
  let l = fs.readdirSync(dirPath)
  l.unshift(MESSAGE_CHOOSE_PATH)
  // console.log(l); exit();
  return l
}

let list = getList(executionDir);

const showPathContent = (fullFilePath) => {
  if (fs.lstatSync(fullFilePath).isDirectory()) {
    list = fs.readdirSync(fullFilePath);
    executionDir = fullFilePath;
    askQuestion();
  } else {
    console.log("FullFilePath ---> ", fullFilePath);
    fs.readFile(fullFilePath, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
    });
  }
}

const askQuestion = () => {
  inquirer
  .prompt([
    {
      name: "fileName",
      type: "list", // input, number, confirm, list, checkbox, password
      message: "Выбeрите файл для чтения",
      choices: list,
    },
  ])
  .then(({ fileName }) => {
    if (fileName == MESSAGE_CHOOSE_PATH) {
      inquirer
      .prompt([
        {
          name: "promptPath",
          type: "input", // input, number, confirm, list, checkbox, password
          message: "Введите путь до файла/папка",
        },
      ])
      .then(({promptPath}) => {
        if (fs.existsSync(promptPath)) {
          showPathContent(promptPath)
        } else {
          console.log('Wrong path', promptPath)
          exit()
        }
        
      })
    } else {
      const fullFilePath = path.join(executionDir, fileName);
      showPathContent(fullFilePath)
    }
  });
}

askQuestion();


