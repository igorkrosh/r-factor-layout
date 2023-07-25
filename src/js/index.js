$(document).ready(Core);

function Core()
{
    InitOwlCarousel();
    InitMarquee();
    InitParticles();
    InitSpincrement();

    SetTabSwitcher();
    SetLangSwitcher();
    SetVideoLinks();
    SetNavbar();
    SetCursor();
    SetBtnUp();
    SetPageNav();
}

function SetTabSwitcher()
{
    $('.btn__tab__switch').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('active'))
        {
            return;
        }

        $('.btn__tab__switch').removeClass('active');
        $(this).addClass('active');

        let targetTab = $(this).attr('target');

        SwitchTab(targetTab)
    })
}

function SwitchTab(target)
{
    
    $('.tab.active').animate({
        opacity: 0
    }, 500, function() {
        $('.tab.active').removeClass('active');

        $(`[tab-name="${target}"]`).css('opacity', 0);
        $(`[tab-name="${target}"]`).addClass('active');
        
        let tabHeight = $(`[tab-name="${target}"]`)[0].clientHeight;
        $(`[tab-name="${target}"]`).closest('.tab__viewer').css('height', `${tabHeight}px`)

        $(`[tab-name="${target}"]`).animate({
            opacity: 1
        }, 500)
    })
}

function SetLangSwitcher()
{
    $('.switch-lang').on('click', function (e) {
        $(this).toggleClass('active')
    })
}

function SetVideoLinks()
{
    $('.video-link').on('click', function (e) {
        e.preventDefault();

        let video = '<source src="' + $(this).data('video') + '" type="video/mp4">'

        SimpleLightbox.open({
            content: '<video id="js-banner-video" class="l-banner__video" autoplay="" loop="" width="100%" controls>' +
                    video +
                    '</video>',
            elementClass: 'slbContentEl video-lightbox',
        });
    })

    $('.rutube-link').on('click', function (e) {
        e.preventDefault()

        let video = '<iframe width="100%" height="100%" src="'+ $(this).data('video') +'" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>  '
        SimpleLightbox.open({
            content: video,
            elementClass: 'slbContentEl video rutube-lightbox',
        });

    })
}

function SetNavbar()
{
    $(window).on('scroll', function (e) {
        let mainHeight = $('section.main').height();

        if (window.scrollY > mainHeight - 100)
        {
            if (!$('.navbar.sticky').hasClass('active'))
            {
                $('.navbar.sticky').addClass('active')
            }
        }
        else
        {
            if ($('.navbar.sticky').hasClass('active'))
            {
                $('.navbar.sticky').removeClass('active')
            }
        }
    })
}

function InitOwlCarousel()
{
    let secondScreen = $('section.second .owl-carousel');

    secondScreen.on("initialized.owl.carousel", function (e) {
        InitCarouselNav(e, secondScreen)
    }).owlCarousel({
        items: 3,
        slideBy: 3,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
    })

    $('.carousel-navs .btns .prev').on('click', function (e) {
        let currentNode = $(this).closest('section').find('.carousel-navs').find('.current');
        let current = parseInt($(currentNode).text());

        if (current > 1)
        {
            $(currentNode).text(--current);
            $(this).closest('section').find('.owl-carousel').trigger('prev.owl.carousel');
        }

    })

    $('.carousel-navs .btns .next').on('click', function (e) {
        let currentNode = $(this).closest('section').find('.carousel-navs').find('.current');
        let totalNode = $(this).closest('section').find('.carousel-navs').find('.total');
        let current = parseInt($(currentNode).text());
        let total = parseInt($(totalNode).text());

        if (current < total)
        {
            $(currentNode).text(++current);
            $(this).closest('section').find('.owl-carousel').trigger('next.owl.carousel');
        }
    })

    let productCarousel = $('section.products-carousel .owl-carousel');

    $(productCarousel).on("initialized.owl.carousel", function (e) {
        InitCarouselNav(e, productCarousel)
    }).owlCarousel({
        items: 1,
        slideBy: 1,
        dots: false,
        mouseDrag: false,
        touchDrag: false
    })

    $('section.products-carousel .navs a').on('mouseover', function (e) {
        let index = $(this).data('index');

        productCarousel.trigger('to.owl.carousel', index);

        $(this).closest('section').find('.carousel-navs').find('.current').text(index + 1);
        $('section.products-carousel .navs a').removeClass('active')
        $(this).addClass('active')
    })

    let pressCenter = $('section.press-center .owl-carousel');

    pressCenter.on("initialized.owl.carousel", function (e) {
        InitCarouselNav(e, pressCenter)
    }).owlCarousel({
        items: 3,
        slideBy: 3,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
    })

    let projectCarousel = $('section.projects .owl-carousel');

    projectCarousel.on("initialized.owl.carousel", function (e) {
        InitCarouselNav(e, projectCarousel)
    }).owlCarousel({
        items: 3,
        slideBy: 3,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
    })

    let topPositionsCarousel = $('section.top-positions .owl-carousel');

    topPositionsCarousel.on("initialized.owl.carousel", function (e) {
        InitCarouselNav(e, topPositionsCarousel)
    }).owlCarousel({
        items: 1,
        slideBy: 1,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        autoHeight: true
    })

    let historyCarousel = $('section.history .owl-carousel');

    historyCarousel.on("initialized.owl.carousel", function (e) {
        $('section.history .year').on('click', function (e) {
            let index = $(this).data('index');
            historyCarousel.trigger('to.owl.carousel', index);

            $('section.history .year').removeClass('active');
            $(this).addClass('active');
        });

        $('section.history .prev').on('click', function (e) {
            historyCarousel.trigger('prev.owl.carousel');

            if ($('section.history .year.active').prev().length > 0)
                $('section.history .year.active').removeClass('active').prev().addClass('active')
        })

        $('section.history .next').on('click', function (e) {
            historyCarousel.trigger('next.owl.carousel');

            if ($('section.history .year.active').next().length > 0)
                $('section.history .year.active').removeClass('active').next().addClass('active')
        })
    }).owlCarousel({
        items: 1,
        slideBy: 1,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        autoHeight: true
    })

    let strategyCarousel = $('section.strategy .owl-carousel')

    strategyCarousel.on("initialized.owl.carousel", function (e) {
        InitCarouselNav(e, strategyCarousel);

        $('section.strategy .btn-wrapper button').on('click', function (e) {
            let index = $(this).data('index');
            strategyCarousel.trigger('to.owl.carousel', index);

            $('section.strategy .btn-wrapper button').removeClass('active');
            $(this).addClass('active');

            $(this).closest('section').find('.carousel-navs').find('.current').text(index + 1);
        });
    }).owlCarousel({
        items: 1,
        slideBy: 1,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        autoHeight: true
    })

    let rewardsCarousel = $('section.rewards .owl-carousel');

    rewardsCarousel.on("initialized.owl.carousel", function (e) {
        InitCarouselNav(e, rewardsCarousel);
    }).owlCarousel({
        items: 3,
        slideBy: 3,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        autoHeight: true,
        margin: 80
    })
}

