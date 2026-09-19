/* =========================================================
   RECRUITER RESUME PORTAL
   JAVASCRIPT
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           ELEMENTS
        ====================================================== */

        const track =
            document.getElementById(
                "resumeTrack"
            );


        const viewport =
            document.getElementById(
                "resumeViewport"
            );


        const cards =
            Array.from(
                document.querySelectorAll(
                    ".resume-card"
                )
            );


        const nextButton =
            document.getElementById(
                "resumeNext"
            );


        const prevButton =
            document.getElementById(
                "resumePrev"
            );


        const currentSlide =
            document.getElementById(
                "currentSlide"
            );


        const modal =
            document.getElementById(
                "resumeModal"
            );


        const modalTitle =
            document.getElementById(
                "modalTitle"
            );


        const modalLabel =
            document.getElementById(
                "modalLabel"
            );


        const modalClose =
            document.getElementById(
                "modalClose"
            );


        const modalBackdrop =
            document.getElementById(
                "modalBackdrop"
            );


        const modalDownload =
            document.getElementById(
                "modalDownload"
            );



        /* =====================================================
           CAROUSEL
        ====================================================== */

        let currentIndex = 0;

        let startX = 0;

        let currentX = 0;

        let isDragging = false;



        /*
         * Get exact card width including gap.
         */

        function getStep() {

            if (
                !cards.length
            ) {

                return 0;

            }


            const card =
                cards[0];


            const cardWidth =
                card.getBoundingClientRect()
                    .width;


            const trackStyle =
                window.getComputedStyle(
                    track
                );


            const gap =
                parseFloat(
                    trackStyle.gap
                ) || 0;


            return (
                cardWidth +
                gap
            );

        }



        /*
         * Update carousel position.
         */

        function updateCarousel(
            animate = true
        ) {

            if (
                !track ||
                !cards.length
            ) {

                return;

            }


            const step =
                getStep();


            if (!animate) {

                track.style.transition =
                    "none";

            } else {

                track.style.transition =
                    "transform .55s cubic-bezier(.22,.61,.36,1)";

            }


            track.style.transform =
                `translateX(-${currentIndex * step}px)`;


            /*
             * Update number.
             */

            if (currentSlide) {

                currentSlide.textContent =
                    String(
                        currentIndex + 1
                    ).padStart(2, "0");

            }


            /*
             * Disable arrows
             * when necessary.
             */

            if (prevButton) {

                prevButton.disabled =
                    currentIndex === 0;

            }


            if (nextButton) {

                nextButton.disabled =
                    currentIndex ===
                    cards.length - 1;

            }

        }



        /*
         * Next
         */

        function nextSlide() {

            if (
                currentIndex <
                cards.length - 1
            ) {

                currentIndex++;

                updateCarousel();

            }

        }



        /*
         * Previous
         */

        function previousSlide() {

            if (
                currentIndex > 0
            ) {

                currentIndex--;

                updateCarousel();

            }

        }



        /*
         * Buttons
         */

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                nextSlide
            );

        }


        if (prevButton) {

            prevButton.addEventListener(
                "click",
                previousSlide
            );

        }



        /* =====================================================
           TOUCH / SWIPE SUPPORT
        ====================================================== */

        if (viewport) {


            viewport.addEventListener(
                "pointerdown",
                (event) => {

                    isDragging = true;

                    startX =
                        event.clientX;

                    currentX =
                        event.clientX;

                    viewport.setPointerCapture(
                        event.pointerId
                    );

                    track.style.transition =
                        "none";

                }
            );


            viewport.addEventListener(
                "pointermove",
                (event) => {

                    if (!isDragging) {

                        return;

                    }


                    currentX =
                        event.clientX;


                    const difference =
                        currentX -
                        startX;


                    const step =
                        getStep();


                    const base =
                        -(currentIndex * step);


                    track.style.transform =
                        `translateX(${base + difference}px)`;

                }
            );


            viewport.addEventListener(
                "pointerup",
                () => {

                    if (!isDragging) {

                        return;

                    }


                    isDragging =
                        false;


                    const difference =
                        currentX -
                        startX;


                    /*
                     * Swipe threshold
                     */

                    if (
                        difference < -50
                    ) {

                        nextSlide();

                    }
                    else if (
                        difference > 50
                    ) {

                        previousSlide();

                    }
                    else {

                        updateCarousel();

                    }

                }
            );


            viewport.addEventListener(
                "pointercancel",
                () => {

                    isDragging =
                        false;

                    updateCarousel();

                }
            );

        }



        /* =====================================================
           KEYBOARD SUPPORT
        ====================================================== */

        document.addEventListener(
            "keydown",
            (event) => {

                /*
                 * Don't change carousel
                 * while modal is open.
                 */

                if (
                    modal &&
                    modal.classList.contains(
                        "active"
                    )
                ) {

                    return;

                }


                if (
                    event.key === "ArrowRight"
                ) {

                    nextSlide();

                }


                if (
                    event.key === "ArrowLeft"
                ) {

                    previousSlide();

                }

            }
        );



        /* =====================================================
           RESUME MODAL
        ====================================================== */

        const resumeButtons =
            document.querySelectorAll(
                ".resume-button"
            );


        resumeButtons.forEach(
            (button) => {


                button.addEventListener(
                    "click",
                    () => {

                        const resumeName =
                            button.dataset.resume ||
                            "Resume";


                        if (modalTitle) {

                            modalTitle.textContent =
                                resumeName;

                        }


                        if (modalLabel) {

                            modalLabel.textContent =
                                "PROFESSIONAL RESUME";

                        }


                        /*
                         * =====================================
                         * CONNECT YOUR ACTUAL PDF HERE
                         * =====================================
                         *
                         * Example:
                         *
                         * if (
                         *     resumeName === "Data Analyst"
                         * ) {
                         *
                         *     modalDownload.href =
                         *         "resumes/data-analyst.pdf";
                         *
                         * }
                         *
                         */

                        if (
                            modalDownload
                        ) {

                            if (
                                resumeName ===
                                "Data Analyst"
                            ) {

                                modalDownload.href =
                                    "resumes/data-analyst.pdf";

                            }
                            else if (
                                resumeName ===
                                "Research Analyst"
                            ) {

                                modalDownload.href =
                                    "resumes/research-analyst.pdf";

                            }
                            else if (
                                resumeName ===
                                "Workforce Analyst"
                            ) {

                                modalDownload.href =
                                    "resumes/workforce-analyst.pdf";

                            }


                            /*
                             * If PDF does not exist yet,
                             * don't navigate away.
                             */

                            modalDownload.onclick =
                                (event) => {

                                    const href =
                                        modalDownload
                                            .getAttribute(
                                                "href"
                                            );


                                    if (
                                        !href ||
                                        href === "#"
                                    ) {

                                        event.preventDefault();

                                    }

                                };

                        }


                        openModal();

                    }

                );

            }
        );



        /*
         * Open modal
         */

        function openModal() {

            if (!modal) {

                return;

            }


            modal.classList.add(
                "active"
            );


            modal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";


            if (modalClose) {

                modalClose.focus();

            }

        }



        /*
         * Close modal
         */

        function closeModal() {

            if (!modal) {

                return;

            }


            modal.classList.remove(
                "active"
            );


            modal.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.style.overflow =
                "";

        }



        if (modalClose) {

            modalClose.addEventListener(
                "click",
                closeModal
            );

        }


        if (modalBackdrop) {

            modalBackdrop.addEventListener(
                "click",
                closeModal
            );

        }



        /*
         * ESC closes modal
         */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape"
                ) {

                    closeModal();

                }

            }
        );



        /* =====================================================
           RESIZE
        ====================================================== */

        window.addEventListener(
            "resize",
            () => {

                updateCarousel(
                    false
                );

            }
        );



        /* =====================================================
           INITIALIZE
        ====================================================== */

        updateCarousel(
            false
        );


    }
);
