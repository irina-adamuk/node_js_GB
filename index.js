const http = require("http");
const path = require("path");
const fs = require("fs");
const colors = require('colors');

(async () => {
  const fileFilter = (path) => fs.lstatSync(path).isFile();
  http
    .createServer((request, response) => {
      const fullPath = path.join(process.cwd(), request.url);
      console.log(colors.blue(new Date().toLocaleString()),'>>>>', fullPath);
      if (!fs.existsSync(fullPath))
        return response.end("Папка или файл не найдены");
      if (fileFilter(fullPath)) {
        return fs.createReadStream(fullPath).pipe(response);
      }
      let linkList = "";
      const urlParams = request.url.match(/[\d\w\.]+/gi);

      if (urlParams) {
        urlParams.pop();
        const prevUrl = urlParams.join("/");
        linkList = urlParams.length
          ? `<li><a href="/${prevUrl}"> Hазад </a></li>`
          : `<li><a href='/'> Назад </a></li>`;
      }

      fs.readdirSync(fullPath).forEach((fileName) => {
        const filePath = path.join(request.url, fileName);
        linkList += `<li><a href="${filePath}">${fileName}</a></li>`;
      });
      const HTML = fs
        .readFileSync(path.join(__dirname, "index.html"), "utf-8")
        .replace("##links", linkList);
      response.writeHead(200, {
        "Content-Type": "text/html",
      });
      return response.end(HTML);
    })
    .listen(3000);
})();
