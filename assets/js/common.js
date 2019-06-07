window.onload = function () {
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

  const swiper = new Swiper('.swiper-container', {
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
};