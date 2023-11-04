const nav = document.querySelector(".navbar");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (lastScrollY < window.scrollY) {
    nav.classList.add("navbar--hidden");
  } else {
    nav.classList.remove("navbar--hidden");
  }

  lastScrollY = window.scrollY;
});

const body = document.querySelector('body');
const modeToggle = document.getElementById('mode-toggle');

function toggleMode() {
  body.classList.toggle('dark-mode');
}
modeToggle.addEventListener('click', toggleMode);

const sliderbox = document.querySelectorAll('.sliderbox:not(:first-child)');
const options = {
  threshold: 0.5
}

function addSlideIn(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slideIn');
    } else {
      entry.target.classList.remove('slideIn');
    }
  });
}

const observer = new IntersectionObserver(addSlideIn, options)

sliderbox.forEach(sliderbox => {
  observer.observe(sliderbox);
})

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  const submitButton = document.querySelector('.validity');
  const successMessage = document.getElementById('successMessage');

  function validateInput(input, regex, errorMessage) {
    const errorElement = input.parentElement.querySelector('.error-message');
    const isValid = regex.test(input.value);

    if (!isValid) {
      input.style.setProperty('border-color', 'blue', 'important');
      errorElement.textContent = errorMessage;
    } else {
      input.style.setProperty('border-color', 'green', 'important');
      errorElement.textContent = '';
    }

    return { isValid, errorMessage };
  }

  function validateForm() {
    const fname = document.getElementById('fname');
    const lname = document.getElementById('lname');
    const email = document.getElementById('email');
    const pnumber = document.getElementById('pnumber');

    const fnameResult = validateInput(fname, /^[a-zA-Z\s]+$/, 'Please enter a valid first name.');
    const lnameResult = validateInput(lname, /^[a-zA-Z\s]+$/, 'Please enter a valid last name.');
    const emailResult = validateInput(email, /^\S+@\S+\.\S+$/, 'Please enter a valid email address.');
    const pnumberResult = validateInput(pnumber, /^\d{3}-\d{3}-\d{4}$/, 'Please enter a valid phone number (XXXXXXXXXX). Include the "-" between numbers');

    return fnameResult.isValid && lnameResult.isValid && emailResult.isValid && pnumberResult.isValid;
  }

  function resetForm() {
    const formInputs = form.querySelectorAll('input[type="text"], input[type="tel"]');
    formInputs.forEach(input => {
      input.value = '';
      input.style.setProperty('border-color', '');
      const errorElement = input.parentElement.querySelector('.error-message');
      errorElement.textContent = '';
    });
    successMessage.classList.remove('hidden');
  }

  function submitForm(event) {
    event.preventDefault();

    if (validateForm()) {
      successMessage.style.color = 'green';
      successMessage.textContent = 'Form submitted successfully!';
      successMessage.style.display = 'block';

      resetForm();

    
      submitButton.disabled = true;
      

    }
  }

  submitButton.disabled = true;

  form.addEventListener('input', function () {
    submitButton.disabled = !validateForm();
  });

  form.addEventListener('submit', submitForm);
});
