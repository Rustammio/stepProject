const btnMenu = document.querySelector(".nav__burger-menu");
const btnLines = document.querySelector(".nav__burger-lines");
const menu = document.querySelector(".nav__content-wrapper");

btnMenu.addEventListener("click", () => {
  btnLines.classList.toggle("nav__burger-lines--active");
  menu.classList.toggle("nav__content-wrapper--open");
});

document.querySelector(".modal-container").addEventListener("click", () => {
  btnLines.classList.remove("nav__burger-lines--active");
  menu.classList.remove("nav__content-wrapper--open");
});
