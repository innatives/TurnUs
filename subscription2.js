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
          duration: 5,
          scrub: 1
        }
      });
      tl.from(targetElement, {
        width: "10%",
        duration: 2,
        ease: "SlowMo.easeInOut"
      });
      tl.from(".benefits-container", {
        y: "-10%",
        duration: 2,
        opacity: "0"
      });
    });
    // Header Text Hide
  }
});
//FREEBIES WEBSITE

TweenMax.to(".arrow-down", 0.5, {
  y: -50,
  repeat: -1,
  ease: Back.easeOut,
  yoyoEase: Power3.easeOut
});

//Header rotation
ScrollTrigger.matchMedia({
  // large
  "(min-width: 960px)": function () {
    // FREEBIES WEBSITE
    $(".section-freebies_header").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(this);

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "top top",
          end: "+=" + window.innerHeight * 0.5,
          pin: true,
          pinSpace: false,
          snap: {
            snapTo: 0.1,
            duration: { min: 0.2, max: 1 },
            delay: 0.1
          },
          duration: 5,
          scrub: 2
        }
      });
      tl.to(targetElement, {
        scale: 0.6,
        rotation: -10,
        duration: 2
      });
      tl.to(".freebies-header_first", {
        y: "-170%",
        opacity: "100",
        scrub: 5,
        duration: 5
      });
    });
  }
});

ScrollTrigger.matchMedia({
  // large
  "(min-width: 960px)": function () {
    $(".section-freebies_content").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(this);

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "0" - window.innerHeight * 3,
          end: "top bottom",
          ease: "SlowMo.easeInOut",
          scrub: 0.1
        }
      });
      tl.from(targetElement, {
        scale: 0.6,
        rotation: 40,
        duration: 0.1
      });
    });
  }
});

ScrollTrigger.matchMedia({
  // large
  "(min-width: 960px)": function () {
    $(".section-products").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".product-main_wrapper");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "top 70%",
          end: "top 30%",
          ease: "SlowMo.easeInOut"
        }
      });
      tl.from(targetElement, {
        y: "50%",
        duration: 1
      });
      tl.from(".product-title-second_wrapper", {
        y: "20%",
        delay: 0.2,
        ease: "card"
      });
    });
  }
});

