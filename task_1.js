
const colors = require('colors');

const from = process.argv[2];
const to = process.argv[3];
let counter = 0;

if(isNaN(from) || isNaN(to)) {
	console.log(colors.red("Вы ввели некорректные значения"));
	return;
}

const isPrimeNumber = (number) => {
	if (number <= 1) {
		return false;
	}
	for(let i = 2; i < number; i++){
		if(number % i === 0){
			return false;
		}
		return true;
	}
}


const printNumber = (number) => {
	let colorType = counter % 3;
	switch(colorType) {
		case 0:
			console.log(colors.green(`${number}`));
			break;
		case 1:
			console.log(colors.yellow(`${number}`));
			break;
		case 2:
			console.log(colors.red(`${number}`));
			break;
	}
}

for(let i = from; i <= to; i++) {
	if(isPrimeNumber(i)) {
		printNumber(i);
		counter++;
	}
}
