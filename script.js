/* =========================
   MOBILE MENU
========================= */

const menuButton = document.getElementById("menuButton");

const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", function () {

    navMenu.classList.toggle("active");

});


/* Close mobile menu after clicking a link */

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

    });

});


/* =========================
   FORM ELEMENTS
========================= */

const form = document.getElementById("contactForm");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const subjectInput = document.getElementById("subject");

const messageInput = document.getElementById("message");


const nameError = document.getElementById("nameError");

const emailError = document.getElementById("emailError");

const subjectError = document.getElementById("subjectError");

const messageError = document.getElementById("messageError");


const submitBtn = document.getElementById("submitBtn");

const buttonText = document.getElementById("buttonText");

const loadingText = document.getElementById("loadingText");

const formMessage = document.getElementById("formMessage");

const counter = document.getElementById("counter");


/* =========================
   MESSAGE CHARACTER COUNTER
========================= */

messageInput.addEventListener("input", function () {

    const length = messageInput.value.length;

    counter.textContent = `${length} / 1000`;

});


/* =========================
   CLEAR ERRORS
========================= */

function clearErrors() {

    nameError.textContent = "";

    emailError.textContent = "";

    subjectError.textContent = "";

    messageError.textContent = "";

    formMessage.textContent = "";

    formMessage.className = "form-message";

}


/* =========================
   VALIDATE FORM
========================= */

function validateForm() {

    clearErrors();

    let valid = true;


    const name = nameInput.value.trim();

    const email = emailInput.value.trim();

    const subject = subjectInput.value.trim();

    const message = messageInput.value.trim();


    /* NAME */

    if (name === "") {

        nameError.textContent =
            "Please enter your name.";

        valid = false;

    } else if (name.length < 2) {

        nameError.textContent =
            "Name must contain at least 2 characters.";

        valid = false;

    }


    /* EMAIL */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email === "") {

        emailError.textContent =
            "Please enter your email.";

        valid = false;

    } else if (!emailPattern.test(email)) {

        emailError.textContent =
            "Please enter a valid email address.";

        valid = false;

    }


    /* SUBJECT */

    if (subject === "") {

        subjectError.textContent =
            "Please enter a subject.";

        valid = false;

    } else if (subject.length < 3) {

        subjectError.textContent =
            "Subject must contain at least 3 characters.";

        valid = false;

    }


    /* MESSAGE */

    if (message === "") {

        messageError.textContent =
            "Please enter your message.";

        valid = false;

    } else if (message.length < 10) {

        messageError.textContent =
            "Message must contain at least 10 characters.";

        valid = false;

    }


    return valid;

}


/* =========================
   SUBMIT FORM
========================= */

form.addEventListener("submit", async function (event) {

    event.preventDefault();


    /* Validate */

    if (!validateForm()) {

        return;

    }


    /* Loading */

    submitBtn.disabled = true;

    buttonText.classList.add("hidden");

    loadingText.classList.remove("hidden");


    const formData = new FormData(form);


    try {

        const response = await fetch(
            form.action,
            {
                method: "POST",

                body: formData,

                headers: {
                    "Accept": "application/json"
                }
            }
        );


        if (response.ok) {

            formMessage.className =
                "form-message success";

            formMessage.textContent =
                "✓ Thanks for reaching out! Your message has been received.";

            form.reset();

            counter.textContent = "0 / 1000";

        }

        else {

            let data = {};

            try {

                data = await response.json();

            }

            catch (error) {

                data = {};

            }


            formMessage.className =
                "form-message error-message";


            if (data.errors) {

                formMessage.textContent =
                    data.errors
                        .map(error => error.message)
                        .join(", ");

            }

            else {

                formMessage.textContent =
                    "Something went wrong. Please try again.";

            }

        }

    }

    catch (error) {

        formMessage.className =
            "form-message error-message";

        formMessage.textContent =
            "Unable to send your message. Please check your internet connection and try again.";

    }


    /* Restore button */

    submitBtn.disabled = false;

    buttonText.classList.remove("hidden");

    loadingText.classList.add("hidden");

});


/* =========================
   FAQ ACCORDION
========================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");


faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const currentItem =
            question.parentElement;


        const allItems =
            document.querySelectorAll(".faq-item");


        allItems.forEach(function (item) {

            if (item !== currentItem) {

                item.classList.remove("active");

                const answer =
                    item.querySelector(".faq-answer");

                answer.style.maxHeight = null;

            }

        });


        currentItem.classList.toggle("active");


        const answer =
            currentItem.querySelector(".faq-answer");


        if (currentItem.classList.contains("active")) {

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

        else {

            answer.style.maxHeight = null;

        }

    });

});