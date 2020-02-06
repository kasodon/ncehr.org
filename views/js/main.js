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
        var map, marker, myLatLng;
        
        function initMap() {
            myLatLng = {lat: 23.790546, lng: 90.375583};
            
            map = new google.maps.Map(document.getElementById('map'), {
                center: myLatLng,
                zoom: 16,
                scrollwheel: false,
                disableDefaultUI: true,
                zoomControl: true
            });
            
            marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                animation: google.maps.Animation.DROP,
                draggable: true
            });
            
            if ( wn.width() < 767 ) {
                map.setOptions({draggable: false});
            }
        }
        
        if ( $("#map").length ) {
            initMap();
        }
        
        function initMap2() {
            var locations = [
                ['Hanota Sagar', 23.737385, 78.757671, 4],
                ['গুলশান, ঢাকা', 23.789747, 90.3929248, 5],
                ['Gannan, Gansu, China', 34.9862056, 102.8388954, 3],
                ['মুম্বই, মহারাষ্ট্র, India', 19.0825223, 72.7411178, 2],
                ['Mahaoya, Sri Lanka', 7.8784551, 81.2146297, 4]
            ];
            
            map = new google.maps.Map(document.getElementById('map2'), {
                center: new google.maps.LatLng(20.9124975, 73.7479053),
                zoom: 5,
                scrollwheel: false,
                disableDefaultUI: true,
                zoomControl: true
            });

            var marker, i;

            for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                        map: map
                });
            }
            
            if ( wn.width() < 767 ) {
                map.setOptions({draggable: false});
            }
        }
        
        if ( $("#map2").length ) {
            initMap2();
        }
        
        /* -------------------------------------------------------------------------*
         * PRICING TABLE LABEL
         * -------------------------------------------------------------------------*/
        if ( wn.width() < 992 ) {
            $('#compare table td, #pricingTable2 table td').each(function () {
                $(this).prepend('<span class="labelText">'+ $(this).data('label') + '</span>');
            });
        }
        
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
