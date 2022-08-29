const fs = require("fs");

const ACCESS_LOG = "./access.log";
const rl = require('readline');

const readStream = fs.createReadStream(ACCESS_LOG, "utf8");

readInterface = rl.createInterface({
	input: readStream
});

readInterface.on('line', (line) => {
	let ip = line.split(' - - ')[0];
	let str = fs.createWriteStream(`./logs/${ip}.requested_logs`, {encoding: 'utf8', flags: 'a'})
	str.write(line + '\n');
	str.end();
})
