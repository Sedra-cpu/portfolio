document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll(".reveal-left, .reveal-right");

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    // عدم تفعيل الحركة إلا عندما يدخل العنصر مسافة 80px داخل الشاشة عند السكرول
    rootMargin: "0px 0px -80px 0px",
    threshold: 0.2
  });

  revealElements.forEach((element) => {
    revealOnScroll.observe(element);
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const techCards = document.querySelectorAll(".tech-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // تأخير تدريجي لكل بطاقة لتعطي تأثير التجمع المنتظم
        const cards = entry.target.parentElement.querySelectorAll(".tech-card");
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("active");
          }, index * 80);
        });
      }
    });
  }, {
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.2
  });

  const techGrids = document.querySelectorAll(".tech-grid");
  techGrids.forEach((grid) => observer.observe(grid));
});