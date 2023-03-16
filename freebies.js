gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: false
});

ScrollTrigger.matchMedia({
  // large
  "(min-width: 960px)": function () {
    // Section Scale
    $(".benefits-wrapper").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".benefits-wrapper");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "top 90%",
          end: "bottom bottom",
          scrub: 1
        }
      });
      tl.from(targetElement, {
        width: "10%",
        duration: 1
      });
      tl.from(".benefits-container", {
        y: "-10%",
        opacity: "0"
      });
    });
    // Header Text Hide

    $(".header-move").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(this);

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "top 50%",
          end: "top 60%",
          rotation: 10,
          scrub: 0.8
        }
      });
      tl.from(targetElement, {
        y: "100%",
        duration: 1
      });
    });
  }
});

$(".section-freebies_wrapper").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(this);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      start: "bottom bottom",
      end: "+=" + window.innerHeight * 0.5,
      scrub: 1
    }
  });
  tl.to(targetElement, {
    scale: 0.6,
    rotation: -10,
    duration: 2
  });
  tl.from(".section-freebies_content", {
    scale: 0.6,
    rotation: 10,
    duration: 2
  });
});

/*$(".section-freebies_content").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(this);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      start: "top bottom",
      end: "top 50%",
      scrub: 1
    }
  });
  tl.from(targetElement, {
    scale: 0.6,
    rotation: 10,
    duration: 2
  });
  tl.from(".benefits-container", {
    y: "-10%",
    opacity: "0"
  });
});
*/
