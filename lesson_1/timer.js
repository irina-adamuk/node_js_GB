const colors = require('colors');
const readline = require('readline');
const moment = require('moment')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getTimeRemaining = (endTime) => { 
  const t = moment(endTime, "DD/MM/YYYY") - Date.parse(new Date());
  const seconds = Math.floor( (t/1000) % 60 ).toString();  
  const minutes = Math.floor( (t/1000/60) % 60 ).toString();  
  const hours = Math.floor( (t/(1000*60*60)) % 24 ).toString();  
  const days = Math.floor( t/(1000*60*60*24)).toString();
	
  return {  
    'total': t, 
    'days': days,  
    'hours': hours,  
    'minutes': minutes,  
    'seconds': seconds  
  };  
}
const getZero = (num) => {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

const initializeClock = (endTime) => {
	let timeInterval = setInterval(() => {
		let t = getTimeRemaining(endTime);
    let days = getZero(t.days);
    let hours = getZero(t.hours);
    let minutes = getZero(t.minutes);
    let seconds = getZero(t.seconds);

		console.log(`${colors.bgMagenta('До выбранной Вами даты осталось:')}${colors.bgBlue(' дней: ' + (days))}${colors.bgGreen(' часов: ' + (hours))}${colors.bgMagenta(' минут: ' + (minutes))}${colors.bgYellow(' секунд: ' + (seconds))}`)

		if(t.total <= 0) {
			clearInterval(timeInterval);
		}
	}, 1000)
}

rl.question(`${colors.rainbow('Введите дату для обратного отсчета в формате: ')}${colors.blue("дд/мм/гггг:")} `, (answer) => {
  console.log(colors.bgBlue("Спасибо за Ваш ответ"));
  console.log(colors.bgYellow(`Дата для обратного отсчета: ` + colors.bgCyan(answer)));
  
  rl.close();
  initializeClock(answer);
})

