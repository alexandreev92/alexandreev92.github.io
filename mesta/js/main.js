window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
        menuItem = document.querySelectorAll('.menu__item'),
        hamburger = document.querySelector('.string__hamburger'),
        btnmain = document.querySelectorAll('.btn-main');


    hamburger.addEventListener('click', () => {
        menu.classList.toggle('menu--active');
        hamburger.classList.toggle('active');
    });
    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.toggle('menu--active');
            hamburger.classList.toggle('string__hamburger--active');
        })
    });

    btnmain.forEach(item => {
        item.addEventListener('click', () => {
            btnmain.classList.toggle('active');
        })
    })


    // btnmain.addEventListener('click', () => {
    //     btnmain.classList.toggle('active');
    // })


})

// $(function () {
//     $('.string__hamburger').on('click', function () {
//         $('.menu').addClass('.menu--active');
//     });


// }) 
