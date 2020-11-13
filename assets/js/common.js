(function(window) {
    'use strict';

    let lastKnownScrollPosition = 0;
    let ticking = false;

    window.onload = listenLoad;
    window.addEventListener('scroll', listenScroll);
    window.addEventListener('resize', imageAsyncLoader);

    function listenLoad() {
        setCurrentFooterYear();
        initMobileMenu();
        initVendors();
        initSearchFeature();
        imageAsyncLoader();
    }

    function initVendors() {
        if (window.Swiper) {
            const isEng = document.documentElement.lang === 'en';
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
                // navigation: {
                //     nextEl: '.swiper-button-next',
                //     prevEl: '.swiper-button-prev'
                // },
                a11y: {
                    enabled: true,
                    notificationClass: 'swiper-notification',
                    prevSlideMessage: isEng ? 'Previous slide' : 'Предыдущий слайд',
                    nextSlideMessage: isEng ? 'Next slide' : 'Следующий слайд',
                    firstSlideMessage: isEng ? 'The first slide' : 'Это первый слайд',
                    lastSlideMessage: isEng ? 'The last slide' : 'Это последний слайд',
                    paginationBulletMessage: isEng ? 'Go to the slide №{{index}}' : 'Перейти к слайду №{{index}}'
                }
            });
        }
    }

    function initMobileMenu() {
        const mobileMenuOpen = document.querySelector('.open-mobile-menu');
        const mobileMenuClose = document.querySelector('.close-mobile-menu');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuContainer = document.querySelector('.mobile-menu-wrapper');

        mobileMenuOpen.onclick = function() {
            mobileMenu.style.display = 'flex';
            mobileMenuOpen.style.display = 'none';
            mobileMenuClose.style.display = 'block';
            mobileMenuContainer.style.width = '100vw';
            document.body.style.overflowY = 'hidden';
        };

        mobileMenuClose.onclick = function() {
            mobileMenu.style.display = 'none';
            mobileMenuOpen.style.display = 'block';
            mobileMenuClose.style.display = 'none';
            mobileMenuContainer.style.width = '0';
            document.body.style.overflowY = 'initial';
        };
    }

    function initSearchFeature() {
        const search = document.querySelector('#search');
        const submit = document.querySelector('#search-submit');

        if (search && submit) {
            const noResults = document.querySelector('.no-results');
            const items = document.getElementsByClassName('collectionItem');

            function clearSearch() {
                for (let i = 0, max = items.length; i < max; i++) {
                    items[i].style.display = 'flex';
                }
                noResults.style.display = 'none';
                noResults.setAttribute('aria-hidden', 'true');
            }

            function performSearch() {
                clearSearch();

                if (search.value) {
                    const words = search.value.trim().split(' ');
                    let count = 0;
                    for (let i = 0, max = items.length; i < max; i++) {
                        const item = items[i];
                        if (
                            item.textContent &&
                            item.textContent.match &&
                            !words.reduce((acc, word) => acc && item.textContent.match(word), true)
                        ) {
                            item.style.display = 'none';
                            count++;
                        }
                    }

                    if (count === items.length) {
                        noResults.style.display = 'block';
                        noResults.setAttribute('aria-hidden', 'false');
                    }
                }
            }

            search.onchange = performSearch;
            submit.onclick = event => {
                event.preventDefault && event.preventDefault();
                performSearch();
            };
        }
    }

    function setCurrentFooterYear() {
        const poweredTime = document.querySelector('footer time');
        poweredTime.textContent = `2019 - ${new Date().getFullYear()}`;
    }

    function listenScroll() {
        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                toggleTopLink();
                ticking = false;
            });
            ticking = true;
        }
    }

    function toggleTopLink() {
        const topLink = document.querySelector('.top-link');

        if (lastKnownScrollPosition > 600) {
            topLink.style.visibility = 'visible';
        } else {
            topLink.style.visibility = 'hidden';
        }
    }

    function imageAsyncLoader() {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const tail = vw > 1450 ? '.jpg' : vw > 800 ? '-1450w.jpg' : vw > 400 ? '-800w.jpg' : '-400w.jpg';

        const nodes = document.getElementsByClassName('asyncImage');
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const img = new Image();
            img.src = `${node.dataset.src}${tail}`;
            img.onload = () => {
                // node.classList.remove('asyncImage');
                node.style.backgroundImage = `url(${node.dataset.src}${tail})`;
            };
        }
    }
})(window);
