window.onload = function () {
  setHeaderBehavior();
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
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

    }
}

function initMobileMenu() {
    const mobileMenuOpen = document.querySelector('.open-mobile-menu');
    const mobileMenuClose = document.querySelector('.close-mobile-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuOpen.onclick = function () {
        mobileMenu.style.display = 'flex';
        mobileMenuOpen.style.display = 'none';
        mobileMenuClose.style.display = 'block';
    };

    mobileMenuClose.onclick = function () {
        mobileMenu.style.display = 'none';
        mobileMenuOpen.style.display = 'block';
        mobileMenuClose.style.display = 'none';
    };
}

function setHeaderBehavior() {
    window.addEventListener('scroll', function() {
        const scrollPosition = (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || window.scrollY || 0;
        const header = document.querySelector('header');

        const collapsedClassname = 'header--collapsed';
        if (scrollPosition > 50 && !header.classList.contains(collapsedClassname)) {
            header.classList.add(collapsedClassname);
        } else if (scrollPosition <= 50 && header.classList.contains(collapsedClassname)) {
            header.classList.remove(collapsedClassname);
        }
    });
}

function setCurrentFooterYear() {
    const poweredTime = document.querySelector('footer time');
    poweredTime.textContent = `${(new Date()).getFullYear()}`;
}