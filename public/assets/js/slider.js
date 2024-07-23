document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("default-carousel");
  const items = carousel.querySelectorAll("[data-carousel-item]");
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const indicators = carousel.querySelectorAll("[data-carousel-slide-to]");
  let currentIndex = 0;
  let intervalId;

  function showSlide(index) {
    const totalItems = items.length;
    const prevIndex = (index - 1 + totalItems) % totalItems;
    const nextIndex = (index + 1) % totalItems;

    items.forEach((item, i) => {
      if (i === prevIndex) {
        item.classList.remove("hidden", "translate-x-full", "translate-x-0");
        item.classList.add("-translate-x-full");
      } else if (i === index) {
        item.classList.remove(
          "hidden",
          "-translate-x-full",
          "translate-x-full"
        );
        item.classList.add("translate-x-0");
      } else if (i === nextIndex) {
        item.classList.remove("hidden", "-translate-x-full", "translate-x-0");
        item.classList.add("translate-x-full");
      } else {
        item.classList.add("hidden");
      }
    });

    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.setAttribute("aria-current", "true");
        indicator.classList.add("bg-white");
        indicator.classList.remove("bg-gray-500/50");
      } else {
        indicator.setAttribute("aria-current", "false");
        indicator.classList.remove("bg-white");
        indicator.classList.add("bg-gray-500/50");
      }
    });

    currentIndex = index;
  }

  function nextSlide() {
    showSlide((currentIndex + 1) % items.length);
  }

  function prevSlide() {
    showSlide((currentIndex - 1 + items.length) % items.length);
  }

  function startAutoPlay() {
    intervalId = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    clearInterval(intervalId);
  }

  nextButton.addEventListener("click", () => {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  });

  prevButton.addEventListener("click", () => {
    stopAutoPlay();
    prevSlide();
    startAutoPlay();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      stopAutoPlay();
      showSlide(index);
      startAutoPlay();
    });
  });

  let startX = 0;
  let moveX = 0;

  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    stopAutoPlay();
  });

  carousel.addEventListener("touchmove", (e) => {
    moveX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", () => {
    if (startX - moveX > 50) {
      nextSlide();
    } else if (moveX - startX > 50) {
      prevSlide();
    }
    startAutoPlay();
  });

  carousel.addEventListener("mouseenter", stopAutoPlay);
  carousel.addEventListener("mouseleave", startAutoPlay);

  showSlide(0);
  startAutoPlay();
  carousel.classList.remove("carousel-initialized");
});
