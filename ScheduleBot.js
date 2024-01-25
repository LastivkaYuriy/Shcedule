const TelegramBot = require('node-telegram-bot-api');

const schedule = require('./Schedule.json');

const token = '6536164660:AAF_X3XoLKbCuRA24ifpy27ZK6J7JwMCzUY';
const DashaID = "375031131";
const bot = new TelegramBot(token, { polling: true });

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

const intervalInMilliseconds = 1 * 60 * 1000;

function writeReminder(text){
    bot.sendMessage(DashaID, text)
        .then(sentMessage => {
          console.log(`Message sent successfully: ${sentMessage.text}`);
        })
        .catch(error => {
          console.error(`Error sending message: ${error.message}`);
        });
}

function Scheduler(){
    schedule.forEach((task) => {
        if(getCurrentTime() == task.start_time){
            writeReminder(`${task.name}
            ${task.time_of_day}
            ${task.text}`)
        }
    })
}

setInterval(Scheduler, intervalInMilliseconds);