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

/* =========================================================
   HORIZONTAL SLIDE PRESENTATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const slider =
        document.getElementById("slide-container");

    if (!slider) return;


    const slides =
        Array.from(
            slider.querySelectorAll(".slide")
        );

    if (!slides.length) return;


    let currentSlide = 0;


    /* =====================================================
       CREATE DOTS
       ===================================================== */

    const dotsContainer =
        document.createElement("div");

    dotsContainer.className =
        "slide-dots";


    slides.forEach((slide, index) => {

        const dot =
            document.createElement("button");

        dot.className =
            "slide-dot";

        dot.dataset.slide = index;

        dot.setAttribute(
            "aria-label",
            `Go to slide ${index + 1}`
        );


        dot.addEventListener(
            "click",
            () => {

                goToSlide(index);

            }
        );


        dotsContainer.appendChild(dot);

    });


    document.body.appendChild(
        dotsContainer
    );


    /* =====================================================
       CREATE CONTROLS
       ===================================================== */

    const controls =
        document.createElement("div");

    controls.className =
        "slide-controls";


    controls.innerHTML = `

        <button
            class="slide-control"
            id="slide-prev"
            aria-label="Previous slide"
        >
            ‹
        </button>

        <button
            class="slide-control"
            id="slide-next"
            aria-label="Next slide"
        >
            ›
        </button>

    `;


    document.body.appendChild(
        controls
    );


    const dots =
        Array.from(
            document.querySelectorAll(
                ".slide-dot"
            )
        );


    const prevButton =
        document.getElementById(
            "slide-prev"
        );


    const nextButton =
        document.getElementById(
            "slide-next"
        );


    /* =====================================================
       UPDATE SLIDE
       ===================================================== */

    function updateSlide() {

        slider.style.transform =
            `translateX(-${currentSlide * 100}vw)`;


        /* Update dots */

        dots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentSlide
                );

            }
        );


        /* Previous button */

        prevButton.disabled =
            currentSlide === 0;


        /* Next button */

        nextButton.disabled =
            currentSlide ===
            slides.length - 1;

    }


    /* =====================================================
       GO TO SLIDE
       ===================================================== */

    function goToSlide(index) {

        if (index < 0) {

            index = 0;

        }


        if (
            index >= slides.length
        ) {

            index =
                slides.length - 1;

        }


        currentSlide = index;

        updateSlide();

    }


    /* =====================================================
       NEXT
       ===================================================== */

    function nextSlide() {

        if (
            currentSlide <
            slides.length - 1
        ) {

            currentSlide++;

            updateSlide();

        }

    }


    /* =====================================================
       PREVIOUS
       ===================================================== */

    function previousSlide() {

        if (
            currentSlide > 0
        ) {

            currentSlide--;

            updateSlide();

        }

    }


    /* =====================================================
       BUTTONS
       ===================================================== */

    nextButton.addEventListener(
        "click",
        nextSlide
    );


    prevButton.addEventListener(
        "click",
        previousSlide
    );


    /* =====================================================
       KEYBOARD
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            const tag =
                document.activeElement.tagName;


            /* Don't hijack typing */

            if (
                tag === "INPUT" ||
                tag === "TEXTAREA" ||
                tag === "SELECT"
            ) {

                return;

            }


            if (
                event.key === "ArrowRight" ||
                event.key === "PageDown"
            ) {

                event.preventDefault();

                nextSlide();

            }


            if (
                event.key === "ArrowLeft" ||
                event.key === "PageUp"
            ) {

                event.preventDefault();

                previousSlide();

            }


            if (
                event.key === "Home"
            ) {

                event.preventDefault();

                goToSlide(0);

            }


            if (
                event.key === "End"
            ) {

                event.preventDefault();

                goToSlide(
                    slides.length - 1
                );

            }

        }
    );


    /* =====================================================
       MOUSE WHEEL
       ===================================================== */

    let wheelLocked = false;


    document.addEventListener(
        "wheel",
        (event) => {

            if (
                window.innerWidth <= 700
            ) {

                return;

            }


            if (wheelLocked) {

                event.preventDefault();

                return;

            }


            event.preventDefault();

            wheelLocked = true;


            if (
                event.deltaY > 0
            ) {

                nextSlide();

            }
            else if (
                event.deltaY < 0
            ) {

                previousSlide();

            }


            setTimeout(
                () => {

                    wheelLocked = false;

                },
                700
            );

        },
        {
            passive: false
        }
    );


    /* =====================================================
       TOUCH / SWIPE
       ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    document.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    document.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;


            const difference =
                touchStartX - touchEndX;


            /* Swipe left */

            if (
                difference > 50
            ) {

                nextSlide();

            }


            /* Swipe right */

            if (
                difference < -50
            ) {

                previousSlide();

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       NAVBAR LINKS
       ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            (link) => {

                const targetID =
                    link.getAttribute(
                        "href"
                    );


                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) return;


                link.addEventListener(
                    "click",
                    (event) => {

                        event.preventDefault();


                        const index =
                            slides.indexOf(
                                target
                            );


                        if (
                            index !== -1
                        ) {

                            goToSlide(
                                index
                            );

                        }

                    }
                );

            }
        );


    /* =====================================================
       INITIAL
       ===================================================== */

    updateSlide();

});
