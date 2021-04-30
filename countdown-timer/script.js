const daysElement = document.getElementById('days-c');
const hoursElement = document.getElementById('hours-c');
const minutesElement = document.getElementById('minutes-c');
const secondsElement = document.getElementById('seconds-c');

const santBartomeu = '23 Aug 2021'

function countdown() {
    const santBartomeuDate = new Date(santBartomeu);
    const currentDate = new Date();
    const dateInMillis = (santBartomeuDate - currentDate) / 1000;
    
    const days = Math.floor(dateInMillis / (3600 * 24));
    const hours = Math.floor(dateInMillis / 3600) % 24;
    const minutes = Math.floor(dateInMillis / 60) % 60;
    const seconds = Math.floor(dateInMillis) % 60;

    daysElement.innerHTML = formatTime(days);
    hoursElement.innerHTML = formatTime(hours);
    minutesElement.innerHTML = formatTime(minutes);
    secondsElement.innerHTML = formatTime(seconds);
}

function formatTime(time){
    return time < 10 ? `0${time}` : time;
}

//initial call
countdown();

setInterval(countdown, 1000)