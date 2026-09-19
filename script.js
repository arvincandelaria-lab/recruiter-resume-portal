document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       RESUME CAROUSEL
    ===================================================== */

    const carousel =
        document.getElementById("resumeCarousel");

    const cards =
        document.querySelectorAll(".resume-card");

    const nextButton =
        document.querySelector(".carousel-next");

    const prevButton =
        document.querySelector(".carousel-prev");


    if (
        carousel &&
        cards.length > 0
    ) {


        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function () {

                    const cardWidth =
                        cards[0].getBoundingClientRect().width;

                    const gap =
                        22;

                    carousel.scrollBy({
                        left:
                            cardWidth + gap,

                        behavior:
                            "smooth"
                    });

                }
            );

        }


        if (prevButton) {

            prevButton.addEventListener(
                "click",
                function () {

                    const cardWidth =
                        cards[0].getBoundingClientRect().width;

                    const gap =
                        22;

                    carousel.scrollBy({
                        left:
                            -(cardWidth + gap),

                        behavior:
                            "smooth"
                    });

                }
            );

        }

    }



    /* =====================================================
       RESUME REQUEST MODAL
    ===================================================== */

    const modal =
        document.getElementById(
            "resumeModal"
        );

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const requestedResume =
        document.getElementById(
            "requestedResume"
        );

    const emailSubject =
        document.getElementById(
            "emailSubject"
        );

    const closeButton =
        document.querySelector(
            ".close-modal"
        );

    const overlay =
        document.querySelector(
            ".modal-overlay"
        );

    const requestButtons =
        document.querySelectorAll(
            ".request-btn"
        );

    const form =
        document.getElementById(
            "resumeRequestForm"
        );


    console.log(
        "Resume portal script loaded."
    );

    console.log(
        "Request buttons found:",
        requestButtons.length
    );


    /*
       Safety check
    */

    if (
        !modal ||
        !modalTitle ||
        !requestedResume ||
        !emailSubject
    ) {

        console.error(
            "Resume request modal elements are missing."
        );

        return;
    }



    /* =====================================================
       OPEN MODAL
    ===================================================== */

    requestButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {


                    const resumeName =
                        button.getAttribute(
                            "data-resume"
                        );


                    if (!resumeName) {

                        console.error(
                            "Missing data-resume."
                        );

                        return;
                    }


                    /*
                       Example:

                       Request Resume

                       becomes:

                       Request Data Analyst Resume
                    */

                    modalTitle.textContent =
                        "Request " +
                        resumeName;


                    /*
                       Send selected resume
                       to Formspree.
                    */

                    requestedResume.value =
                        resumeName;


                    /*
                       Change email subject.
                    */

                    emailSubject.value =
                        resumeName +
                        " Request";


                    /*
                       Show modal.
                    */

                    modal.classList.add(
                        "active"
                    );


                    modal.setAttribute(
                        "aria-hidden",
                        "false"
                    );


                    /*
                       Prevent background scrolling.
                    */

                    document.body.classList.add(
                        "modal-open"
                    );


                    /*
                       Focus Full Name.
                    */

                    const nameInput =
                        document.getElementById(
                            "name"
                        );


                    if (nameInput) {

                        setTimeout(
                            function () {

                                nameInput.focus();

                            },
                            200
                        );

                    }

                }
            );

        }
    );



    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeModal() {

        modal.classList.remove(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );

    }



    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeModal
        );

    }



    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeModal();

            }

        }
    );



    /* =====================================================
       FORM SUBMISSION
    ===================================================== */

    if (form) {

        form.addEventListener(
            "submit",
            function () {

                const submitButton =
                    form.querySelector(
                        ".submit-btn"
                    );


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "Sending Request...";

                }

            }
        );

    }

});
