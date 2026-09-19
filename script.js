document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MAIN PRESENTATION SLIDER
    ===================================================== */

    const slidesTrack =
        document.querySelector(".slides-track");

    const slides =
        document.querySelectorAll(".slide");

    const nextButton =
        document.querySelector(".slide-next");

    const prevButton =
        document.querySelector(".slide-prev");

    const currentSlide =
        document.getElementById("currentSlide");

    const navLinks =
        document.querySelectorAll(".nav-links a");

    const slideLinks =
        document.querySelectorAll("[data-slide]");


    let currentIndex = 0;

    const totalSlides = slides.length;


    function updateSlide() {

        /*
            Move the entire presentation horizontally.
        */

        slidesTrack.style.transform =
            `translateX(-${currentIndex * 25}%)`;


        /*
            Update counter
        */

        currentSlide.textContent =
            String(currentIndex + 1).padStart(2, "0");


        /*
            Update URL hash
        */

        const currentSection =
            slides[currentIndex].id;

        if (history.replaceState) {

            history.replaceState(
                null,
                "",
                "#" + currentSection
            );

        }


        /*
            Active navigation
        */

        navLinks.forEach(function (link) {

            const linkSlide =
                Number(link.dataset.slide);

            link.classList.toggle(
                "active",
                linkSlide === currentIndex
            );

        });

    }


    function goToSlide(index) {

        if (index < 0) {

            index = totalSlides - 1;

        }

        if (index >= totalSlides) {

            index = 0;

        }

        currentIndex = index;

        updateSlide();

    }


    function nextSlide() {

        goToSlide(currentIndex + 1);

    }


    function previousSlide() {

        goToSlide(currentIndex - 1);

    }


    nextButton.addEventListener(
        "click",
        nextSlide
    );


    prevButton.addEventListener(
        "click",
        previousSlide
    );


    /* =====================================================
       NAVIGATION LINKS
    ===================================================== */

    slideLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const index =
                    Number(link.dataset.slide);

                if (!Number.isNaN(index)) {

                    event.preventDefault();

                    goToSlide(index);

                }

            }
        );

    });


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            /*
                Do not interfere with typing
                inside modal form fields.
            */

            const tag =
                document.activeElement.tagName;

            if (
                tag === "INPUT" ||
                tag === "TEXTAREA"
            ) {

                return;

            }


            if (event.key === "ArrowRight") {

                nextSlide();

            }


            if (event.key === "ArrowLeft") {

                previousSlide();

            }

        }
    );


    /* =====================================================
       TOUCH / SWIPE
    ===================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    document.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    document.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;

            const distance =
                touchEndX - touchStartX;


            if (Math.abs(distance) < 60) {

                return;

            }


            if (distance < 0) {

                nextSlide();

            } else {

                previousSlide();

            }

        },
        { passive: true }
    );


    /* =====================================================
       MOUSE DRAG
    ===================================================== */

    let mouseStartX = null;


    document.addEventListener(
        "mousedown",
        function (event) {

            mouseStartX = event.clientX;

        }
    );


    document.addEventListener(
        "mouseup",
        function (event) {

            if (mouseStartX === null) {

                return;

            }


            const distance =
                event.clientX - mouseStartX;


            mouseStartX = null;


            if (Math.abs(distance) < 80) {

                return;

            }


            if (distance < 0) {

                nextSlide();

            } else {

                previousSlide();

            }

        }
    );


    /* =====================================================
       RESUME INNER CAROUSEL
    ===================================================== */

    const resumeTrack =
        document.querySelector(".resume-track");

    const resumeCards =
        document.querySelectorAll(".resume-card");

    const resumeNext =
        document.querySelector(".resume-next");

    const resumePrev =
        document.querySelector(".resume-prev");


    let resumeIndex = 0;


    function getResumeGap() {

        const styles =
            window.getComputedStyle(
                resumeTrack
            );

        return parseFloat(styles.gap) || 20;

    }


    function getResumeCardWidth() {

        if (!resumeCards.length) {

            return 0;

        }

        return resumeCards[0].offsetWidth;

    }


    function updateResumeCarousel() {

        const cardWidth =
            getResumeCardWidth();

        const gap =
            getResumeGap();


        resumeTrack.scrollTo({

            left:
                resumeIndex *
                (cardWidth + gap),

            behavior: "smooth"

        });

    }


    resumeNext.addEventListener(
        "click",
        function () {

            if (!resumeCards.length) {

                return;

            }


            resumeIndex++;

            if (
                resumeIndex >=
                resumeCards.length
            ) {

                resumeIndex = 0;

            }


            updateResumeCarousel();

        }
    );


    resumePrev.addEventListener(
        "click",
        function () {

            if (!resumeCards.length) {

                return;

            }


            resumeIndex--;

            if (resumeIndex < 0) {

                resumeIndex =
                    resumeCards.length - 1;

            }


            updateResumeCarousel();

        }
    );


    /* =====================================================
       RESUME CARD MOUSE PARALLAX
    ===================================================== */

    resumeCards.forEach(function (card) {

        card.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;


                const y =
                    event.clientY - rect.top;


                const rotateY =
                    ((x / rect.width) - 0.5) * 5;


                const rotateX =
                    ((y / rect.height) - 0.5) * -5;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       ABOUT PHOTO PARALLAX
    ===================================================== */

    const aboutSection =
        document.querySelector(".about-section");

    const aboutPhoto =
        document.querySelector(".about-photo img");


    if (aboutSection && aboutPhoto) {

        aboutSection.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    aboutSection.getBoundingClientRect();


                const x =
                    (event.clientX - rect.left) /
                    rect.width;


                const y =
                    (event.clientY - rect.top) /
                    rect.height;


                const moveX =
                    (x - 0.5) * 14;


                const moveY =
                    (y - 0.5) * 14;


                aboutPhoto.style.transform =
                    `scale(1.04)
                     translate(${moveX}px, ${moveY}px)`;

            }
        );


        aboutSection.addEventListener(
            "mouseleave",
            function () {

                aboutPhoto.style.transform =
                    "scale(1) translate(0,0)";

            }
        );

    }


    /* =====================================================
       RESUME REQUEST MODAL
    ===================================================== */

    const modal =
        document.getElementById("resumeModal");

    const modalTitle =
        document.getElementById("modalTitle");

    const requestedResume =
        document.getElementById("requestedResume");

    const emailSubject =
        document.getElementById("emailSubject");

    const closeButton =
        document.querySelector(".close-modal");

    const overlay =
        document.querySelector(".modal-overlay");

    const requestButtons =
        document.querySelectorAll(".request-btn");

    const form =
        document.getElementById("resumeRequestForm");


    function openModal(resumeName) {

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

    }


    function closeModal() {

        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "hidden";

    }


    requestButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const resumeName =
                        button.getAttribute(
                            "data-resume"
                        );


                    openModal(resumeName);

                }
            );

        }
    );


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


    form.addEventListener(
        "submit",
        function () {

            const submitButton =
                form.querySelector(
                    ".submit-btn"
                );


            submitButton.disabled = true;

            submitButton.textContent =
                "Sending Request...";

        }
    );


    /* =====================================================
       HASH NAVIGATION
    ===================================================== */

    const hash =
        window.location.hash;


    if (hash) {

        const matchingSlide =
            document.querySelector(hash);


        if (matchingSlide) {

            const index =
                Array.from(slides).indexOf(
                    matchingSlide
                );


            if (index >= 0) {

                currentIndex = index;

            }

        }

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateSlide();

});
