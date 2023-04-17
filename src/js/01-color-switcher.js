const bodyStyle = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;
stopBtn.setAttribute('disabled', 'disabled');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtn.addEventListener('click', onClickStartBtn);

function onClickStartBtn() {
  timerId = setInterval(() => {
    bodyStyle.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.toggleAttribute('disabled');
  stopBtn.removeAttribute('disabled', 'disabled');
}

stopBtn.addEventListener('click', onClickStopBtn);

function onClickStopBtn() {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled', 'disabled');
  stopBtn.setAttribute('disabled', 'disabled');
}
