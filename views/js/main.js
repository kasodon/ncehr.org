/*

[Main Script]

Project: EcoHosting - Responsive HTML5 Hosting and WHMCS Template
Version: 2.9
Author : themelooks.com

*/

(function ($) {
    'use strict';
    
    $(function () {
        /* ------------------------------------------------------------------------- *
         * CUSTOM BACKGROUND IMAGE
         * ------------------------------------------------------------------------- */
        var bgSrc = $('[data-bg-src]');
        
        bgSrc.each(function () {
            var $this = $(this),
                imgValue = $this.data('bg-src');
            $this.css('background-image', 'url(' + imgValue + ')');
        });
        
        /* ------------------------------------------------------------------------- *
         * FIXED MENU
         * ------------------------------------------------------------------------- */
        var wn = $(window)
        ,   $menuTopbar = $('.menu--topbar')
        ,   primaryMenu = $('#primaryMenu')
        ,   secondaryMenu = $('#secondaryMenu')
        ,   menuHalfHeight = $menuTopbar.outerHeight() + primaryMenu.outerHeight()
        ,   menuTotalHeight = menuHalfHeight + secondaryMenu.outerHeight()
        ,   secondaryMenuToggle = function () {
                return wn.scrollTop() > menuHalfHeight ? secondaryMenu.addClass('sticky') : secondaryMenu.removeClass('sticky');
            };
        
        if ( secondaryMenu.length ) {
            secondaryMenuToggle();
            
            wn.on('resize', function () {
                menuHalfHeight = $menuTopbar.outerHeight() + primaryMenu.outerHeight();
                $headerAdjust.css('margin-top', menuTotalHeight);
            });
        }
        
        /* ------------------------------------------------------------------------- *
         * HEADER ADJUST
         * ------------------------------------------------------------------------- */
        var $headerAdjust = $('.HeaderAdjust');
        
        if ( $headerAdjust.length ) {
            $headerAdjust.css('margin-top', menuTotalHeight);
            
            wn.on('resize', function () {
                menuTotalHeight = menuHalfHeight + secondaryMenu.outerHeight();
                $headerAdjust.css('margin-top', menuTotalHeight);
            });
        }
        
        /* ------------------------------------------------------------------------- *
         * BACK TO TOP BUTTON
         * ------------------------------------------------------------------------- */
        var $backToTopBtn = $('#backToTop'),
            $domainOffer = $('.domain--offer'),
            showBackToTopBtn = function () {
                return wn.scrollTop() > 1 ? $backToTopBtn.add($domainOffer).addClass('show') : $backToTopBtn.add($domainOffer).removeClass('show');
            };
        
        $backToTopBtn.on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            
            return false;
        });
        
        if ( $backToTopBtn.length ) {
            showBackToTopBtn();
        }
        
        /* ------------------------------------------------------------------------- *
         * ON SCROLL
         * ------------------------------------------------------------------------- */
        wn.on('scroll', function () {
            /* TOGGLE SECONDARY MENU */
            if ( secondaryMenu.length ) {
                secondaryMenuToggle();
            }
            
            /* SHOW BACK TO TOP BUTTON */
            if ( $backToTopBtn.length ) {
                showBackToTopBtn();
            }
        });

        $(document).ready(function(){
            //FANCYBOX
            //https://github.com/fancyapps/fancyBox
            $(".fancybox").fancybox({
                openEffect: "none",
                closeEffect: "none"
            });
        }); 


        // Gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1200: {
        items: 5
      }
    }
  });

  
        
        /* -------------------------------------------------------------------------*
         * FORM VALIDATION
         * -------------------------------------------------------------------------*/
        var subscribeForm = $('#subscribeForm');
        if ( subscribeForm.length ) {
            subscribeForm.validate({
                rules: {
                    EMAIL: {
                        required: true,
                        email: true
                    }
                },
                errorPlacement: function (error, element) {
                    return true;
                }
            });
        }
        
        var loginForm = $('#loginForm');
        
        if ( loginForm.length ) {
            loginForm.validate({
                rules: {
                    username: "required",
                    password: "required"
                },
                errorPlacement: function (error, element) {
                    return true;
                }
            });
        }
        
        var contactForm = $('#contactForm')
        ,   contactFormStatus = $('.contact-form-status');
        
        if ( contactForm.length ) {
            contactForm.validate({
                rules: {
                    contactName: "required",
                    contactEmail: {
                        required: true,
                        email: true
                    },
                    contactSubject: "required",
                    contactMessage: "required"
                },
                errorPlacement: function (error, element) {
                    return true;
                },
                submitHandler: function(e) {
                    var formData = contactForm.serialize(); // serialize the form data

                    /* Submit the form using AJAX */
                    $.ajax({
                        type: 'POST',
                        url: contactForm.attr('action'),
                        data: formData
                    }).done(function(response) {
                        contactFormStatus.show().html(response).delay(1000).fadeOut("slow");
                    });
                }
            });
        }
        
        var postCommentForm = $('#postCommentForm');
        
        if ( postCommentForm.length ) {
            postCommentForm.validate({
                rules: {
                    name: "required",
                    email: {
                        required: true,
                        email: true
                    },
                    comments: "required"
                },
                errorPlacement: function (error, element) {
                    return true;
                }
            });
        }
        
        /* -------------------------------------------------------------------------*
         * TOOLTIP
         * -------------------------------------------------------------------------*/
        var $tooltip = $('[data-toggle="tooltip"]');
        
        if ( $tooltip.length ) {
            $tooltip.tooltip();
        }
        
        /* -------------------------------------------------------------------------*
         * OWL CAROUSEL
         * -------------------------------------------------------------------------*/
        var headerSlider = $('.header-slider'),
            headerSliderNav = $('.header--slider-nav');
        
        if ( headerSlider.length ) {
            headerSlider.owlCarousel({
                slideSpeed: 700,
                singleItem: true,
                autoPlay: true,
                addClassActive: true,
                pagination: false,
                navigation: true,
                navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
                afterMove: function () {
                    headerSliderNav.find('li').removeClass('active').eq(this.currentItem).addClass('active');
                }
            });
        }
        
        headerSliderNav.on('click', 'li', function () {
            headerSlider.trigger('owl.goTo', $(this).index());
        });
        
        var testimonialSlider = $('.testimonial-slider')
        ,   testimonialCustomPagination = function () {
                $.each(this.owl.userItems, function (i) {
                    var recommenderThumb = jQuery(this).data('recommender-thumb');
                    var paginationLinks = jQuery('.testimonial-slider .owl-page span');

                    $(paginationLinks[i]).html('<img src="'+ recommenderThumb +'" alt="" class="img-responsive" />');
                });
            };
            
        if ( testimonialSlider.length ) {
            if (testimonialSlider.children('.testimonial-item').length > 3) {
                testimonialSlider.addClass('overload');
            }
            testimonialSlider.owlCarousel({
                slideSpeed: 700,
                paginationSpeed: 700,
                singleItem: true,
                autoPlay: true,
                addClassActive: true,
                afterInit: testimonialCustomPagination,
                afterUpdate: testimonialCustomPagination
            });
        }
        
        var brandsSlider = $('.brands-slider');
            
        if ( brandsSlider.length ) {
            brandsSlider.owlCarousel({
                slideSpeed: 700,
                paginationSpeed: 700,
                items: 5,
                autoPlay: true,
                pagination: false
            });
        }

        /* ------------------------------------------------------------------------- *
         * VPS SLIDER
         * ------------------------------------------------------------------------- */
        var $headerVPS = $('.vps-pricing--slider-holder')
        ,   vpsSlider = $('.VPSPricingSlider')
        ,   vpsItemCPUel = $('.vps-pricing--cpu')
        ,   vpsItemRAMel = $('.vps-pricing--ram')
        ,   vpsItemSPACEel = $('.vps-pricing--space')
        ,   vpsItemBANDWIDTHel = $('.vps-pricing--bandwidth')
        ,   vpsItemPriceEl = $('.vps-pricing--total-price span')
        ,   inputCPUText = $('.InputCPUText')
        ,   inputRamText = $('.InputRamText')
        ,   inputSpaceText = $('.InputSpaceText')
        ,   inputBandwidthText = $('.InputBandwidthText')
        ,   inputPriceText = $('.InputPriceText')
        ,   vpsPricingBtn = $('.vps-pricing--action-btn .btn');
        
        if ( vpsSlider.length ) {
            // VPS slider variables
            var $uiSliderHandle,
                maxPlans = vpsSliderOpts.maxPlans - 1,
                detfaultPlan = vpsSliderOpts.detfaultPlan - 1;
            
            // Add slider pips
            for ( var i = 0; i < maxPlans; i++ ) {
                $('<div class="pip"></div>')
                    .css('left', ((100 / maxPlans) * i) + '%')
                    .appendTo( $headerVPS.children('.pips') );
            }
            
            // Initialize slider
            vpsSlider.slider({
                animate: "fast",
                range: "min",
                min: 0,
                max: maxPlans,
                value: detfaultPlan,
                step: 1,
                create: function () {
                    vpsItemCPUel.text(vpsSliderOpts.plans[detfaultPlan].cpuText);
                    vpsItemRAMel.text(vpsSliderOpts.plans[detfaultPlan].ramText);
                    vpsItemSPACEel.text(vpsSliderOpts.plans[detfaultPlan].spaceText);
                    vpsItemBANDWIDTHel.text(vpsSliderOpts.plans[detfaultPlan].brandwidthText);
                    vpsItemPriceEl.text(vpsSliderOpts.plans[detfaultPlan].priceText);
                    vpsPricingBtn.attr('href', vpsSliderOpts.plans[detfaultPlan].url);
                    
                    inputCPUText.val(vpsSliderOpts.plans[detfaultPlan].cpuText);
                    inputRamText.val(vpsSliderOpts.plans[detfaultPlan].ramText);
                    inputSpaceText.val(vpsSliderOpts.plans[detfaultPlan].spaceText);
                    inputBandwidthText.val(vpsSliderOpts.plans[detfaultPlan].brandwidthText);
                    inputPriceText.val(vpsSliderOpts.plans[detfaultPlan].priceText);
                    
                    $uiSliderHandle = vpsSlider.children('.ui-slider-handle');
                    $('<i class="fa fa-map-marker"></i><em></em>').appendTo($uiSliderHandle);
                    $uiSliderHandle.children('em').html(vpsSliderOpts.plans[detfaultPlan].planName);
                },
                slide: function (event, ui) {
                    vpsItemCPUel.text(vpsSliderOpts.plans[ui.value].cpuText);
                    vpsItemRAMel.text(vpsSliderOpts.plans[ui.value].ramText);
                    vpsItemSPACEel.text(vpsSliderOpts.plans[ui.value].spaceText);
                    vpsItemBANDWIDTHel.text(vpsSliderOpts.plans[ui.value].brandwidthText);
                    vpsItemPriceEl.text(vpsSliderOpts.plans[ui.value].priceText);
                    vpsPricingBtn.attr('href', vpsSliderOpts.plans[ui.value].url);
                    
                    inputCPUText.val(vpsSliderOpts.plans[ui.value].cpuText);
                    inputRamText.val(vpsSliderOpts.plans[ui.value].ramText);
                    inputSpaceText.val(vpsSliderOpts.plans[ui.value].spaceText);
                    inputBandwidthText.val(vpsSliderOpts.plans[ui.value].brandwidthText);
                    inputPriceText.val(vpsSliderOpts.plans[ui.value].priceText);
                    
                    $uiSliderHandle.children('em').html(vpsSliderOpts.plans[ui.value].planName);
                }
            });
        }
        
        /* -------------------------------------------------------------------------*
         * COUNTER
         * -------------------------------------------------------------------------*/
        var counterNum = $('.counter-number');
            
        if ( $(counterNum).length ) {
            $(counterNum).counterUp({
                delay: 10,
                time: 1000
            });
        }
        
        /* -------------------------------------------------------------------------*
         * MAP
         * -------------------------------------------------------------------------*/

        function initialize() {
            var map = new google.maps.Map(
              document.getElementById('map'), {
                center: new google.maps.LatLng(5.76816395, 6.834304875953444),
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
      
            var marker = new google.maps.Marker({
                  position: new google.maps.LatLng(5.76816395, 6.834304875953444),
                  map: map
            });
      
          }
          google.maps.event.addDomListener(window, 'load', initialize);
          
        
     
        
        /* -------------------------------------------------------------------------*
         * PRICING TABLE LABEL
         * -------------------------------------------------------------------------*/
        
        /* ------------------------------------------------------------------------- *
         * TWITTER WIDGET
         * ------------------------------------------------------------------------- */
        var $sidebarTwitter = $('#sidebarTwitter');

        if ( $sidebarTwitter.length ) {
            twttr.widgets.createTimeline({
                sourceType: "profile",
                screenName: $sidebarTwitter.data('user-name')
            }, document.getElementById('sidebarTwitter'));
        }
        
        /* ------------------------------------------------------------------------- *
         * COLOR SWITCHER
         * ------------------------------------------------------------------------- */
        if ( typeof $.cColorSwitcher !== "undefined" && wn.outerWidth() > 767 ) {
            $.cColorSwitcher({
                'switcherTitle': 'Main Colors:',
                'switcherColors': [{
                    bgColor: '#6aaf08',
                    filepath: 'css/colors/theme-color-1.css'
                }, {
                    bgColor: '#e94a41',
                    filepath: 'css/colors/theme-color-2.css'
                }, {
                    bgColor: '#FFD25F',
                    filepath: 'css/colors/theme-color-3.css'
                }, {
                    bgColor: '#7FDCFE',
                    filepath: 'css/colors/theme-color-4.css'
                }, {
                    bgColor: '#ff9600',
                    filepath: 'css/colors/theme-color-5.css'
                }, {
                    bgColor: '#FF6F57',
                    filepath: 'css/colors/theme-color-6.css'
                }, {
                    bgColor: '#00C853',
                    filepath: 'css/colors/theme-color-7.css'
                }, {
                    bgColor: '#03a9f4',
                    filepath: 'css/colors/theme-color-8.css'
                }, {
                    bgColor: '#D48B91',
                    filepath: 'css/colors/theme-color-9.css'
                }, {
                    bgColor: '#8CBEB2',
                    filepath: 'css/colors/theme-color-10.css'
                }],
                'switcherTarget': $('#changeColorScheme')
            });
        }
    });
    
    $(window).on('load', function () {
        /* ------------------------------------------------------------------------- *
         * PRELOADER
         * ------------------------------------------------------------------------- */
        var $preloader = $('#preloader');
        
        if ( $preloader.length ) {
            $preloader.fadeOut('slow');
        }
    });
})(jQuery);