// MARQUEE SCRIPT
// MARQUEE POWER-UP
window.addEventListener("DOMContentLoaded", (event) => {
  // attribute value checker
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
    if (attrVal === "true" && defaultValType === "boolean") return true;
    if (attrVal === "false" && defaultValType === "boolean") return false;
    if (isNaN(attrVal) && defaultValType === "string") return attrVal;
    if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
    return defaultVal;
  }
  // marquee component
  $("[tr-marquee-element='component']").each(function (index) {
    let componentEl = $(this),
      panelEl = componentEl.find("[tr-marquee-element='panel']"),
      triggerHoverEl = componentEl.find("[tr-marquee-element='triggerhover']"),
      triggerClickEl = componentEl.find("[tr-marquee-element='triggerclick']");
    let speedSetting = attr(100, componentEl.attr("tr-marquee-speed")),
      verticalSetting = attr(false, componentEl.attr("tr-marquee-vertical")),
      reverseSetting = attr(false, componentEl.attr("tr-marquee-reverse")),
      scrollDirectionSetting = attr(
        false,
        componentEl.attr("tr-marquee-scrolldirection")
      ),
      scrollScrubSetting = attr(
        false,
        componentEl.attr("tr-marquee-scrollscrub")
      ),
      moveDistanceSetting = -100,
      timeScaleSetting = 1,
      pausedStateSetting = false;
    if (reverseSetting) moveDistanceSetting = 100;
    let marqueeTimeline = gsap.timeline({
      repeat: -1,
      onReverseComplete: () => marqueeTimeline.progress(1)
    });
    if (verticalSetting) {
      speedSetting = panelEl.first().height() / speedSetting;
      marqueeTimeline.fromTo(
        panelEl,
        { yPercent: 0 },
        { yPercent: moveDistanceSetting, ease: "none", duration: speedSetting }
      );
    } else {
      speedSetting = panelEl.first().width() / speedSetting;
      marqueeTimeline.fromTo(
        panelEl,
        { xPercent: 0 },
        { xPercent: moveDistanceSetting, ease: "none", duration: speedSetting }
      );
    }
    let scrubObject = { value: 1 };
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (!pausedStateSetting) {
          if (scrollDirectionSetting && timeScaleSetting !== self.direction) {
            timeScaleSetting = self.direction;
            marqueeTimeline.timeScale(self.direction);
          }
          if (scrollScrubSetting) {
            let v = self.getVelocity() * 0.006;
            v = gsap.utils.clamp(-60, 60, v);
            let scrubTimeline = gsap.timeline({
              onUpdate: () => marqueeTimeline.timeScale(scrubObject.value)
            });
            scrubTimeline.fromTo(
              scrubObject,
              { value: v },
              { value: timeScaleSetting, duration: 0.5 }
            );
          }
        }
      }
    });
    function pauseMarquee(isPausing) {
      pausedStateSetting = isPausing;
      let pauseObject = { value: 1 };
      let pauseTimeline = gsap.timeline({
        onUpdate: () => marqueeTimeline.timeScale(pauseObject.value)
      });
      if (isPausing) {
        pauseTimeline.fromTo(
          pauseObject,
          { value: timeScaleSetting },
          { value: 0, duration: 0.5 }
        );
        triggerClickEl.addClass("is-paused");
      } else {
        pauseTimeline.fromTo(
          pauseObject,
          { value: 0 },
          { value: timeScaleSetting, duration: 0.5 }
        );
        triggerClickEl.removeClass("is-paused");
      }
    }
    if (window.matchMedia("(pointer: fine)").matches) {
      triggerHoverEl.on("mouseenter", () => pauseMarquee(true));
      triggerHoverEl.on("mouseleave", () => pauseMarquee(false));
    }
    triggerClickEl.on("click", function () {
      !$(this).hasClass("is-paused") ? pauseMarquee(true) : pauseMarquee(false);
    });
  });
});

//SPLIT TEXT
window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 80%",
      onEnter: () => timeline.play()
    });
  }

  $("[words-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), {
      opacity: 0,
      yPercent: 100,
      duration: 0.5,
      ease: "back.out(2)",
      stagger: { amount: 0.5 }
    });
    createScrollTrigger($(this), tl);
  });

  $("[words-rotate-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.set($(this).find(".word"), { transformPerspective: 1000 });
    tl.from($(this).find(".word"), {
      rotationX: -90,
      duration: 0.6,
      ease: "power2.out",
      stagger: { amount: 0.6 }
    });
    createScrollTrigger($(this), tl);
  });

  $("[words-slide-from-right]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), {
      opacity: 0,
      x: "1em",
      duration: 0.6,
      ease: "power2.out",
      stagger: { amount: 0.2 }
    });
    createScrollTrigger($(this), tl);
  });

  $("[letters-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      yPercent: 100,
      duration: 0.2,
      ease: "power1.out",
      stagger: { amount: 0.6 }
    });
    createScrollTrigger($(this), tl);
  });

  $("[letters-slide-down]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      yPercent: -120,
      duration: 0.3,
      ease: "power1.out",
      stagger: { amount: 0.7 }
    });
    createScrollTrigger($(this), tl);
  });

  $("[letters-fade-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      opacity: 0,
      duration: 0.2,
      ease: "power1.out",
      stagger: { amount: 0.8 }
    });
    createScrollTrigger($(this), tl);
  });

  $("[letters-fade-in-random]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      opacity: 0,
      duration: 0.05,
      ease: "power1.out",
      stagger: { amount: 0.4, from: "random" }
    });
    createScrollTrigger($(this), tl);
  });

  $("[scrub-each-word]").each(function (index) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 90%",
        end: "top center",
        scrub: true
      }
    });
    tl.from($(this).find(".word"), {
      opacity: 0.2,
      duration: 0.2,
      ease: "power1.out",
      stagger: { each: 0.4 }
    });
  });

  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});

