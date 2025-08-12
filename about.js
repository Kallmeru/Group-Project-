document.addEventListener("DOMContentLoaded", function() {

    /* ------------------------
       Scroll-triggered animation
       ------------------------ */
    function checkInView() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            const elBottom = el.getBoundingClientRect().bottom;

            // Check if at least part of the element is in the viewport
            const isInView = elTop < window.innerHeight && elBottom >= 0;

            if (isInView) {
                el.classList.add('in-view');
            } else {
                el.classList.remove('in-view');
            }
        });
    }

    window.addEventListener('scroll', checkInView);
    window.addEventListener('resize', checkInView);
    checkInView();


    /* ------------------------
       Go to Top Button
       ------------------------ */
    let goTopBtn = document.getElementById("goTopBtn");

    // Show the button when the user scrolls down 100px from the top of the document
    window.addEventListener("scroll", function() {
        if (document.documentElement.scrollTop > 100 || document.body.scrollTop > 100) {
            goTopBtn.style.display = "block";
            goTopBtn.style.opacity = "1";
            goTopBtn.setAttribute('tabindex', '0');
        } else {
            goTopBtn.style.opacity = "0";
            setTimeout(() => { goTopBtn.style.display = "none"; }, 300);
            goTopBtn.setAttribute('tabindex', '-1');
        }
    });

    // When the user clicks on the button, scroll to the top of the document
    goTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Keyboard accessibility for Go to Top button
    goTopBtn.addEventListener("keydown", function(e) {
        if (e.key === "Enter" || e.key === " ") {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });

});