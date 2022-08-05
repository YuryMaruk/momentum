const timeClass = document.querySelector('.time'),
    dateClass = document.querySelector('.date'),
    greetingSpan = document.querySelector('.greeting-span'),
    greetingInput = document.querySelector('.greeting-input'),
    body = document.querySelector('.body'),
    slideNext = document.querySelector('.slide-next'),
    slidePrev = document.querySelector('.slide-prev'),
    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    city = document.querySelector('.city'),
    buttonQuote = document.querySelector('.change-quote'),
    quote = document.querySelector('.quote'),
    author = document.querySelector('.author'),
    playPrev = document.querySelector('.play-prev'),
    playNext = document.querySelector('.play-next'),
    play = document.querySelector('.play');

let randomNum = 0,
    isPlay = false;


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

getRandomInt(1, 21);


function setBg() {              /*  function set random background image */
    const timeOfDay = getTimeOfDay();
    const img = new Image();

    randomNum < 10 ? randomNum = String(randomNum).padStart(2, 0) : randomNum;
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg`;
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
    };
}

function getSlideNext() {   /* function change background image when user click element rightArrow */
    randomNum === 20 ? randomNum = 1 : randomNum++;
    setBg();
}

function getSlidePrev() {   /* function change background image when user click element leftArrow */
    randomNum === '01' ? randomNum = 20 : randomNum--;
    setBg();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

setBg(); /* set background image when load page */

/* Weather widget */

async function getWeather() {  /* function return weather*/
    city.value === '' ? city.value = 'Минск' : false;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=8e1bd9aa041e2c8646f4afd33df4d61b&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
}

city.addEventListener('change', getWeather);

getWeather();

/* Quote widget */

async function getQuote() {      /*function return random quote */
    const quotes = '../json/data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    const randomNumber = getRandomInt(0, data.length);
    const quotesItem = data[randomNum];

    quote.textContent = quotesItem.text;
    author.textContent = quotesItem.author;
}

buttonQuote.addEventListener('click', getQuote);

getQuote();

/* Audio player */

const audio = new Audio();

function playAudio() {
    audio.src = "../audio/audio2.mp3";
    audio.currentTime = 0;

    if(!isPlay){
        audio.play();
        isPlay = true;
        console.log('play');
    } else {
        audio.pause();
        isPlay = false;
        console.log('pause');
    };

    play.classList.toggle('pause');
}

play.addEventListener('click', playAudio);


/* playAudio(); */








