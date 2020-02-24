(function(window) {
    'use strict';

    window.onload = function() {
        setCurrentFooterYear();
        initMobileMenu();
        initVendors();
    };

    function initVendors() {
        if (window.Swiper) {
            const swiper = new window.Swiper('.swiper-container', {
                spaceBetween: 30,
                centeredSlides: true,
                effect: 'fade',
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                a11y: {
                    enabled: true,
                    notificationClass: 'swiper-notification',
                    prevSlideMessage: 'Предыдущий слайд',
                    nextSlideMessage: 'Следующий слайд',
                    firstSlideMessage: 'Это первый слайд',
                    lastSlideMessage: 'Это последний слайд',
                    paginationBulletMessage: 'Перейти к слайду {{index}}'
                }
            });
        }
    }

    function initMobileMenu() {
        const mobileMenuOpen = document.querySelector('.open-mobile-menu');
        const mobileMenuClose = document.querySelector('.close-mobile-menu');
        const mobileMenu = document.querySelector('.mobile-menu');

        mobileMenuOpen.onclick = function() {
            mobileMenu.style.display = 'flex';
            mobileMenuOpen.style.display = 'none';
            mobileMenuClose.style.display = 'block';
        };

        mobileMenuClose.onclick = function() {
            mobileMenu.style.display = 'none';
            mobileMenuOpen.style.display = 'block';
            mobileMenuClose.style.display = 'none';
        };
    }

    function setCurrentFooterYear() {
        const poweredTime = document.querySelector('footer time');
        poweredTime.textContent = `2019 - ${new Date().getFullYear()}`;
    }
})(window);
