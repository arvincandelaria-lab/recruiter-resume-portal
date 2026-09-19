document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("resumeModal");
    const modalTitle = document.getElementById("modalTitle");
    const requestedResume = document.getElementById("requestedResume");
    const emailSubject = document.getElementById("emailSubject");

    const closeButton = document.querySelector(".close-modal");
    const overlay = document.querySelector(".modal-overlay");

    const requestButtons = document.querySelectorAll(".request-btn");

    console.log("Resume modal script loaded.");
    console.log("Request buttons found:", requestButtons.length);


    requestButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            console.log("Request Resume clicked.");

            const resumeName =
                button.getAttribute("data-resume");

            modalTitle.textContent =
                "Request " + resumeName;

            requestedResume.value =
                resumeName;

            emailSubject.value =
                resumeName + " Request";

            modal.classList.add("active");

            modal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";

        });

    });


    function closeModal() {

        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    }


    closeButton.addEventListener(
        "click",
        closeModal
    );


    overlay.addEventListener(
        "click",
        closeModal
    );


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

});
