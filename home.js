gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false
});
ScrollTrigger.matchMedia({
  // large
  "(min-width: 960px)": function () {
    // FREEBIES WEBSITE
    $(".portfolio-grid").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".collection-project-item");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "top 90%",
          end: "top 20%"
        }
      });
      tl.from(targetElement, {
        y: "100%",
        duration: 1,
        ease: "power1.inOut",
        stagger: { each: 0.4 }
      });
    });
  }
});

$(".projects-button").each(function (index) {
  let tl = gsap.timeline({ paused: true });

  tl.set($(this).find(".projects-button"), {
    display: "block"
  })
    .to($(this).find(".button-project-icon"), {
      x: "50%",
      ease: "power2.inOut",
      backgroundColor: "#033f2e",
      color: "#ffffff"
    })

    .to(
      $(this).find(".project-button-text"),
      {
        ease: "power2.inOut",
        backgroundColor: "#033f2e",
        color: "#ffffff"
      },

      0
    );

  $(this).on("mouseenter", function () {
    tl.timeScale(1);
    tl.restart();
  });
  $(this).on("mouseleave", function () {
    tl.timeScale(3);
    tl.reverse();
  });
});

ScrollTrigger.matchMedia({
  // large
  "(min-width: 960px)": function () {
    $(".section-portfolio-services").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".services-elements");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "center bottom",
          end: "top top",
          duration: 2,
          scrub: 1,
          ease: "SlowMo.easeInOut"
        }
      });
      tl.from(targetElement, {
        y: "100%",
        ease: "back.out(2)",
        opacity: 0,
        stagger: { amount: 1 },
        ase: "SlowMo.easeInOut"
      });
    });
  }
});
