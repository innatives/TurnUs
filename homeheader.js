gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false
});

ScrollTrigger.matchMedia({
  // large
  "(min-width: 960px)": function () {
    // Section Scale
    $(".hero").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".hero-img");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "top top",
          end: "bottom+=1vh",
          transformOrigin: "top",
          ease: "sine.out",
          duration: 1,
          scrub: true,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
          scrub: 0.1
        }
      });
      tl.to(targetElement, {
        height: 0,
        padding: "10"
      });
    });
    // Header Text Hide
  }
});
