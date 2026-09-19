/* =========================================================
   RESUME CAROUSEL
========================================================= */

Const track =
    Document.getElementById(“resumeTrack”);

Const viewport =
    Document.getElementById(“carouselViewport”);

Const cards =
    Array.from(
        Document.querySelectorAll(“.resume-card”)
    );

Const nextButton =
    Document.querySelector(“.carousel-next”);

Const prevButton =
    Document.querySelector(“.carousel-prev”);

Const dots =
    Array.from(
        Document.querySelectorAll(“.dot”)
    );


Let currentIndex = 0;



/* =========================================================
   POSITION CAROUSEL
========================================================= */

Function updateCarousel(
    Animate = true
) {

    If (!cards.length) {
        Return;
    }


    Const activeCard =
        Cards[currentIndex];


    /*
       Find the position of the active card
       And move it to the center of the viewport.
    */

    Const viewportWidth =
        Viewport.offsetWidth;

    Const cardCenter =
        activeCard.offsetLeft +
        activeCard.offsetWidth / 2;


    const offset =
        viewportWidth / 2 –
        cardCenter;


    if (!animate) {

        track.style.transition =
            “none”;

    } else {

        Track.style.transition =
            “transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)”;
    }


    Track.style.transform =
        `translateX(${offset}px)`;


    updateDots();


    updateButtons();

}



/* =========================================================
   DOTS
========================================================= */

Function updateDots() {

    Dots.forEach(
        (dot, index) => {

            Dot.classList.toggle(
                “active”,
                Index === currentIndex
            );

        }
    );

}



/* =========================================================
   BUTTON STATES
========================================================= */

Function updateButtons() {

    /*
       We keep all three cards in a loop.
       Therefore arrows never become disabled.
    */

    prevButton.disabled = false;
    nextButton.disabled = false;

}



/* =========================================================
   NEXT
========================================================= */

Function goNext() {

    currentIndex++;

    if (
        currentIndex >= cards.length
    ) {

        currentIndex = 0;

    }

    updateCarousel();

}



/* =========================================================
   PREVIOUS
========================================================= */

Function goPrevious() {

    currentIndex--;

    if (
        currentIndex < 0
    ) {

        currentIndex =
            cards.length – 1;

    }

    updateCarousel();

}



/* =========================================================
   BUTTON EVENTS
========================================================= */

nextButton.addEventListener(
    “click”,
    goNext
);

prevButton.addEventListener(
    “click”,
    goPrevious
);



/* =========================================================
   DOT EVENTS
========================================================= */

Dots.forEach(
    (dot, index) => {

        Dot.addEventListener(
            “click”,
            () => {

                currentIndex = index;

                updateCarousel();

            }
        );

    }
);



/* =========================================================
   KEYBOARD NAVIGATION
========================================================= */

Document.addEventListener(
    “keydown”,
    (event) => {

        /*
           Don’t trigger carousel while typing
           In the form.
        */

        Const activeElement =
            Document.activeElement;

        Const isTyping =
            activeElement &&
            (
                activeElement.tagName === “INPUT” ||
                activeElement.tagName === “TEXTAREA”
            );


        If (isTyping) {
            Return;
        }


        If (
            Event.key === “ArrowRight”
        ) {

            goNext();

        }


        If (
            Event.key === “ArrowLeft”
        ) {

            goPrevious();

        }

    }
);



/* =========================================================
   TOUCH / SWIPE
========================================================= */

Let touchStartX = 0;
Let touchEndX = 0;


Viewport.addEventListener(
    “touchstart”,
    (event) => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        Passive: true
    }
);


Viewport.addEventListener(
    “touchend”,
    (event) => {

        touchEndX =
            event.changedTouches[0].screenX;


        const difference =
            touchStartX – touchEndX;


        /*
           Swipe left
        */

        If (
            Difference > 50
        ) {

            goNext();

        }


        /*
           Swipe right
        */

        If (
            Difference < -50
        ) {

            goPrevious();

        }

    },
    {
        Passive: true
    }
);



/* =========================================================
   WINDOW RESIZE
========================================================= */

Window.addEventListener(
    “resize”,
    () => {

        updateCarousel(false);

    }
);



/* =========================================================
   INITIAL CAROUSEL POSITION
========================================================= */

Window.addEventListener(
    “load”,
    () => {

        updateCarousel(false);

    }
);



/* =========================================================
   RESUME REQUEST MODAL
========================================================= */

Const modal =
    Document.getElementById(
        “resumeModal”
    );

Const closeModalButton =
    Document.querySelector(
        “.close-modal”
    );

Const modalOverlay =
    Document.querySelector(
        “.modal-overlay”
    );

Const requestedResume =
    Document.getElementById(
        “requestedResume”
    );

Const emailSubject =
    Document.getElementById(
        “emailSubject”
    );



/* =========================================================
   OPEN MODAL
========================================================= */

Const requestButtons =
    Document.querySelectorAll(
        “.request-btn”
    );


requestButtons.forEach(
    (button) => {

        Button.addEventListener(
            “click”,
            () => {

                Const resumeName =
                    Button.dataset.resume;


                /*
                   Store which resume
                   The recruiter requested.
                */

                requestedResume.value =
                    resumeName;


                /*
                   Change the email subject
                   Automatically.
                */

                emailSubject.value =
                    `${resumeName} – Resume Request`;


                /*
                   Open modal.
                */

                Modal.classList.add(
                    “active”
                );

                Modal.setAttribute(
                    “aria-hidden”,
                    “false”
                );


                /*
                   Prevent page scrolling
                   While modal is open.
                */

                Document.body.style.overflow =
                    “hidden”;


                /*
                   Focus the first field.
                */

                setTimeout(
                    () => {

                        Document
                            .getElementById(“name”)
                            .focus();

                    },
                    200
                );

            }
        );

    }
);



/* =========================================================
   CLOSE MODAL FUNCTION
========================================================= */

Function closeModal() {

    Modal.classList.remove(
        “active”
    );

    Modal.setAttribute(
        “aria-hidden”,
        “true”
    );

    Document.body.style.overflow =
        “”;

}



/* =========================================================
   CLOSE BUTTON
========================================================= */

closeModalButton.addEventListener(
    “click”,
    closeModal
);



/* =========================================================
   CLOSE BY CLICKING OUTSIDE
========================================================= */

modalOverlay.addEventListener(
    “click”,
    closeModal
);



/* =========================================================
   ESCAPE KEY
========================================================= */

Document.addEventListener(
    “keydown”,
    (event) => {

        If (
            Event.key === “Escape” &&
            Modal.classList.contains(“active”)
        ) {

            closeModal();

        }

    }
);

