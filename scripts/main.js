/* Time */

const time = document.querySelector('.time');


function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setInterval(showTime, 1000);
}

showTime();


