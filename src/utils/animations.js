export const initPageAnimations = () => {
  if (typeof gsap !== "undefined") {
    // Fade in elements as they scroll into view
    gsap.utils.toArray(".animate-on-scroll").forEach((element, i) => {
      gsap.from(element, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
        },
      });
    });

    // Animate statistics
    gsap.utils.toArray(".stat-number").forEach((stat) => {
      const endValue = parseInt(stat.getAttribute("data-value"));
      gsap.from(stat, {
        textContent: 0,
        duration: 2,
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: stat,
          start: "top 80%",
        },
        onUpdate: function () {
          stat.textContent = Math.ceil(this.targets()[0].textContent);
        },
      });
    });

    // Image hover effects
    gsap.utils.toArray(".image-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }
};
