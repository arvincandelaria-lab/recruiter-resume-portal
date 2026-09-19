document.addEventListener(
  "DOMContentLoaded",
  function () {


    /* =====================================================
       RESUME CAROUSEL
       ===================================================== */

    const viewport =
      document.getElementById(
        "resumeViewport"
      );

    const carousel =
      document.getElementById(
        "resumeCarousel"
      );

    const cards =
      document.querySelectorAll(
        ".resume-card"
      );

    const nextButton =
      document.querySelector(
        ".carousel-next"
      );

    const prevButton =
      document.querySelector(
        ".carousel-prev"
      );


    if (
      viewport &&
      carousel &&
      cards.length > 0
    ) {


      function getCardDistance() {

        const cardWidth =
          cards[0]
            .getBoundingClientRect()
            .width;

        const gap = 22;

        return cardWidth + gap;
      }


      /* ===============================================
         NEXT
         =============================================== */

      if (nextButton) {

        nextButton.addEventListener(
          "click",
          function () {

            viewport.scrollBy({
              left:
                getCardDistance(),
              behavior:
                "smooth"
            });

          }
        );

      }


      /* ===============================================
         PREVIOUS
         =============================================== */

      if (prevButton) {

        prevButton.addEventListener(
          "click",
          function () {

            viewport.scrollBy({
              left:
                -getCardDistance(),
              behavior:
                "smooth"
            });

          }
        );

      }


      /* ===============================================
         KEYBOARD ACCESSIBILITY
         =============================================== */

      viewport.addEventListener(
        "keydown",
        function (event) {

          if (
            event.key === "ArrowRight"
          ) {

            viewport.scrollBy({
              left:
                getCardDistance(),
              behavior:
                "smooth"
            });

          }

          if (
            event.key === "ArrowLeft"
          ) {

            viewport.scrollBy({
              left:
                -getCardDistance(),
              behavior:
                "smooth"
            });

          }

        }
      );

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
                "Missing data-resume attribute."
              );

              return;
            }


            /* UPDATE MODAL TITLE */

            modalTitle.textContent =
              "Request " +
              resumeName;


            /* SAVE SELECTED RESUME */

            requestedResume.value =
              resumeName;


            /* UPDATE EMAIL SUBJECT */

            emailSubject.value =
              resumeName +
              " Request";


            /* SHOW MODAL */

            modal.classList.add(
              "active"
            );

            modal.setAttribute(
              "aria-hidden",
              "false"
            );


            /* STOP BACKGROUND SCROLLING */

            document.body.classList.add(
              "modal-open"
            );


            /* FOCUS NAME FIELD */

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


    /* CLOSE BUTTON */

    if (closeButton) {

      closeButton.addEventListener(
        "click",
        closeModal
      );

    }


    /* CLICK OUTSIDE */

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


    /* =====================================================
       OPTIONAL:
       HORIZONTAL MOUSE WHEEL SUPPORT
       ===================================================== */

    if (viewport) {

      viewport.addEventListener(
        "wheel",
        function (event) {

          if (
            Math.abs(event.deltaY) >
            Math.abs(event.deltaX)
          ) {

            event.preventDefault();

            viewport.scrollLeft +=
              event.deltaY;

          }

        },
        {
          passive: false
        }
      );

    }


  }
);
