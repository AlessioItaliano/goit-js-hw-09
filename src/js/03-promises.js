import { Notify } from 'notiflix/build/notiflix-notify-aio';

const submitForm = document.querySelector('.form');

submitForm.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  let delayOfForm = Number(submitForm.delay.value);
  let stepOfForm = Number(submitForm.step.value);
  let amountOfForm = Number(submitForm.amount.value);

  for (let i = 1; i <= amountOfForm; i += 1) {
    createPromise(i, delayOfForm)
      .then(({ position, delayOfForm }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delayOfForm}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delayOfForm}ms`);
      });
    delayOfForm += stepOfForm;
  }
}

function createPromise(position, delayOfForm) {
  const newPromise = { position, delayOfForm };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(newPromise);
      } else {
        // Reject
        reject(newPromise);
      }
    }, delayOfForm);
  });
}
