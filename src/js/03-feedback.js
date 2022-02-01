import throttle from 'lodash/throttle';
const formRef = document.querySelector('.feedback-form');
const emailRef = document.querySelector('input[name=email]');
const messageRef = document.querySelector('textarea[name=message]');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const localStorageData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

if (localStorageData) {
  emailRef.value = localStorageData.email;
  messageRef.value = localStorageData.message;
}

formRef.addEventListener('input', throttle(saveFeedbackData, 500));
formRef.addEventListener('submit', handleSubmit);

function saveFeedbackData() {
  let feedbackObj = createObject(emailRef.value, messageRef.value);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(feedbackObj));
}
function createObject(email, message) {
  const user = {
    email,
    message,
  };
  return user;
}

function handleSubmit(event) {
  event.preventDefault();
  console.log(createObject(emailRef.value, messageRef.value));
  emailRef.value = '';
  messageRef.value = '';
  localStorage.clear();
}
