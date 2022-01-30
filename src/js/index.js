const btnMenu = document.querySelector(".nav__burger-menu");
const btnLines = document.querySelector(".nav__burger-lines");
const menu = document.querySelector(".nav__content-wrapper");
const menuItem = document.querySelector(".nav__item");
const menuLink = document.querySelector(".nav__link");

btnMenu.addEventListener("click", () => {
  btnLines.classList.toggle("nav__burger-lines--active");
  menu.classList.toggle("nav__content-wrapper--open");
});

document.addEventListener("click", (e) => {
  if (
    e.target !== btnLines &&
    e.target !== btnMenu &&
    e.target.className !== "nav__item" &&
    e.target.className !== "nav__link"
  ) {
    btnLines.classList.remove("nav__burger-lines--active");
    menu.classList.remove("nav__content-wrapper--open");
  }
});
