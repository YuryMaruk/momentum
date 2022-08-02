const timeClass = document.querySelector('.time'),
    dateClass = document.querySelector('.date'),
    greetingSpan = document.querySelector('.greeting-span'),
    greetingInput = document.querySelector('.greeting-input'),
    body = document.querySelector('.body');

/* Show time */

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    timeClass.textContent = currentTime;
    setInterval(showTime, 1000);
}

showTime();

/* Show date */

function showDate() {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: '2-digit' };
    const currentDate = date.toLocaleDateString('en-En', options);
    dateClass.textContent = currentDate;
    setInterval(showDate, 1000);
}

showDate();

/* Show greeting */

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    greetingSpan.textContent = `Good ${timeOfDay}`;
    setInterval(showGreeting, 1000);
}

function getTimeOfDay() {    /* This function returns the time of day */
    const objOfDate = new Date();
    const hours = objOfDate.getHours();
    let timeOfDay = '';
    let partOfDay = hours / 6;

    switch (Math.floor(partOfDay)) {
        case 0:
            timeOfDay = 'night';
            break;
        case 1:
            timeOfDay = 'morning';
            break;
        case 2:
            timeOfDay = 'afternoon';
            break;
        case 3:
            timeOfDay = 'evening';
            break;
    }

    return timeOfDay;
}

showGreeting();

/* Show name of user */

function setLocalStorage() {
    localStorage.setItem('userName', greetingInput.value);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('userName')) {
        greetingInput.value = localStorage.getItem('userName');
    }
}
window.addEventListener('load', getLocalStorage);

/* Slider background images */

function getRandomInt(min, max) { /* function return random number from min to max */
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function setBg() {              /*  function set random background image */
    timeOfDay = getTimeOfDay();
    bgNum = getRandomInt(1, 20);
    bgNum < 10 ? bgNum = String(bgNum).padStart(2, 0) : bgNum;
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
}

setBg();









