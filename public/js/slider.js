const galleries =
  document.querySelectorAll("#project_detail").length > 0
    ? document.querySelectorAll("#project_detail")
    : document.querySelectorAll("#product_detail");

const highlightThumbnailMulti = () => {
  galleries.forEach((e) => {
    const slideGallery = e.querySelector(".slides");
    const slides = slideGallery.querySelectorAll("div");
    const thumbnailContainer = e.querySelector(".thumbnails");
    const slideCount = slides.length;
    const slideWidth = screen.width > 1290 ? screen.width / 3 : screen.width;

    const highlightThumbnail = () => {
      thumbnailContainer
        .querySelectorAll("div.highlighted")
        .forEach((el) => el.classList.remove("highlighted"));
      const index = Math.floor(slideGallery.scrollLeft / slideWidth);
      thumbnailContainer
        .querySelector(`div[data-id="${index}"]`)
        .classList.add("highlighted");
    };

    const scrollToElement = (el) => {
      const index = parseInt(el.dataset.id, 10);
      slideGallery.scrollTo(index * slideWidth, 0);
    };

    thumbnailContainer.innerHTML += [...slides]
      .map((slide, i) => `<div data-id="${i}"></div>`)
      .join("");

    thumbnailContainer.querySelectorAll("div").forEach((el) => {
      el.addEventListener("click", () => scrollToElement(el));
    });

    slideGallery.addEventListener("scroll", (e) => highlightThumbnail());

    highlightThumbnail();
  });
};

highlightThumbnailMulti();
