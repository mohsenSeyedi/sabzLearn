const swiper = new Swiper('.swiper-container', {
    speed: 100,
    loop: false,

    breakpoints: {
        500: {
            slidesPerView: 2
        },
        768: {
            slidesPerView: 3
        },
        900: {
            slidesPerView: 4
        },
        1200: {
            slidesPerView: 5
        }
    }
})


