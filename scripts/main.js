/* Show time */

function showTime() {
    const timeClass = document.querySelector('.time');
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    timeClass.textContent = currentTime;
    setInterval(showTime, 1000);
}

showTime();

/* Show date */

function showDate() {
    const dateClass = document.querySelector('.date');
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: '2-digit' };
    const currentDate = date.toLocaleDateString('en-En', options);
    dateClass.textContent = currentDate;
    setInterval(showDate, 1000);
}

showDate();

/* Show greeting */

function showGreeting() {
    const greetingSpan = document.querySelector('.greeting-span');
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

const greetingInput = document.querySelector('.greeting-input');

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









