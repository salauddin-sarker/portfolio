(function($) {
    'use strict';

    /*=========================================================================
    animated headline
    =========================================================================*/
    $(".element").each(function() {
        var $this = $(this);
        $this.typed({
            strings: $this.attr('data-elements').split(','),
            typeSpeed: 100,
            backDelay: 3000
        });
    });


    /*=========================================================================
    Color Schemes
    =========================================================================*/
    var colorHandle = $('.color-handle i');
    colorHandle.on('click', function(e) {
        $('.color-schemes').toggleClass('show');
    });
    $("#remove-ground").hide();
    $("#hide").on("click", function() {
        $("#particle-ground").hide();
        $("#remove-ground").show();
        $("#hide").addClass("color-button");
        $("#show").removeClass("color-button");
    });
    $("#show").on("click", function() {
        $("#particle-ground").show();
        $("#remove-ground").hide();
        $("#hide").removeClass("color-button");
        $("#show").addClass("color-button");
    });
    var colorPalate = $('.color-plate a.single-color');
    colorPalate.on('click', function(e) {
        e.preventDefault();
        $('link#colors').attr('href', $(this).attr('href'));
        return false;
    });

    /*=========================================================================
    pagepilling
    =========================================================================*/
    $(document).ready(function() {
        /*
        * Plugin intialization
        */
        $('#pagepiling').pagepiling({
            menu: '#menu',
            anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
            navigation: {
                'position': 'right',
                'tooltips': ['Home', 'About', 'Client', 'Services', 'Work', 'Blog', 'Contact']
            },
            afterRender: function(){
                $('#pp-nav').addClass('custom');
            },
            afterLoad: function(anchorLink, index){
                if(index>1){
                    $('#pp-nav').removeClass('custom');
                }else{
                    $('#pp-nav').addClass('custom');
                }
            }
        });
        /*
        * Internal use of the demo website
        */
        $('#showExamples').click(function(e){
            e.stopPropagation();
            e.preventDefault();
            $('#examplesList').toggle();
        });
        $('html').click(function(){
            $('#examplesList').hide();
        });
    });

    /*=========================================================================
    smooth scroll
    =========================================================================*/
    $('.navbar-nav a, .Remon-scroll a').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 0
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    $("#navbarCollapse").scrollspy({
        offset: 20
    });

    /*=========================================================================
    work filter
    =========================================================================*/
    $(window).on('load', function() {
        var $container = $('.filter-result');
        var $filter = $('#Remon-filter');
        $container.isotope({
            filter: '*',
            layoutMode: 'masonry',
            animationOptions: {
                duration: 750,
                easing: 'linear'
            }
        });

        $filter.find('a').on("click", function() {
            var selector = $(this).attr('data-filter');
            $filter.find('a').removeClass('active');
            $(this).addClass('active');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    animationDuration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });
            return false;
        });
    });


    /*=========================================================================
    counter
    =========================================================================*/
    var a = 0;
    $(window).on('scroll', function() {
        var oTop = $('#counter').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
            $('.fun-data').each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                        //alert('finished');
                    }

                });
            });
            a = 1;
        }
    });

    /*=========================================================================
    image zoom
    =========================================================================*/
    $('.img-zoom').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-fade',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        }
    });

    /*=========================================================================
    carousel
    =========================================================================*/
    $("#owl-demo").owlCarousel({
        autoPlay: 7000,
        stopOnHover: true,
        navigation: false,
        paginationSpeed: 1000,
        goToFirstSpeed: 2000,
        singleItem: true,
        autoHeight: true,
    });


    /*
    CONTACT FORM VALIDATIONS SETTINGS
    ========================================*/
    var CTForm = $('#contact_form');
    CTForm.validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function(error, element) {
            error.insertBefore(element);
        },
        messages: {
            name: "What's your name?",
            email: {
                required: "What's your email?",
                email: "Please, enter a valid email"
            }
        },
                    
        highlight: function(element) {
            $(element)
            .text('').addClass('error')
        },                    
                    
        success: function(element) {
            element
            .text('').addClass('valid')
        }
    });   

    /*
    CONTACT FORM SCRIPT
    ========================================*/
    var CTSubmit = $('#contact_submit');
    CTForm.submit(function() {
        // submit the form
        if($(this).valid()){
           CTSubmit.button('loading'); 
            var action = $(this).attr('action');
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    contactname: $('#contact_name').val(),
                    contactemail: $('#contact_email').val(),
                    contactsubject: $('#contact_subject').val(),
                    contactmessage: $('#contact_message').val()
                },
                success: function() {
                   CTSubmit.button('reset');
                   CTSubmit.button('complete');
                },
                error: function() {
                    CTSubmit.button('reset');
                    CTSubmit.button('error');
                }
            });
        // return false to prevent normal browser submit and page navigation 
        } else {
            CTSubmit.button('reset')
        }
        return false; 
    });
    

    /*-------------------------------------------
      SCROLL TO TOP BUTTON
    ---------------------------------------------*/
    $('body').append('<a id="back-to-top" class="to-top-btn" href="#"><i class="fa fa-angle-up"> </i></a>');
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('to-top-show');
                } else {
                    $('#back-to-top').removeClass('to-top-show');
                }
            };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
        });
        $('#back-to-top').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 500);
        });
    };

    $(window).on('load', function() {
        $('#preloader').fadeOut(500, function() {
            $(this).remove();
        });
    });


})(jQuery);