jQuery(document).ready(function($) {

  // Toggle menu
  $('.nav-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.mobile-menu').toggleClass('open');
    $('body').toggleClass('active');
  });

  var h = $('.top-menu').innerHeight();
  $(window).scroll(function() {
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
    delay: 5000,
  });

  // Product tabs
  $('.product-tabs').tabslet();

  // Zoom image
  $('.product-gallery__img img').elevateZoom({
    zoomType: "inner"
  });

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
    $(document).on( 'click', '.product__quantity-container button', function(e) {
        e.preventDefault();

        var $button = $( this ),
        $qty = $button.siblings( '.product__quantity' ),
        current = parseInt( $qty.val() && $qty.val() > 0 ? $qty.val() : 0, 10 ),
        min = parseInt( $qty.attr( 'min' ), 10 ),
        max = parseInt( $qty.attr( 'max' ), 10 );

        min = min ? min : 0;
        max = max ? max : current + 1;

        if ( $button.hasClass( 'product__quantity-minus' ) && current > min ) {
            $qty.val( current - 1 );
            console.log('minus');
            $qty.trigger( 'change' );
        }

        if ( $button.hasClass( 'product__quantity-plus' ) && current < max ) {
            $qty.val( current + 1 );
            console.log('plus');
            $qty.trigger( 'change' );
        }
    });
  }

  changeProductQuantity();

  // Change product image
  $('.product-gallery__thumbnails img').click(function(){
      var large = $(this).data('large_image');
      setActive($(this));
      $('.product-gallery__img img').fadeOut(300, changeImg(large, $('.product-gallery__img img')));
  });

  // Add active class in current thumbnail image
  function setActive(el){
    var element = el;
    $('.thumbnails-carousel .item').removeClass('active-item');
    element.parent('.item').addClass('active-item');
  }

  function changeImg(large, element){
    var element = element;
    var large = large;
    setTimeout(function(){ tdZoomFade()},300);
    function tdZoomFade(){
        element.attr('src', large)
        element.attr('data-large_image', large)
        // element.attr('srcset', large)
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
    spaceBetween: 15
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

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
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