import playList from "./playList.js";

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
    playPrevBtn = document.querySelector('.play-prev'),
    playNextBtn = document.querySelector('.play-next'),
    playBtn = document.querySelector('.play'),
    ulPlayList = document.querySelector('.play-list');


let randomNum = 0,
    isPlay = false,
    playNum = 0,
    languege = 'en';


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

async function getWeather(lang) {  /* function return weather*/
    let town = '';
    switch (lang) {
        case 'ru':
            town = 'Минск';
            break;
        case 'en':
            town = 'Minsk';
            break;
    }
    city.value === '' ? city.value = town : false;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=8e1bd9aa041e2c8646f4afd33df4d61b&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
}

city.addEventListener('change', () => getWeather(languege));

getWeather(languege);

/* Quote widget */

async function getQuote(lang) {      /*function return random quote */
    let quotes = '';

    switch (lang) {
        case 'ru':
            quotes = '../json/data.json';
            break;
        case 'en':
            quotes = '../json/dataEN.json';
            break;
    }

    const res = await fetch(quotes);
    const data = await res.json();
    const randomNumber = getRandomInt(0, data.length);
    const quotesItem = data[randomNum];

    quote.textContent = quotesItem.text;
    author.textContent = quotesItem.author;
}

buttonQuote.addEventListener('click', () => getQuote(languege));

getQuote(languege);

/* Audio player */

/* add tittle tracks in player */

playList.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = `${item.title} | ${item.duration}`;
    ulPlayList.append(li);
})

const playItems = document.querySelectorAll('.play-item');


function highlightTrack(list) { /* function highlights the song that's playing */
    list.forEach(item => {
        item.classList.remove('item-active');
    })
    list[playNum].classList.add('item-active');
}

const audio = new Audio();

function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;

    highlightTrack(playItems);
    playBtn.classList.remove('pause');

    if (!isPlay) {
        playBtn.classList.add('pause');
        isPlay = true;
        audio.play();
    } else {
        playBtn.classList.remove('pause');
        audio.pause();
        isPlay = false;
    };
}

audio.onended = function () {
    // change the src to be the url of the next song, if the song is the last one in the playlist then the next should be the first one
    playNum === playList.length - 1 ? playNum = 0 : playNum++;
    this.src = playList[playNum].src;
    // the audio player stops after playing each song, so after changing the src just launch the player
    this.play();
    highlightTrack(playItems);
}

function playNext() {
    isPlay = false;
    playNum === (playList.length - 1) ? playNum = 0 : playNum++;
    playAudio();
}

function playPrev() {
    isPlay = false;
    playNum === 0 ? playNum = playList.length - 1 : playNum--;
    playAudio();
}

playBtn.addEventListener('click', playAudio);
playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);


















