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
   FULL SCREEN SLIDE NAVIGATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const slider = document.getElementById("slide-container");

    if (!slider) return;

    const slides = Array.from(
        slider.querySelectorAll(".slide")
    );

    if (!slides.length) return;


    /* -----------------------------------------------------
       CREATE DOT NAVIGATION
       ----------------------------------------------------- */

    const dotsContainer = document.createElement("div");

    dotsContainer.className = "slide-dots";

    slides.forEach((slide, index) => {

        const dot = document.createElement("button");

        dot.className = "slide-dot";

        dot.setAttribute(
            "aria-label",
            `Go to slide ${index + 1}`
        );

        dot.dataset.slide = index;

        dot.addEventListener("click", () => {

            goToSlide(index);

        });

        dotsContainer.appendChild(dot);

    });

    document.body.appendChild(dotsContainer);


    /* -----------------------------------------------------
       CREATE ARROW CONTROLS
       ----------------------------------------------------- */

    const controls = document.createElement("div");

    controls.className = "slide-controls";

    controls.innerHTML = `
        <button
            class="slide-control"
            id="slide-prev"
            aria-label="Previous slide"
        >
            ↑
        </button>

        <button
            class="slide-control"
            id="slide-next"
            aria-label="Next slide"
        >
            ↓
        </button>
    `;

    document.body.appendChild(controls);


    const dots = Array.from(
        document.querySelectorAll(".slide-dot")
    );

    const prevButton =
        document.getElementById("slide-prev");

    const nextButton =
        document.getElementById("slide-next");


    /* -----------------------------------------------------
       CURRENT SLIDE
       ----------------------------------------------------- */

    let currentSlide = 0;

    let isAnimating = false;

    let wheelLocked = false;


    /* -----------------------------------------------------
       GO TO SLIDE
       ----------------------------------------------------- */

    function goToSlide(index) {

        if (index < 0) {
            index = 0;
        }

        if (index >= slides.length) {
            index = slides.length - 1;
        }

        currentSlide = index;

        slides[index].scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        updateDots();

    }


    /* -----------------------------------------------------
       UPDATE DOTS
       ----------------------------------------------------- */

    function updateDots() {

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        });

    }


    /* -----------------------------------------------------
       NEXT / PREVIOUS
       ----------------------------------------------------- */

    function nextSlide() {

        goToSlide(currentSlide + 1);

    }

    function previousSlide() {

        goToSlide(currentSlide - 1);

    }


    prevButton.addEventListener(
        "click",
        previousSlide
    );

    nextButton.addEventListener(
        "click",
        nextSlide
    );


    /* -----------------------------------------------------
       WHEEL = ONE SLIDE AT A TIME
       ----------------------------------------------------- */

    slider.addEventListener(
        "wheel",
        (event) => {

            if (
                window.innerWidth <= 700
            ) {
                return;
            }

            event.preventDefault();

            if (wheelLocked) return;

            wheelLocked = true;

            if (event.deltaY > 0) {

                nextSlide();

            } else if (event.deltaY < 0) {

                previousSlide();

            }

            setTimeout(() => {

                wheelLocked = false;

            }, 750);

        },
        {
            passive: false
        }
    );


    /* -----------------------------------------------------
       KEYBOARD NAVIGATION
       ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                window.innerWidth <= 700
            ) {
                return;
            }

            const tag =
                document.activeElement.tagName;

            if (
                tag === "INPUT" ||
                tag === "TEXTAREA" ||
                tag === "SELECT"
            ) {
                return;
            }


            if (
                event.key === "ArrowDown" ||
                event.key === "PageDown"
            ) {

                event.preventDefault();

                nextSlide();

            }


            if (
                event.key === "ArrowUp" ||
                event.key === "PageUp"
            ) {

                event.preventDefault();

                previousSlide();

            }


            if (event.key === "Home") {

                event.preventDefault();

                goToSlide(0);

            }


            if (event.key === "End") {

                event.preventDefault();

                goToSlide(slides.length - 1);

            }

        }
    );


    /* -----------------------------------------------------
       INTERSECTION OBSERVER
       ----------------------------------------------------- */

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting &&
                        entry.intersectionRatio >= 0.5
                    ) {

                        const index =
                            slides.indexOf(
                                entry.target
                            );

                        if (index !== -1) {

                            currentSlide = index;

                            updateDots();

                        }

                    }

                });

            },
            {
                root: slider,
                threshold: 0.5
            }
        );


    slides.forEach((slide) => {

        observer.observe(slide);

    });


    /* -----------------------------------------------------
       INTERNAL SLIDE LINKS
       ----------------------------------------------------- */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {

            const targetID =
                link.getAttribute("href");

            const target =
                document.querySelector(targetID);

            if (!target) return;

            link.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    const index =
                        slides.indexOf(target);

                    if (index !== -1) {

                        goToSlide(index);

                    }

                }
            );

        });


    /* -----------------------------------------------------
       INITIAL STATE
       ----------------------------------------------------- */

    updateDots();

});
