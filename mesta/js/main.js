window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu__item'),
    hamburger = document.querySelector('.string__hamburger'),
    btn = document.querySelector('.btn');

    hamburger.addEventListener('click', () => {;
        menu.classList.toggle('menu--active');
        hamburger.classList.toggle('string__hamburger--active');
        })
    // btn.addEventListener('click', () => {
    //     btn.classList.toggle('btn--active');
    // })
    menuItem.forEach(item => {
        item.addEventListener('click', () => {;
            menu.classList.toggle('menu--active');
            hamburger.classList.toggle('string__hamburger--active');
        })
    });
    // btn.forEach (function (entry) {
    //     btn.addEventListener('click', () => {;
    //         btn.classList.toggle('btn--active');
    //     });

    // });
})
