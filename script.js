document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("resumeModal");
    const modalTitle = document.getElementById("modalTitle");
    const requestedResume = document.getElementById("requestedResume");
    const emailSubject = document.getElementById("emailSubject");
    const closeButton = document.querySelector(".close-modal");
    const overlay = document.querySelector(".modal-overlay");
    const requestButtons = document.querySelectorAll(".request-btn");
    const form = document.getElementById("resumeRequestForm");


    // =========================
    // OPEN RESUME REQUEST MODAL
    // =========================

    requestButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const resumeName = button.getAttribute("data-resume");

            modalTitle.textContent = "Request " + resumeName;

            requestedResume.value = resumeName;

            emailSubject.value = resumeName + " Request";

            modal.classList.add("active");

            modal.setAttribute("aria-hidden", "false");

            document.body.style.overflow = "hidden";

        });

    });


    // =========================
    // CLOSE MODAL
    // =========================

    function closeModal() {

        modal.classList.remove("active");

        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    }


    closeButton.addEventListener("click", closeModal);

    overlay.addEventListener("click", closeModal);


    // =========================
    // ESCAPE KEY
    // =========================

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape" && modal.classList.contains("active")) {

            closeModal();

        }

    });


    // =========================
    // FORM SUBMISSION
    // =========================

    form.addEventListener("submit", function () {

        const submitButton = form.querySelector(".submit-btn");

        submitButton.disabled = true;

        submitButton.textContent = "Sending Request...";

    });

});
