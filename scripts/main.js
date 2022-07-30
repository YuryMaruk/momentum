/* Show time */

const timeClass = document.querySelector('.time');

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    timeClass.textContent = currentTime;
    setInterval(showTime, 1000);
}

showTime();

/* Show date */

const dateClass = document.querySelector('.date');

function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: '2-digit'};
    const currentDate = date.toLocaleDateString('en-En', options);
    dateClass.textContent = currentDate;
    setInterval(showDate, 1000);
}

showDate();




