/* =========================================================
   RESUME CAROUSEL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const carousel =
        document.querySelector(".resume-carousel");

    const track =
        document.querySelector(".resume-track");

    const cards =
        document.querySelectorAll(".resume-card");

    const nextButton =
        document.getElementById("resumeNext");

    const prevButton =
        document.getElementById("resumePrev");

    const currentSlide =
        document.querySelector(".current-slide");


    if (
        !carousel ||
        !track ||
        !cards.length
    ) {
        return;
    }


    let currentIndex = 0;


    function getCardWidth() {

        const card =
            cards[0];

        const style =
            window.getComputedStyle(track);

        const gap =
            parseFloat(style.columnGap) ||
            parseFloat(style.gap) ||
            24;

        return (
            card.offsetWidth +
            gap
        );

    }


    function updateCarousel() {

        const move =
            getCardWidth() *
            currentIndex;

        track.style.transform =
            `translateX(-${move}px)`;


        if (currentSlide) {

            currentSlide.textContent =
                String(currentIndex + 1)
                    .padStart(2, "0");

        }

    }


    nextButton?.addEventListener(
        "click",
        () => {

            if (
                currentIndex <
                cards.length - 1
            ) {

                currentIndex++;

                updateCarousel();

            }

        }
    );


    prevButton?.addEventListener(
        "click",
        () => {

            if (
                currentIndex > 0
            ) {

                currentIndex--;

                updateCarousel();

            }

        }
    );


    window.addEventListener(
        "resize",
        updateCarousel
    );


    updateCarousel();

});
