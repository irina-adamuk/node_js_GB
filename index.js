const http = require("http");
const url = require("url");
const fs = require("fs");

// ? for optimization
const cluster = require("cluster");
const os = require("os");
// ? for optimization

// const server = http.createServer((request, response) => {
// response.write('hello 3');
// response.end();

// console.log('url: ', request.url);
// console.log('method: ', request.method);
// console.log('headers: ', request.headers)

// response.setHeader("test-Header", "test");

// response.writeHead(200, 'OK!', {
// 	'test-Header' : "test"
// })

//URL

// 	if (request.url === '/users') {
// 		response.end('User found')
// 	} else {
// 		response.writeHead(404, 'User not found', {
// 			'test-Header': 'test-test'
// 		})
// 		response.end('user not found');
// 	}

// if( request.method === 'GET') {
// 	response.end('hello')
// } else {
// 	response.writeHead(405, 'Method not allowed');
// 	response.end('Method not allowed')
// }

// if (request.method === "GET") {
//   if (request.url) {
//     const { query } = url.parse(request.url, true);
//     console.log(query);
//   }

//   response.end("hello!");
// } else if (request.method === "POST") {
//   let data = "";

//   request.on("data", (chunk) => (data += chunk));
//   request.on("end", () => {
//     console.log("data", JSON.parse(data));
//     response.writeHead(200, "OK", {
//       "Content-Type": "application/json",
//     });
//     response.end(data);
//   });
// }

// const file = fs.readFileSync("index.html");

// response.writeHead(200, "OK", {
//   "Content-Type": "text/plain",
// });
// response.end(file);

// ?});

// METHOD

// server.listen(5555, () =>
//   console.log("Server been started http://localhost:5555")
// );

// ? Optimization _____________

// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running...`);

//   for (let i = 0; i < os.cpus().length; i++) {
//     console.log(`Forking process number ${i}`);
//     cluster.fork();
//   }
// } else {
//   console.log(`Worker ${process.pid} is running`);
//   http
//     .createServer((req, res) => {
//       setTimeout(() => {
//         const file = fs.readFileSync("index.html");

//         response.writeHead(200, "OK", {
//           "Content-Type": "text/html",
//         });
//         console.log(`Send file ${process.pid}`)
//         response.end(file);
//       }, 3000);
//     })
//     .listen(5555, () =>
//       console.log("Server been started http://localhost:5555")
//     );
// }
// ? Optimization _____________

// ----------------------------------------------------------------

// ? stream version _____________

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running...`);

  for (let i = 0; i < os.cpus().length; i++) {
    console.log(`Forking process number ${i}`);
    cluster.fork();
  }
} else {
  console.log(`Worker ${process.pid} is running`);
  http
    .createServer((req, res) => {
      setTimeout(() => {
        const readStream = fs.createReadStream("index.html");
        response.writeHead(200, "OK", {
          "Content-Type": "text/html",
        });
        
        console.log(`Send file ${process.pid}`)
        readStream.pipe(response)
      }, 3000);
    })
    .listen(5555, () =>
      console.log("Server been started http://localhost:5555")
    );
}
// ? stream version _____________