function InitCarouselNav(event, node)
{
    if (!event.namespace) {
        return;
    }
    let totalPage = Math.ceil(event.item.count / event.page.size);
    $(node).closest('section').find('.total').text(totalPage);
}


function SetCursor()
{
    $('section.second .carousel-item').on('mousemove', function (e) {
        let x = e.pageX - $(this).offset().left;
        let y = e.pageY - $(this).offset().top;

        $(this).find('.cursor').css('left', `${x}px`)
        $(this).find('.cursor').css('top', `${y}px`)
    })

    $('section.second .carousel-item').on('mouseover', function (e) {
        $(this).addClass('active')
    })

    $('section.second .carousel-item').on('mouseout', function (e) {
        $(this).removeClass('active')
    })
}

function InitMarquee()
{
    Marquee3k.init();
}

function SetBtnUp()
{
    $('.btn-up').on('click', function (e) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    })
}

function SetPageNav()
{
    $(window).on('scroll', function (e) {
        let mainHeight = $('section.main').height();

        if (window.scrollY > mainHeight - 100)
        {
            $('.page-nav').addClass('black')
        }
        else
        {
            if ($('.page-nav').hasClass('black'))
            {
                $('.page-nav').removeClass('black')
            }
        }

        let buttons = $('.page-nav .navs button');

        for (let button of buttons)
        {
            let nodeSelector = $(button).attr('nav');

            if (window.scrollY < $(nodeSelector).position().top + 100)
            {
                $('.page-nav .navs button').removeClass('active');
                $(button).addClass('active')
                return;
            }
        }
    });

    $('.page-nav .navs button').on('click', function (e) {
        let nodeSelector = $(this).attr('nav');
        window.scrollTo({
            top: $(nodeSelector).position().top,
            behavior: "smooth"
        });
    })
}

function InitParticles()
{
    particlesJS.load('particles-js', 'assets/js/particles.json', function() {
        console.log('callback - particles.js config loaded');
    });
}

function InitSpincrement()
{
    $(window).scroll(function (e) {
        if (!$('.spincrement-wrapper').offset())
        {
            return
        }

        let wrappers = $('.spincrement-wrapper');

        for (let wrapper of wrappers)
        {
            if ($(wrapper).hasClass('active'))
            {
                continue
            }

            let spincrementTop = $(wrapper).offset().top;
            let windowBottom = $(window).scrollTop() + $(window).height();

            if (windowBottom > spincrementTop)
            {
                $(wrapper).find('.spincrement').spincrement({
                    duration: 4000,
                    thousandSeparator: ' '
                });

                $(wrapper).addClass('active');
            }
        }
    })
}