// =========================
// RESUME REQUEST MODAL
// =========================

// Get elements
const modal = document.getElementById("requestModal");
const closeModalButton = document.getElementById("closeModal");
const modalOverlay = document.querySelector(".modal-overlay");

const requestButtons = document.querySelectorAll(".request-btn");

const requestedResumeInput =
    document.getElementById("requestedResume");

const emailSubjectInput =
    document.getElementById("emailSubject");

const modalTitle =
    document.getElementById("modalTitle");


// =========================
// OPEN MODAL
// =========================

requestButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Get the resume name from the button
        const resumeName =
            button.getAttribute("data-resume");

        // Put selected resume into hidden form field
        requestedResumeInput.value = resumeName;

        // Update modal title
        modalTitle.textContent =
            "Request " + resumeName;

        // Update email subject
        emailSubjectInput.value =
            "Resume Access Request - " + resumeName;

        // Show modal
        modal.classList.add("active");

        // Update accessibility attribute
        modal.setAttribute("aria-hidden", "false");

        // Prevent background scrolling
        document.body.style.overflow = "hidden";

    });

});


// =========================
// CLOSE MODAL FUNCTION
// =========================

function closeModal() {

    modal.classList.remove("active");

    modal.setAttribute("aria-hidden", "true");

    // Allow background scrolling again
    document.body.style.overflow = "";

}


// =========================
// CLOSE BUTTON
// =========================

closeModalButton.addEventListener(
    "click",
    closeModal
);


// =========================
// CLOSE WHEN CLICKING OUTSIDE
// =========================

modalOverlay.addEventListener(
    "click",
    closeModal
);


// =========================
// CLOSE WITH ESCAPE KEY
// =========================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            modal.classList.contains("active")
        ) {

            closeModal();

        }

    }
);


// =========================
// FORM SUBMISSION
// =========================

const form =
    document.getElementById("resumeRequestForm");

form.addEventListener(
    "submit",
    function () {

        /*
         * Formspree will handle the actual submission.
         *
         * The selected resume is already stored
         * in the hidden "requested_resume" field.
         */

        const submitButton =
            form.querySelector(".submit-btn");

        submitButton.textContent =
            "Submitting Request...";

        submitButton.disabled = true;

    }
);
