window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu__item'),
    hamburger = document.querySelector('.string__hamburger');

    hamburger.addEventListener('click', () => {;
        menu.classList.toggle('menu--active');
        hamburger.classList.toggle('string__hamburger--active');
    });
})