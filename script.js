/* =========================================================
   TARGETED RESUMES CAROUSEL
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           ELEMENTS
           ===================================================== */

        const track =
            document.getElementById(
                "resumeTrack"
            );

        const viewport =
            document.getElementById(
                "resumeViewport"
            );

        const slides =
            Array.from(
                document.querySelectorAll(
                    ".resume-slide"
                )
            );

        const nextButton =
            document.getElementById(
                "nextResume"
            );

        const prevButton =
            document.getElementById(
                "prevResume"
            );

        const dots =
            Array.from(
                document.querySelectorAll(
                    ".resume-dot"
                )
            );


        /* =====================================================
           STATE
           ===================================================== */

        let currentIndex = 0;

        let isAnimating = false;


        /* =====================================================
           GET SLIDE DISTANCE
           ===================================================== */

        function getSlideDistance() {

            if (!slides.length) {
                return 0;
            }


            const slideWidth =
                slides[0].getBoundingClientRect().width;


            const trackStyles =
                window.getComputedStyle(
                    track
                );


            const gap =
                parseFloat(
                    trackStyles.columnGap
                ) || 0;


            return slideWidth + gap;
        }


        /* =====================================================
           UPDATE DOTS
           ===================================================== */

        function updateDots() {

            dots.forEach(
                (dot, index) => {

                    dot.classList.toggle(
                        "active",
                        index === currentIndex
                    );

                }
            );
        }


        /* =====================================================
           UPDATE CAROUSEL
           ===================================================== */

        function updateCarousel(
            animate = true
        ) {

            const distance =
                getSlideDistance();


            if (!animate) {

                track.style.transition =
                    "none";

            } else {

                track.style.transition =
                    "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)";
            }


            track.style.transform =
                `translateX(-${currentIndex * distance}px)`;


            updateDots();


            if (!animate) {

                requestAnimationFrame(
                    () => {

                        requestAnimationFrame(
                            () => {

                                track.style.transition =
                                    "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)";

                            }
                        );

                    }
                );
            }

        }


        /* =====================================================
           GO TO SLIDE
           ===================================================== */

        function goToSlide(index) {

            if (isAnimating) {
                return;
            }


            if (index < 0) {

                index =
                    slides.length - 1;

            }


            if (index >= slides.length) {

                index = 0;

            }


            if (index === currentIndex) {
                return;
            }


            currentIndex = index;

            isAnimating = true;


            updateCarousel(true);


            setTimeout(
                () => {

                    isAnimating = false;

                },
                680
            );

        }


        /* =====================================================
           NEXT
           ===================================================== */

        nextButton.addEventListener(
            "click",
            () => {

                goToSlide(
                    currentIndex + 1
                );

            }
        );


        /* =====================================================
           PREVIOUS
           ===================================================== */

        prevButton.addEventListener(
            "click",
            () => {

                goToSlide(
                    currentIndex - 1
                );

            }
        );


        /* =====================================================
           DOT NAVIGATION
           ===================================================== */

        dots.forEach(
            (dot) => {

                dot.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                dot.dataset.slide
                            );


                        goToSlide(index);

                    }
                );

            }
        );


        /* =====================================================
           KEYBOARD NAVIGATION
           ===================================================== */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "ArrowRight"
                ) {

                    goToSlide(
                        currentIndex + 1
                    );

                }


                if (
                    event.key === "ArrowLeft"
                ) {

                    goToSlide(
                        currentIndex - 1
                    );

                }

            }
        );


        /* =====================================================
           TOUCH / SWIPE
           ===================================================== */

        let touchStartX = 0;

        let touchEndX = 0;


        viewport.addEventListener(
            "touchstart",
            (event) => {

                touchStartX =
                    event.touches[0].clientX;

            },
            {
                passive: true
            }
        );


        viewport.addEventListener(
            "touchend",
            (event) => {

                touchEndX =
                    event.changedTouches[0].clientX;


                const difference =
                    touchStartX - touchEndX;


                const minimumSwipe =
                    50;


                if (
                    Math.abs(difference)
                    < minimumSwipe
                ) {

                    return;

                }


                if (
                    difference > 0
                ) {

                    goToSlide(
                        currentIndex + 1
                    );

                } else {

                    goToSlide(
                        currentIndex - 1
                    );

                }

            },
            {
                passive: true
            }
        );


        /* =====================================================
           RESIZE
           ===================================================== */

        let resizeTimer;


        window.addEventListener(
            "resize",
            () => {

                clearTimeout(
                    resizeTimer
                );


                resizeTimer =
                    setTimeout(
                        () => {

                            updateCarousel(
                                false
                            );

                        },
                        150
                    );

            }
        );


        /* =====================================================
           VIEW RESUME BUTTON
           ===================================================== */

        const viewResumeButtons =
            document.querySelectorAll(
                ".view-resume"
            );


        viewResumeButtons.forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        const resumeName =
                            button.dataset.resume;


                        console.log(
                            `Opening ${resumeName}`
                        );


                        /*
                         * PALITAN ITO NG ACTUAL
                         * RESUME FILE MO.
                         *
                         * Example:
                         *
                         * window.open(
                         *     "resumes/data-analytics.pdf",
                         *     "_blank"
                         * );
                         */


                        alert(
                            `${resumeName} selected.`
                        );

                    }
                );

            }
        );


        /* =====================================================
           INITIALIZE
           ===================================================== */

        updateCarousel(false);

    }
);
