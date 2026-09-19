document.addEventListener(
    "DOMContentLoaded",
    function () {


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



        /* =====================================================
           OPEN RESUME REQUEST MODAL
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


                        modalTitle.textContent =
                            "Request " +
                            resumeName;


                        requestedResume.value =
                            resumeName;


                        emailSubject.value =
                            resumeName +
                            " Request";


                        modal.classList.add(
                            "active"
                        );


                        modal.setAttribute(
                            "aria-hidden",
                            "false"
                        );


                        document.body.style.overflow =
                            "hidden";

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


            document.body.style.overflow =
                "hidden";
        }


        closeButton.addEventListener(
            "click",
            closeModal
        );


        overlay.addEventListener(
            "click",
            closeModal
        );



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

        form.addEventListener(
            "submit",
            function () {

                const submitButton =
                    form.querySelector(
                        ".submit-btn"
                    );


                submitButton.disabled =
                    true;


                submitButton.textContent =
                    "Sending Request...";

            }
        );



        /* =====================================================
           HORIZONTAL PRESENTATION
           ===================================================== */

        const slidesTrack =
            document.querySelector(
                ".slides-track"
            );


        const slides =
            document.querySelectorAll(
                ".slide"
            );


        const nextButton =
            document.getElementById(
                "nextSlide"
            );


        const prevButton =
            document.getElementById(
                "prevSlide"
            );


        const navLinks =
            document.querySelectorAll(
                ".nav-links a"
            );


        const footer =
            document.querySelector(
                ".footer"
            );


        let currentSlide =
            0;



        /* =====================================================
           SHOW SLIDE
           ===================================================== */

        function showSlide(index) {


            /* Keep index within range */

            if (index < 0) {

                index = 0;

            }


            if (
                index >= slides.length
            ) {

                index =
                    slides.length - 1;

            }


            currentSlide =
                index;



            /* Move horizontal track */

            slidesTrack.style.transform =
                `translateX(-${currentSlide * 100}vw)`;



            /* =================================================
               PREVIOUS ARROW
               ================================================= */

            if (
                currentSlide === 0
            ) {

                prevButton.classList.add(
                    "disabled"
                );

            } else {

                prevButton.classList.remove(
                    "disabled"
                );

            }



            /* =================================================
               NEXT ARROW
               ================================================= */

            if (
                currentSlide ===
                slides.length - 1
            ) {

                nextButton.classList.add(
                    "disabled"
                );

            } else {

                nextButton.classList.remove(
                    "disabled"
                );

            }



            /* =================================================
               FOOTER
               ================================================= */

            if (
                currentSlide ===
                slides.length - 1
            ) {

                footer.classList.add(
                    "show-footer"
                );

            } else {

                footer.classList.remove(
                    "show-footer"
                );

            }



            /* =================================================
               URL HASH
               ================================================= */

            const currentSection =
                slides[currentSlide].id;


            history.replaceState(
                null,
                "",
                "#" + currentSection
            );

        }



        /* =====================================================
           NEXT BUTTON
           ===================================================== */

        nextButton.addEventListener(
            "click",
            function () {

                showSlide(
                    currentSlide + 1
                );

            }
        );



        /* =====================================================
           PREVIOUS BUTTON
           ===================================================== */

        prevButton.addEventListener(
            "click",
            function () {

                showSlide(
                    currentSlide - 1
                );

            }
        );



        /* =====================================================
           KEYBOARD ARROWS
           ===================================================== */

        document.addEventListener(
            "keydown",
            function (event) {


                /* Don't change slide while modal is open */

                if (
                    modal.classList.contains(
                        "active"
                    )
                ) {

                    return;

                }



                if (
                    event.key === "ArrowRight"
                ) {

                    event.preventDefault();

                    showSlide(
                        currentSlide + 1
                    );

                }



                if (
                    event.key === "ArrowLeft"
                ) {

                    event.preventDefault();

                    showSlide(
                        currentSlide - 1
                    );

                }

            }
        );



        /* =====================================================
           NAVIGATION
           ===================================================== */

        navLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        const target =
                            link.getAttribute(
                                "href"
                            );


                        let slideIndex =
                            0;


                        if (
                            target ===
                            "#home"
                        ) {

                            slideIndex =
                                0;

                        }


                        else if (
                            target ===
                            "#resumes"
                        ) {

                            slideIndex =
                                1;

                        }


                        else if (
                            target ===
                            "#about"
                        ) {

                            slideIndex =
                                2;

                        }


                        else if (
                            target ===
                            "#contact"
                        ) {

                            slideIndex =
                                3;

                        }


                        showSlide(
                            slideIndex
                        );

                    }
                );

            }
        );



        /* =====================================================
           HERO — VIEW RESUMES
           ===================================================== */

        const viewResumes =
            document.querySelector(
                '.hero a[href="#resumes"]'
            );


        if (viewResumes) {

            viewResumes.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    showSlide(1);

                }
            );

        }



        /* =====================================================
           HERO — CONTACT ME
           ===================================================== */

        const contactMe =
            document.querySelector(
                '.hero a[href="#contact"]'
            );


        if (contactMe) {

            contactMe.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    showSlide(3);

                }
            );

        }



        /* =====================================================
           TOUCH / SWIPE SUPPORT
           ===================================================== */

        let touchStartX = 0;

        let touchEndX = 0;


        document.addEventListener(
            "touchstart",
            function (event) {

                if (
                    modal.classList.contains(
                        "active"
                    )
                ) {

                    return;

                }


                touchStartX =
                    event.changedTouches[0].screenX;

            },
            {
                passive: true
            }
        );


        document.addEventListener(
            "touchend",
            function (event) {

                if (
                    modal.classList.contains(
                        "active"
                    )
                ) {

                    return;

                }


                touchEndX =
                    event.changedTouches[0].screenX;


                handleSwipe();

            },
            {
                passive: true
            }
        );



        function handleSwipe() {

            const swipeDistance =
                touchEndX -
                touchStartX;


            /* Swipe left */

            if (
                swipeDistance < -60
            ) {

                showSlide(
                    currentSlide + 1
                );

            }


            /* Swipe right */

            if (
                swipeDistance > 60
            ) {

                showSlide(
                    currentSlide - 1
                );

            }

        }



        /* =====================================================
           LOAD HASHED SLIDE
           ===================================================== */

        function loadInitialSlide() {

            const hash =
                window.location.hash;


            if (
                hash === "#resumes"
            ) {

                showSlide(1);

            }

            else if (
                hash === "#about"
            ) {

                showSlide(2);

            }

            else if (
                hash === "#contact"
            ) {

                showSlide(3);

            }

            else {

                showSlide(0);

            }

        }



        /* =====================================================
           INITIALIZE
           ===================================================== */

        loadInitialSlide();

    }
);
