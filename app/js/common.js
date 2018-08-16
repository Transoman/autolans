jQuery(document).ready(function($) {

  // Toggle menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.mobile-menu').toggleClass('open');
    $('body').toggleClass('active');
  });

  // Sticky header
  $(window).scroll(function() {
    var h = $('.top-menu').outerHeight();
    if($(this).scrollTop() > 150) {
      $('body').css('margin-top', h);
      $('.top-menu').addClass('sticky');
    }
    else {
      $('body').css('margin-top', 0);
      $('.top-menu').removeClass('sticky');
    }
  });

  // News tab
  $('.news-tabs').tabslet({
    autorotate: true,
    delay: 5000
  });

  function newsAllTop() {
    if ( window.matchMedia("(min-width: 768px)").matches ) {
      var hList = $('.news-tabs__list').innerHeight();
      $('.news-tabs__all').css('top', hList + 5);
    }
    else {
      $('.news-tabs__all').removeAttr('style');
    }
  }

  newsAllTop();

  // Product tabs
  $('.product-tabs').tabslet();

  // Zoom image
  function zoom() {
    if ( window.matchMedia("(min-width: 768px)").matches ) {
      $('.zoomContainer').remove();
      $('.product-gallery__img img').elevateZoom({
        zoomType: "lens",
        containLensZoom: true,
        responsive: true
      });
    }
    else {
      $('.zoomContainer').remove();
    }
  }

  zoom();

  $(window).resize(function(event) {
    zoom();
    newsAllTop();
  });

  // Cart steps
  var currentTab = 0; // Current tab is set to be the first tab (0)
  showTab(currentTab); // Display the current tab

  $('.cart__btn-prev').click( function(e) {
    e.preventDefault();
    nextPrev(-1);
  } );

  $('.cart__btn-next').click( function(e) {
    e.preventDefault();

    if ( (currentTab + 1) >  $('.cart__step').length - 1  ) {
      $('.cart-form').submit();
      return false;
    }
    checkForm();
    if ($('.cart-form').valid()) {
      nextPrev(1);
    }
  } );

  function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = $('.cart__step');

    var countStep = x.length;
    var currentStep = n + 1;

    $(x[n]).css('display', 'block');

    $('.cart__step-list li').eq(n).addClass('active');
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
      $('.cart__btn-prev').css('display', 'none');
      $('.cart__continue').css('display', 'inline-block');
    } else {
      $('.cart__continue').css('display', 'none');
      $('.cart__btn-prev').css('display', 'inline-block');
    }
    if (n == (x.length - 1)) {
      $('.cart__btn-next span').text('Оформить заказ').parent().find('i').css('display', 'none');
    } else {
      $('.cart__btn-next span').text('Далле').parent().find('i').css('display', 'inline-block');;
    }
  }

  function nextPrev(n) {
    // This function will figure out which tab to display
    var x = $('.cart__step');

    // Hide the current tab:
    $(x[currentTab]).css('display', 'none');
    $('.cart__step-list li').eq(currentTab).removeClass('active');
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
      //...the form gets submitted:
      return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
  }

  // Fancybox
  $('a[data-fancybox]').fancybox();

  // Scroll to top
  $(".scroll-top").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  $(window).scroll(function() {
    if($(this).scrollTop() > 500) {
      $('.scroll-top').addClass('active');
    }
    else {
      $('.scroll-top').removeClass('active');
    }
  });

  // Cut text
  function checkWidth() {
    if ( $(window).width() <= 992 ) {
      var txt = $('.news-list__content').find('p').text();
      if (txt.length > 87) {
         $('.news-list__content').find('p').text(txt.substring(0, 84) + '...');
      }
    }
    else {
      $('.news-list__content').find('p').text(txt);
    }
  }

  checkWidth();

  // Change view
  $('.sorting__view--grid').click(function(e) {
    e.preventDefault();
    $('.sorting__view').removeClass('active');
    $(this).addClass('active');
    $('.product-list').removeClass('grid line list').addClass('grid');
  });

  $('.sorting__view--list').click(function(e) {
    e.preventDefault();
    $('.sorting__view').removeClass('active');
    $(this).addClass('active');
    $('.product-list').removeClass('grid line list').addClass('list');
  });

  $('.sorting__view--line').click(function(e) {
    e.preventDefault();
    $('.sorting__view').removeClass('active');
    $(this).addClass('active');
    $('.product-list').removeClass('grid line list').addClass('line');
  });

  // Qty buton
  function changeProductQuantity() {
    $(document).on( 'click', '.quantity-container button', function(e) {
        e.preventDefault();

        var $button = $( this ),
        $qty = $button.siblings( '.quantity' ),
        current = parseInt( $qty.val() && $qty.val() > 0 ? $qty.val() : 0, 10 ),
        min = parseInt( $qty.attr( 'min' ), 10 ),
        max = parseInt( $qty.attr( 'max' ), 10 );

        min = min ? min : 0;
        max = max ? max : current + 1;

        if ( $button.hasClass( 'quantity__minus' ) && current > min ) {
            $qty.val( current - 1 );
            $qty.trigger( 'change' );
            $price = $button.parent().parent().find('.cart__price').data('price');
            $price = $button.parent().parent().parent().find('.cart__price').data('price');
            $button.parent().parent().next().find('span').text($price * $qty.val());
        }

        if ( $button.hasClass( 'quantity__plus' ) && current < max ) {
            $qty.val( current + 1 );
            $qty.trigger( 'change' );
            $price = $button.parent().parent().parent().find('.cart__price').data('price');
            $button.parent().parent().next().find('span').text($price * $qty.val());
        }
    });
  }

  changeProductQuantity();

  // Change product image
  $('.product-gallery__thumbnails img').click(function(){
      var large = $(this).data('large_image');
      $('.product-gallery__img img').fadeOut(300, changeImg(large, $('.product-gallery__img img')));
  });

  function changeImg(large, element){
    var element = element;
    var large = large;
    setTimeout(function(){ tdZoomFade()},300);
    function tdZoomFade(){
        element.attr('src', large)
        element.attr('data-large_image', large)
        // element.attr('srcset', large)
        element.parent().attr('href', large)
        element.fadeIn(300);
    }
    var zoomType = $('.product-gallery__img').data('zoomstyle');
    if(zoomType !='default'){
        var ez = $('.product-gallery__img img').data('elevateZoom');
        ez.swaptheimage(large, large);
    }
  }


  // Open VIN form
  $('.form-search__vin').click(function(e) {
    e.preventDefault();
    $('.form-search-vin-wrap').toggleClass('open');
  });

  // Modal
  $('.modal').popup({
    transition: 'all 0.3s',
    // onopen: function () {
    //   console.log($(this).find('input:first'));
    //   var firstInput = $(this).find('input:first');
    //   $(firstInput).focus();
    // },
    onclose: function() {
      $(this).find('label.error').remove();
    }
  });

  // Product slider
   var productSlider = new Swiper ('.product-gallery__thumbnails', {
    slidesPerView: 4,
    spaceBetween: 15,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Form
  $('.form__field, .form__textarea').focus(function() {
    $(this).prev('.form__label').addClass('is-focus');
  });

  $('.form__field, .form__textarea').focusout(function() {
    if ($(this).val() == '') {
      $(this).prev('.form__label').removeClass('is-focus');
    }
  });

  $('.form__field, .form__textarea').each(function(index, el) {
    if ($(el).attr('required')) {
      $(this).parent().append('<span class="form__required">*</span>');
    }
  });

  $('input[type="tel"]').mask('+7 (000) 000-00-00', {selectOnFocus: true});

  // Validate form
  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
    return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, "Введите Ваш телефон");

  $(".callback-form").validate({
    messages: {
      name: "Введите Ваше имя",
      phone: "Введите Ваш телефон",
    },
    rules: {
      phone: {
        required: true,
        phoneno: true
      }
    },
    submitHandler: function(form) {
      var t = $('.callback-form').serialize();
      ajaxSend('.callback-form', t);
    }
  });

  $(".form-search-vin").validate({
    messages: {
      vin_organization_name: "Это поле обязательное",
      email: "Введите Ваш E-mail",
      model_car: "Введите марку и модель автомобиля",
      vin_parts: "Это поле обязательное",
    },
    submitHandler: function(form) {
      var t = $('.form-search-vin').serialize();
      ajaxSend('.form-search-vin', t);
    }
  });

  function checkForm() {
    $(".cart-form").validate({
    messages: {
      spare: "Это поле обязательное",
      spare_2: "Это поле обязательное",
      name: "Введите Ваше имя",
      email: "Введите Ваш E-mail",
      phone: "Введите Ваш телефон",
      terms: "Вы должны быть согласны"
    },
    submitHandler: function(form) {
      console.log('submit');
      var t = $('.cart-form').serialize();
      ajaxSend('.cart-form', t);
    }
  });
  }

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        if (formName == '.cart-form') {
          $("#thanks-order").popup("show");
        }
        else {
          $("#thanks").popup("show");
        }
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

});

// Svg-sprite LocalStorage
// <svg><use xlink:href="#down-arrow"></use></svg>
;( function( window, document )
{
  'use strict';

  var file     = 'img/symbols.html',
      revision = 1.5;

  if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
      return true;

  var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
      request,
      data,
      insertIT = function()
      {
          document.body.insertAdjacentHTML( 'afterbegin', data );
      },
      insert = function()
      {
          if( document.body ) insertIT();
          else document.addEventListener( 'DOMContentLoaded', insertIT );
      };

  if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
  {
    data = localStorage.getItem( 'inlineSVGdata' );
    if( data )
    {
        insert();
        return true;
    }
  }

  try
  {
    request = new XMLHttpRequest();
    request.open( 'GET', file, true );
    request.onload = function()
      {
        if( request.status >= 200 && request.status < 400 )
          {
            data = request.responseText;
            insert();
            if( isLocalStorage )
            {
              localStorage.setItem( 'inlineSVGdata',  data );
              localStorage.setItem( 'inlineSVGrev',   revision );
            }
        }
    }
    request.send();
  }
  catch( e ){}

}( window, document ) );