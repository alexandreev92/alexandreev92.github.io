$(function(){
    $('.top-slider').slick({
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
                arrows: false
            }
          },
          {
            breakpoint: 640,
            settings: {
                arrows: false

            }
          }
        ]
      });

      $('.top-slider2').slick({
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
                arrows: false
            }
          },
          {
            breakpoint: 640,
            settings: {
                arrows: false

            }
          }
        ]
      });
    
      $('a.upbutton').on('click', function() {
        $('html, body').animate({
          scrollTop: 0
        }, 700);
        return false;
      });

      // Выпадающее меню (все блоки открыты)
      // ======================================

      // $(".menu__item-btn").on('click', function() {
      //   $(this).next("div.menu__item-slide").slideToggle(200);
      // });
      
      // Выпадающее меню/аккордеон (открывается только один блок)
      // ========================================================
      $('.menu__item-btn').on('click', function(){
        // $(this).addClass('active-button')
        $(this).find('i').addClass('rotate')
        let option = $(this).next().css('display')
        if (option=='block'){
          $(this).next().slideUp(200)
          $(this).removeClass('active-button')
          $(this).find('i').toggleClass('rotate')
        }
        else {
        $('.menu__item-slide').slideUp(200)
        $(this).next().slideDown(200)
        }
        });
      
        $('.cards__docs-title').on('click', function() {
          $(this).next('div.cards__docs-descr').slideToggle(200),
          $(this).toggleClass('active'),
          $(this).find('i').toggleClass('rotate')
          });
      
        // ПОДСВЕЧИВАНИЕ АКТИВНЫХ ССЫЛОК В МЕНЮ (JQuery)
        $('.menu li a').each(function () {
          let location = window.location.href;
          let link = this.href; 
          if(location == link) {
              $(this).addClass('active-button')
          }
        });
      // МОДАЛЬОЕ ОКНО
      $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeToggle(200)
        $('.call__btn').toggleClass('call__btn-active')
      });
      $('.modal__close').on('click', function(){
        $('.overlay, #consultation').fadeOut(200)
        $('.call__btn').removeClass('call__btn-active')
      });

      // ГАЛЕРЕЯ ВСПЛЫВАЮЩИЕ КАРТИНКИ
      $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
          titleSrc: function(item) {
            return item.el.attr('title') + '<small>ООО "ТАХОСФЕРА"</small>';
          }
        }
      });
});





window.addEventListener('DOMContentLoaded', () => {
        // ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
  const menu = document.querySelector('.menu'),
        menuItem = document.querySelectorAll('.menu__item'),
        hamburger = document.querySelector('.menu__btn'),
        callBtn = document.querySelector('.call__btn');

          // КНОПКА ГАМБУРГЕР МЕНЯЕТ АКТИВНОСТЬ И ПОКАЗЫВАЕТ МЕНЮ
        hamburger.addEventListener('click', () => {
          hamburger.classList.toggle('menu__btn-active'),
          menu.classList.toggle('menu-active');
        });
        // ПРИ НАЖАТИИ НА КНОПКУ "ПОЗВОНИТЬ, ОТКРЫВАЕТСЯ ВЫЗОВ ФОРМЫ" ДОБАВЛЯЕТСЯ КЛАСС "НАЖАТИЯ, АКТИВНОСТИ" КНОПКИ 
        // callBtn.addEventListener('click', () => {
        //   callBtn.classList.toggle('call__btn-active');
        // });
        // ПРИ НАЖАТИИ НА ПУНКТ МЕНЮ ИЛИ КНОПКУ ГАМБУРГЕР СКРЫВАЕТСЯ МЕНЮ
        menuItem.forEach(item => {
          item.addEventListener('click', () => {
            hamburger.classList.toggle('menu__btn-active'),
            menu.classList.toggle('menu-active');
          })
        })
})
        // ПОДСВЕЧИВАНИЕ АКТИВНЫХ ССЫЛОК НА СТРАНИЦЕ(активные ссылки)
        onload = function (){
          for (let lnk = document.links, j = 0; j < lnk.length; j++)
          if (lnk [j].href == document.URL) lnk [j].style.cssText = 'color: #F3F09A'
        }




