const timeClass = document.querySelector('.time'),
    dateClass = document.querySelector('.date'),
    greetingSpan = document.querySelector('.greeting-span'),
    greetingInput = document.querySelector('.greeting-input'),
    body = document.querySelector('.body'),
    slideNext = document.querySelector('.slide-next'),
    slidePrev = document.querySelector('.slide-prev');

let randomNum = 0;

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
    randomNum = Math.floor(Math.random() * (max - min)) + min;
}


function setBg() {              /*  function set random background image */
    timeOfDay = getTimeOfDay();
    getRandomInt(1, 20);
    randomNum < 10 ? randomNum = String(randomNum).padStart(2, 0) : randomNum;
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg')`;
}

function getSlideNext() {   /* function change background image when user click element rightArrow */
   randomNum  === 20 ? randomNum = 1 : randomNum++;
    setBg();
}

function getSlidePrev() {   /* function change background image when user click element leftArrow */
    randomNum  === 1 ? randomNum = 20 : randomNum--;
     setBg();
 }

 slideNext.addEventListener('click', getSlideNext);
 slidePrev.addEventListener('click', getSlidePrev);



setBg(); /* change background image when load page */









