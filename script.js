document.addEventListener("DOMContentLoaded", function () {


  /* =====================================================
     RESUME REQUEST MODAL
  ====================================================== */


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



  /* =====================================================
     OPEN RESUME MODAL
  ====================================================== */


  requestButtons.forEach(function (button) {


    button.addEventListener(
      "click",
      function () {


        const resumeName =
          button.getAttribute("data-resume");


        /*
          Change modal title
        */

        modalTitle.textContent =
          "Request " + resumeName;



        /*
          Store selected resume
        */

        requestedResume.value =
          resumeName;



        /*
          Change email subject
        */

        emailSubject.value =
          resumeName + " Request";



        /*
          Open modal
        */

        modal.classList.add("active");


        modal.setAttribute(
          "aria-hidden",
          "false"
        );


        document.body.classList.add(
          "modal-open"
        );



        /*
          Automatically focus first field
        */

        const firstInput =
          form.querySelector(
            "input:not([type='hidden']):not([name='_gotcha'])"
          );


        if (firstInput) {

          setTimeout(
            function () {

              firstInput.focus();

            },
            80
          );

        }

      }
    );

  });



  /* =====================================================
     CLOSE MODAL
  ====================================================== */


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



  /*
    Close using X button
  */

  closeButton.addEventListener(
    "click",
    closeModal
  );



  /*
    Close by clicking background
  */

  overlay.addEventListener(
    "click",
    closeModal
  );



  /* =====================================================
     ESCAPE KEY
  ====================================================== */


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



  /* =====================================================
     FORM SUBMISSION
  ====================================================== */


  form.addEventListener(
    "submit",
    function () {


      const submitButton =
        form.querySelector(".submit-btn");


      submitButton.disabled =
        true;


      submitButton.textContent =
        "Sending Request...";

    }
  );



  /* =====================================================
     RESUME CAROUSEL
  ====================================================== */


  const carousel =
    document.getElementById(
      "resumeCarousel"
    );


  const prevButton =
    document.querySelector(
      ".carousel-prev"
    );


  const nextButton =
    document.querySelector(
      ".carousel-next"
    );



  /*
    Make sure carousel exists
  */

  if (
    carousel &&
    prevButton &&
    nextButton
  ) {


    /* =================================================
       DETERMINE CARD WIDTH
    ================================================== */


    function getCardStep() {


      const card =
        carousel.querySelector(
          ".resume-card"
        );


      if (!card) {

        return 0;

      }


      const styles =
        window.getComputedStyle(
          carousel
        );


      const gap =
        parseFloat(
          styles.columnGap ||
          styles.gap ||
          0
        );


      return (
        card.getBoundingClientRect().width
        + gap
      );

    }



    /* =================================================
       SCROLL ONE CARD
    ================================================== */


    function scrollByCard(
      direction
    ) {


      carousel.scrollBy({

        left:
          direction *
          getCardStep(),

        behavior:
          "smooth"

      });

    }



    /* =================================================
       PREVIOUS BUTTON
    ================================================== */


    prevButton.addEventListener(
      "click",
      function () {

        scrollByCard(-1);

      }
    );



    /* =================================================
       NEXT BUTTON
    ================================================== */


    nextButton.addEventListener(
      "click",
      function () {

        scrollByCard(1);

      }
    );



    /* =================================================
       UPDATE ARROW STATE
    ================================================== */


    function updateArrowState() {


      const maxScroll =
        carousel.scrollWidth -
        carousel.clientWidth -
        2;



      /*
        Disable previous at beginning
      */

      prevButton.disabled =
        carousel.scrollLeft <= 2;



      /*
        Disable next at end
      */

      nextButton.disabled =
        carousel.scrollLeft >=
        maxScroll;



      /*
        Change opacity
      */

      prevButton.style.opacity =
        prevButton.disabled
          ? "0.35"
          : "1";


      nextButton.style.opacity =
        nextButton.disabled
          ? "0.35"
          : "1";

    }



    /* =================================================
       LISTEN TO SCROLL
    ================================================== */


    carousel.addEventListener(
      "scroll",
      updateArrowState,
      {
        passive: true
      }
    );



    /* =================================================
       LISTEN TO RESIZE
    ================================================== */


    window.addEventListener(
      "resize",
      updateArrowState
    );



    /*
      Initial state
    */

    updateArrowState();

  }

});
