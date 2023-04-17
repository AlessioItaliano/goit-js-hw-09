import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', 'disabled');
let timerId = null;
let timeToTheEnd = null;
let convertTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      Notify.failure('Please choose a date in the future');

      return;
    }
    startBtn.removeAttribute('disabled', 'disabled');
    timeToTheEnd = selectedDates[0].getTime() - options.defaultDate.getTime();
    return timeToTheEnd;
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function formatintTime(time) {
  dataSeconds.textContent = time.seconds;
  dataMinutes.textContent = time.minutes;
  dataHours.textContent = time.hours;
  dataDays.textContent = time.days;
}

const dateTimePicker = flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', onClickStartBtn);

function onClickStartBtn() {
  timerId = setInterval(startTimer, 1000);
  convertTime = convertMs(timeToTheEnd);
  formatintTime(convertTime);
}

function startTimer() {
  startBtn.setAttribute('disabled', 'disabled');
  if (
    timeToTheEnd < 0
    // dataSeconds.textContent <= 0 &&
    // dataMinutes.textContent <= 0 &&
    // dataHours.textContent <= 0 &&
    // dataDays.textContent <= 0
  ) {
    // console.log(timeToTheEnd);
    // console.log(options.defaultDate.getTime());
    clearInterval(timerId);
    // dataSeconds.textContent = 0;
    // dataMinutes.textContent = 0;
    // dataHours.textContent = 0;
    // dataDays.textContent = 0;
  } else {
    timeToTheEnd -= 1000;
    convertTime = convertMs(timeToTheEnd);
    formatintTime(convertTime);
  }
}
