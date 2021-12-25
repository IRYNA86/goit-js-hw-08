import throttle from 'lodash.throttle';

const form = document.querySelector(".feedback-form");
const email = document.querySelector('input');
const message = document.querySelector('textarea');

const storageKey = 'feedback-form-state';
inItForm();

form.addEventListener('submit', onSubmit);
function onSubmit(event) {
    event.preventDefault();
    const userData = {};
    const formData = new FormData(form);
    const formElemenls = event.currentTarget.elements;
    const formEmail = formElemenls.email.value;
    const formMessage = formElemenls.message.value;
    if (!formMessage || !formEmail) {
        return alert('Fill in the missing information')
    }
    formData.forEach((value, name) => 
        userData[name] = value);
    console.log(userData);
    event.currentTarget.reset();
    localStorage.removeItem(storageKey);    
};

form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
    let saveData = localStorage.getItem(storageKey);
    saveData = saveData ? JSON.parse(saveData) : {};
    saveData[event.target.name] = event.target.value;
    localStorage.setItem(storageKey, JSON.stringify(saveData));
};
function inItForm() {
        let saveData = localStorage.getItem(storageKey);
    if (saveData) {
        saveData = JSON.parse(saveData)
        Object.entries(saveData).forEach(([name, value]) => {
            form.elements[name].value = value;
    })
    };
        
    }