/*
///JQUERY
$(".product-link-button").on("click", function () {
  $(".product-form_wrapper").addClass("is-active");
  $(".product-link-button").addClass("is-visible");
}); */

// Light to Dark Color Change

ScrollTrigger.matchMedia({
  "(min-width: 960px)": function () {
    $(".section-turnus").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(this);

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          // can also use "20px 80%"
          start: "top top",
          end: "bottom bottom",
          scrub: 1
        }
      });
      tl.fromTo(
        targetElement,
        {
          backgroundColor: "#f6f3fb",
          color: "#2e2a27",
          duration: 1
        },
        {
          backgroundColor: "#f1cd50",
          color: "#e8e2da",
          duration: 1
        }
      );
    });
  }
});

ScrollTrigger.matchMedia({
  // large
  "(min-width: 960px)": function () {
    $(".turnus-services").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".turnus-services_cta");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "top center",
          end: "bottom 80%",
          scrub: 1
        }
      });
      tl.from(".main-title_bg", {
        width: 0,
        ease: "expo.out",
        duration: 3
      });

      tl.from(targetElement, {
        yPercent: 100,
        stagger: 2,
        ease: "expo.inOut",
        duration: 10
      });
    });
  }
});

ScrollTrigger.matchMedia({
  // large
  "(max-width: 720px)": function () {
    $(".turnus-services").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".turnus-services_cta");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "top top",
          end: "top 20%",
          scrub: 1
        }
      });
      tl.from(".main-title_bg", {
        width: 0,
        ease: "expo.out",
        duration: 3
      });
    });
  }
});

ScrollTrigger.matchMedia({
  "(max-width: 720px)": function () {
    $(".section-turnus").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(this);

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          // can also use "20px 80%"
          start: "top top",
          end: "top 10%",
          scrub: 1
        }
      });
      tl.fromTo(
        targetElement,
        {
          backgroundColor: "#f6f3fb",
          color: "#2e2a27",
          duration: 1
        },
        {
          backgroundColor: "#f1cd50",
          color: "#e8e2da",
          duration: 1
        }
      );
    });
  }
});

ScrollTrigger.matchMedia({
  // large
  "(min-width: 960px)": function () {
    $(".freebies-intro_columns").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".product-image-icon");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "center bottom",
          end: "top 50%",
          duration: 2,
          scrub: 1,
          ease: "SlowMo.easeInOut"
        }
      });
      tl.from(targetElement, {
        x: "200%",
        ease: "back.out(2)",
        opacity: 0,
        stagger: { amount: 1 },
        ase: "SlowMo.easeInOut"
      });
    });
  }
});

$(".services-elements").each(function (index) {
  let tl = gsap.timeline({ paused: true });

  tl.set(this, {
    display: "block"
  })
    .to(this, {
      scale: 1.2,
      backgroundColor: "#daf203",
      ease: "power2.inOut"
    })
    .to(
      $(this).find(".line"),
      {
        ease: "power2.inOut",
        backgroundColor: "#000000"
      },
      0
    );

  $(this).on("mouseenter", function () {
    tl.timeScale(1);
    tl.restart();
  });
  $(this).on("mouseleave", function () {
    tl.timeScale(1);
    tl.reverse();
  });
});

$(".plan_left").each(function (index) {
  let tl = gsap.timeline({ paused: true });

  tl.set(this, {
    display: "flex"
  })
    .to(this, {
      scale: 1.1,
      backgroundColor: "#daf203",
      ease: "power2.inOut"
    })
    .to(
      $(this).find(".button-plans"),
      {
        ease: "power4.inOut",
        backgroundColor: "#000000",
        color: "#ffffff"
      },
      0
    )
    .to(
      $(this).find(".plan_features-icon"),
      {
        ease: "power2.inOut",
        backgroundColor: "#000000",
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
    $(".benefits-header").each(function (index) {
      let triggerElement = $(this);
      let targetElement = $(".header-move");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "top 30%",
          end: "top top",
          duration: 2,
          scrub: 2,
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
