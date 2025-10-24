/*

jQuery(document).ready(function() {

    jQuery('.mo-otp-login button.motw-w-full').off('click').on('click', function(e) {
        e.preventDefault();
        jQuery('#email').attr('placeholder', 'E-Mailadresse');
    });
  
    jQuery('#mo-otp-login-popup button.motw-w-full').off('click').on('click', function(e) { 
        e.preventDefault(); 
        //alert('here'); 
        let targetNode = document.querySelector('#mo-otp-login-popup'); // Parent div select karein
        if (targetNode) {
            let observer = new MutationObserver(function(mutationsList) {
                mutationsList.forEach(function(mutation) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1 && jQuery(node).hasClass('motw-text-red-500')) {
                            
                            var error12 = jQuery('#mo-otp-login-popup .motw-text-red-500').html();
                            //alert(error12);
                            if(error12 == 'There was issue while sending OTP, please contact site owner'){
                              jQuery('#mo-otp-login-popup .motw-text-red-500').html('Es gab ein Problem beim Senden des Einmalcodes: bitte kontaktieren Sie den Betreiber der Website <a href="mailto:oliver@shanti-enterprise.ch" style="text-decoration: underline; color: rgb(239 68 68) !important;">oliver@shanti-enterprise.ch</a>');
                            }else if(error12 == 'Check your login information or sign up for a new account'){
                              jQuery('#mo-otp-login-popup .motw-text-red-500').html('Überprüfen Sie Ihre Anmeldeinformationen oder melden Sie sich für ein neues Konto an');
                            }
                        }
                    });
                });
            });

            observer.observe(targetNode, { childList: true, subtree: true });
        }
    });
  
    jQuery(document).on('keyup', '#email', function(e) {
          var error123 = jQuery('#mo-otp-login-popup .motw-text-red-500').html();
          //alert(error12);
          if(error123 == 'Es gab ein Problem beim Senden des Einmalcodes: bitte kontaktieren Sie den Betreiber der Website <a href="mailto:oliver@shanti-enterprise.ch" style="text-decoration: underline; color: rgb(239 68 68) !important;">oliver@shanti-enterprise.ch</a>There was issue while sending OTP, please contact site owner'){
            jQuery('#mo-otp-login-popup .motw-text-red-500').html('Es gab ein Problem beim Senden des Einmalcodes: bitte kontaktieren Sie den Betreiber der Website <a href="mailto:oliver@shanti-enterprise.ch" style="text-decoration: underline; color: rgb(239 68 68) !important;">oliver@shanti-enterprise.ch</a>');
          }else if(error123 == 'Überprüfen Sie Ihre Anmeldeinformationen oder melden Sie sich für ein neues Konto anCheck your login information or sign up for a new account'){
            jQuery('#mo-otp-login-popup .motw-text-red-500').html('Überprüfen Sie Ihre Anmeldeinformationen oder melden Sie sich für ein neues Konto an');
          }           
        //console.log('here');
    });
    
});
*/
jQuery(document).on('click', '.login-popup-overlay-show .close-popup', function(e) {
    $('.body-template-login .shopify-block.shopify-app-block').hide();
    jQuery('.shopify-block.shopify-app-block.section').removeClass('login-popup-overlay-show');
});

jQuery(document).on('click', '.bu-log-new', function(e) {    
    if (jQuery('.shopify-block.shopify-app-block.section .close-popup').length === 0) {
      jQuery('.shopify-block.shopify-app-block.section .sotp-widget').append('<span class="close-popup">X</span>');
    }
    jQuery('.shopify-block.shopify-app-block.section').addClass('login-popup-overlay-show');
    jQuery('.shopify-block.shopify-app-block.section').show();
});

jQuery(document).ready(function($){
  
    var intervalId_qu = setInterval(function() {
        var newAcfRows_qu = $(".send-btn.otp-btn");
        if (newAcfRows_qu.length > 0) {
            $('.shopify-block.shopify-app-block').hide();
            $('.sotp-widget button svg').hide();
            $('.sotp-consent-wrapper').hide();
            $('.send-btn.otp-btn').hide();
            $('.send-btn.otp-btn').before('<div class="custom-verify-bu"><button class="custom-verify-bu-click">Sende Code</button></div>');
        
    
        $(".custom-verify-bu-click").click(function () {
          jQuery(".cu-box-em").remove();
          //$("#send-otp").addClass('send-otp-dis');
          var email = $(".email-no-inner .olInput.user-name-input").val();
          if (email === "") {
            $(".send-btn.otp-btn").after('<div class="toast-box-wrapper active cu-box-em"><div class="toast-content"><div class="toast-card error"><div class="toast-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 413.348 413.348" fill="red"><path d="M413.348 24.354L388.994 0l-182.32 182.32L24.354 0 0 24.354l182.32 182.32L0 388.994l24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z"></path></svg></div><div class="toast-card-content"><h6 class="toast-title">Please enter an email address.</h6></div><span class="toast-close-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 413.348 413.348"><path d="M413.348 24.354L388.994 0l-182.32 182.32L24.354 0 0 24.354l182.32 182.32L0 388.994l24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z"></path></svg></span></div></div></div>');
            
            /*setTimeout(function() {
              jQuery(".cu-box-em").remove();
            }, 1000);*/
            return;
          }
          $('.custom-verify-bu-click').prop('disabled', true);
          $('.custom-verify-bu-click').addClass('custom-verify-bu-click-load');
          $.ajax({
            url: "https://p655033.mittwaldserver.info/shantishopify/verify-login-mail.php",
            type: "POST",
            data: { email: email },
            success: function (response) {
              $('.custom-verify-bu-click').prop('disabled', false);
              $('.custom-verify-bu-click').removeClass('custom-verify-bu-click-load');
              if (response.message === "no") {
                $(".send-btn.otp-btn").after('<div class="toast-box-wrapper active cu-box-em"><div class="toast-content"><div class="toast-card error"><div class="toast-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 413.348 413.348" fill="red"><path d="M413.348 24.354L388.994 0l-182.32 182.32L24.354 0 0 24.354l182.32 182.32L0 388.994l24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z"></path></svg></div><div class="toast-card-content"><h6 class="toast-title">Ihr Kundenkonto existiert noch nicht. <a href="/account/register/" style="color: #d90429 !important; text-decoration-color: #d90429 !important;">Registrieren Sie sich hier</a></h6></div><span class="toast-close-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 413.348 413.348"><path d="M413.348 24.354L388.994 0l-182.32 182.32L24.354 0 0 24.354l182.32 182.32L0 388.994l24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z"></path></svg></span></div></div></div>');
                /*setTimeout(function() {
                  jQuery(".cu-box-em").remove();
                }, 2000);*/
              }else if (response.message === "Invalid email format") {
                $(".send-btn.otp-btn").after('<div class="toast-box-wrapper active cu-box-em"><div class="toast-content"><div class="toast-card error"><div class="toast-icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 413.348 413.348" fill="red"><path d="M413.348 24.354L388.994 0l-182.32 182.32L24.354 0 0 24.354l182.32 182.32L0 388.994l24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z"></path></svg></div><div class="toast-card-content"><h6 class="toast-title">Please enter vaild email address.</h6></div><span class="toast-close-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 413.348 413.348"><path d="M413.348 24.354L388.994 0l-182.32 182.32L24.354 0 0 24.354l182.32 182.32L0 388.994l24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z"></path></svg></span></div></div></div>');
                /*setTimeout(function() {
                  jQuery(".cu-box-em").remove();
                }, 1000);*/
              }else{
                $('.send-btn.otp-btn').trigger('click');
                if (response.phone) {
                    var cook = response.phone.startsWith('0') ? response.phone : '0' + response.phone;
                    $(".input-box-content.mobile-no-inner input").val(cook);
                    document.cookie = "user_phone_cu_login=" + encodeURIComponent(cook) + "; path=/; Secure; SameSite=Lax";
                    //$(".input-box-content.mobile-no-inner").hide();
                    $(".input-box-content.mobile-no-inner").val(cook);
                }

              }
            },
            error: function (xhr, status, error) {
                $('.custom-verify-bu-click').removeClass('custom-verify-bu-click-load');
                $('.custom-verify-bu-click').prop('disabled', false);
            }
          });
        });
        clearInterval(intervalId_qu); // Stop checking once added
      }
    }, 500);

    function getCookie_login(name) {
        let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        return match ? match[2] : null;
    }
   var intervalId_qu_ac = setInterval(function() {
        var newAcfRows_qu_ac = $(".input-box-content.mobile-no-inner");
        if (newAcfRows_qu_ac.length > 0) {
            //var user_phone_cu_login = getCookie_login("user_phone_cu_login");
            //$(".input-box-content.mobile-no-inner input").val(user_phone_cu_login);
            //$(".input-box-content.mobile-no-inner").hide();
            $('.update-btn.otp-btn').html('Aktualisieren');
            $(".verify-box-details.login-description").html('Code verifizieren Email id');
            $(".resend-otp-text").html('Sie haben das OTP nicht erhalten?');
            $(".resend-btn").html('OTP erneut senden');
            $('.verify-btn.otp-btn span').html('Code verifizieren');
          clearInterval(intervalId_qu_ac);
        }
    }, 500);
});


jQuery(document).ready(function(){

  jQuery('.js-filter').removeAttr('open');
  /* for home page start */
  
  $('.section-template--25264922886523__multicolumn_eL4Pec-padding style').remove();
  $('.section-template--25264922886523__multicolumn_eL4Pec-padding').addClass('testi-slider-cu');
  $('#shopify-section-template--25264922886523__rich_text_xEHX4W').addClass('after-banner-sec-cu');
  $('#shopify-section-template--25264922886523__rich_text_z6y4nL').addClass('again-after-banner-sec-cu');
  $('#shopify-section-template--25264922886523__image_with_text_Q7icgm').addClass('right-image-sixty-sec-cu');
  $('#shopify-section-template--25264922886523__image_with_text_Rkencz').addClass('left-image-sixty-sec-cu');
  $('#shopify-section-template--25264922886523__multicolumn').addClass('category-home-sec-cu');
  $('#shopify-section-template--25264922886523__testimonials').addClass('testi-button-after-pro-cu');
  $('#shopify-section-template--25264922886523__testimonials .testimonials__desc').after('<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon icon-button-arrow"><path d="M8.22917 3.75L11.875 7.5M11.875 7.5L8.22917 11.25M11.875 7.5L3.125 7.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>');

  /* for home page end */

  /* for cart page start */

  $('#shopify-section-template--23760434495867__multicolumn_cPtMY3').addClass('category-home-sec-cu');

  /* for cart page end */
});

/* for register page start */

jQuery(document).ready(function(){
  flatpickr("#geburtstag_date", {
      dateFormat: "d.m.Y",
  });
  $('#geburtstag_date').on('change', function() {
      var dateValue = $(this).val();        
      // Split the input date string by "."
      var parts = dateValue.split(".");
      if (parts.length === 3) {
          // Format to YYYY-MM-DD
          var formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
          $('#geburtstag').val(formattedDate);
      }
  });
});

jQuery("#create_customer1").on("click", function () {
  var RegisterForm_FirstName = jQuery('#RegisterForm-FirstName').val();
  var RegisterForm_LastName = jQuery('#RegisterForm-LastName').val();
  var RegisterForm_email = jQuery('#RegisterForm-email').val();
  var CustomerPassword = jQuery('#CustomerPassword').val();
  var firmenname = jQuery('#firmenname').val();
  var geburtstag = jQuery('#geburtstag').val();
  var kundennummer = jQuery('#kundennummer').val();
  var adresse = jQuery('#adresse').val();
  var checkbox = jQuery("#agree-terms");

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  jQuery('.err_msg').hide(); // Hide all error messages initially
  jQuery('#RegisterForm-password-error').hide();
  jQuery('#RegisterForm-email-error').hide();
  if (RegisterForm_FirstName === '') {
    jQuery('.first_err_msg').show();
  } else if (RegisterForm_LastName === '') {
    jQuery('.last_err_msg').show();
  } else if (RegisterForm_email === '') {
    jQuery('.email_err_msg').show();
  } else if (!emailPattern.test(RegisterForm_email)) { // Corrected condition for email validation
    jQuery('.email_val_err_msg').show();
  } else if (CustomerPassword === '') {
    jQuery('.pass_err_msg').show();
  } else if (firmenname === '') {
    jQuery('.firmenname_err_msg').show();
  } else if (geburtstag === '') {
    jQuery('.geburtstag_err_msg').show();
  } else if (kundennummer === '') {
    jQuery('.kundennummer_err_msg').show();
  } else if (adresse === '') {
    jQuery('.adresse_err_msg').show();
  } else if (!checkbox.is(":checked")) {
    jQuery('.term_err_msg').show();
  }else{
    jQuery("#create_customer").submit();
  }
});

/* for register page end */



/* 24-11-2023 article-search start */

$(document).ready(function () {
  $('#custom_field_artikelnumber1').on('change', function () {
    $('#custom_field_artikelnumber1').attr('data-reproduct','');
    //if (e.keyCode === 13) {
      var sku = $(this).val();
      var productContainer = $('.get_product_arti1');
      $('.get_product_arti1').hide();
      productContainer.html('');
  
      if (sku.length >= 3) {
        $('.loader_ikg_search1').show();
        $('.artikelnummer_cu_fi').addClass('loading');
        $('#custom_field_artikelnumber1').prop('disabled', true).css('cursor', 'not-allowed');
  
        function fetchProducts() {
          $.ajax({
            url: '/search?type=product&q=variants.sku:' + sku,
            type: 'GET',
            success: function (data) {
              productContainer.addClass('add_border_get');
              $('.get_product_arti1').show();
               var asd = $(data).find('.card-information-block .unstyled-link').text();
              //console.log(asd);
              if(asd != ''){
              $(data)
                .find('.collection-results')
                .each(function (index, element) {                  
                  $(element)
                    .find('.template-search__item')
                    .each(function (index1, element1) {
                      var specificClassurl = $(element1).find('.card-information-block .unstyled-link').attr('href');
                      var specificClasstitle = $(element1).find('.card-information-block .unstyled-link').html();
                      var specificClasssku = $(element1).find('.card__sku').html();
                      var specificClassid = $(element1).find('.card__sku').attr('data-id');
                      var sku_new = $(element1).find('.card__sku').attr('data-sku');
                      //var specificClassid = "zxc";
                      //alert(specificClassurl);
                      var specificClassimage;
                      //if ($(element1).find('.product__image-mask.hidePrice').length > 0) {
                        specificClassimage = '<div class="card--product"><div class="media" style="height: 0; padding-bottom: 130.0%;"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div><div class="product__secondary-image small--hide"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div></div>';
                     /* } else {
                        specificClassimage = $(element1).find('.card--product .media').html();
                      }*/
  
                      productContainer.append('<li class="pro-li-single-main'+specificClassid+'">' +
                        '<div class="left-search-div product__image-link"><input type="checkbox" id="myCheckbox" name="myCheckbox" onclick="add_pro_search_cart1('+specificClassid+');" class="pro-li-single'+specificClassid+' pro-li-single" data-proid="'+specificClassid+'">' +
                        specificClassimage + '</div>' +
                        '<div class="right-search-div">' +
                        '<p><strong>' + specificClasstitle + '</strong></p>' +
                        '<p class="pro_sku_get" data-skunew="'+sku_new+'">' + specificClasssku + '</p>' +                      
                        '<p class="pro-button-sksr"><a href="' + specificClassurl + '" target="_blank"><span>Details</span></a></p>' +
                        '</div>' +
                        '</li>'
                      );
                    });
                });
  
              $('.loader_ikg_search1').hide();
              $('.artikelnummer_cu_fi').removeClass('loading');
              $('#custom_field_artikelnumber1').prop('disabled', false).css('cursor', 'auto');
              }else{
                $('.get_product_arti1').html('<p style="color: red;">Artikel nicht gefunden, aber mit dieser Artikelnummer in den Warenkorb einfügen</p>');
                $('.loader_ikg_search').hide();
                $('.get_product_arti1').removeClass('add_border_get');
                $('.get_product_arti1').addClass('add_border_get_not');
                $('.artikelnummer_cu_fi').removeClass('loading');
                $('#custom_field_artikelnumber1').prop('disabled', false);
                $('#custom_field_artikelnumber1').css('cursor', 'auto');
              }
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.error('Error:', jqXHR, textStatus, errorThrown);
              productContainer.html('<p style="color: red;">An error occurred while fetching products.</p>');
              $('.loader_ikg_search').hide();
              $('.artikelnummer_cu_fi').removeClass('loading');
              $('#custom_field_artikelnumber1').prop('disabled', false).css('cursor', 'auto');
            },
          });
        }
  
        fetchProducts();
      } else {
        productContainer.html('');
        productContainer.removeClass('add_border_get');
      }
    //}
  });
});

$(document).ready(function () {
  $('#custom_field_artikelnumber2').on('change', function () {
    $('#custom_field_artikelnumber2').attr('data-reproduct','');
    var sku = $(this).val();
    var productContainer = $('.get_product_arti2');

    productContainer.html('');

    if (sku.length >= 3) {
      $('.loader_ikg_search2').show();
      $('.artikelnummer_cu_fi').addClass('loading');
      $('#custom_field_artikelnumber2').prop('disabled', true).css('cursor', 'not-allowed');

      function fetchProducts() {
        $.ajax({
          url: '/search?type=product&q=variants.sku:' + sku,
          type: 'GET',
          success: function (data) {
            productContainer.addClass('add_border_get');
            $('.get_product_arti2').show();
             var asd = $(data).find('.card-information-block .unstyled-link').text();
            //console.log(asd);
            if(asd != ''){
            $(data)
              .find('.collection-results')
              .each(function (index, element) {
                $(element)
                  .find('.template-search__item')
                  .each(function (index1, element1) {
                    var specificClassurl = $(element1).find('.card-information-block .unstyled-link').attr('href');
                    var specificClasstitle = $(element1).find('.card-information-block .unstyled-link').html();
                    var specificClasssku = $(element1).find('.card__sku').html();
                    var specificClassid = $(element1).find('.card__sku').attr('data-id');
                    var sku_new = $(element1).find('.card__sku').attr('data-sku');
                    var specificClassimage;
                    if ($(element1).find('.product__image-mask.hidePrice').length > 0) {
                        specificClassimage = '<div class="card--product"><div class="media" style="height: 0; padding-bottom: 130.0%;"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div><div class="product__secondary-image small--hide"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div></div>';
                    } else {
                        specificClassimage = $(element1).find('.card--product .media').html();
                    }

                    productContainer.append('<li class="pro-li-single-main'+specificClassid+'">' +
                      '<div class="left-search-div product__image-link"><input type="checkbox" id="myCheckbox" name="myCheckbox" onclick="add_pro_search_cart2('+specificClassid+');" class="pro-li-single'+specificClassid+' pro-li-single" data-proid="'+specificClassid+'">' +
                      specificClassimage + '</div>' +
                      '<div class="right-search-div">' +
                      '<p><strong>' + specificClasstitle + '</strong></p>' +
                      '<p class="pro_sku_get" data-skunew="'+sku_new+'">' + specificClasssku + '</p>' +                      
                      '<p class="pro-button-sksr"><a href="' + specificClassurl + '" target="_blank"><span>Details</span></a></p>' +
                      '</div>' +
                      '</li>'
                    );
                  });
              });

            $('.loader_ikg_search2').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber2').prop('disabled', false).css('cursor', 'auto');
            }else{
              $('.get_product_arti2').html('<p style="color: red;">Artikel nicht gefunden, aber mit dieser Artikelnummer in den Warenkorb einfügen</p>');
              $('.loader_ikg_search').hide();
              $('.get_product_arti2').removeClass('add_border_get');
              $('.get_product_arti2').addClass('add_border_get_not');
              $('.artikelnummer_cu_fi').removeClass('loading');
              $('#custom_field_artikelnumber2').prop('disabled', false);
              $('#custom_field_artikelnumber2').css('cursor', 'auto');
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error:', jqXHR, textStatus, errorThrown);
            productContainer.html('<p style="color: red;">An error occurred while fetching products.</p>');
            $('.loader_ikg_search').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber2').prop('disabled', false).css('cursor', 'auto');
          },
        });
      }

      fetchProducts();
    } else {
      productContainer.html('');
      productContainer.removeClass('add_border_get');
    }
  });
});

$(document).ready(function () {
  $('#custom_field_artikelnumber3').on('change', function () {
    $('#custom_field_artikelnumber3').attr('data-reproduct','');
    var sku = $(this).val();
    var productContainer = $('.get_product_arti3');

    productContainer.html('');

    if (sku.length >= 3) {
      $('.loader_ikg_search3').show();
      $('.artikelnummer_cu_fi').addClass('loading');
      $('#custom_field_artikelnumber3').prop('disabled', true).css('cursor', 'not-allowed');

      function fetchProducts() {
        $.ajax({
          url: '/search?type=product&q=variants.sku:' + sku,
          type: 'GET',
          success: function (data) {
            productContainer.addClass('add_border_get');
            $('.get_product_arti3').show();
             var asd = $(data).find('.card-information-block .unstyled-link').text();
            //console.log(asd);
            if(asd != ''){
            $(data)
              .find('.collection-results')
              .each(function (index, element) {
                $(element)
                  .find('.template-search__item')
                  .each(function (index1, element1) {
                    var specificClassurl = $(element1).find('.card-information-block .unstyled-link').attr('href');
                    var specificClasstitle = $(element1).find('.card-information-block .unstyled-link').html();
                    var specificClasssku = $(element1).find('.card__sku').html();
                    var specificClassid = $(element1).find('.card__sku').attr('data-id');
                    var sku_new = $(element1).find('.card__sku').attr('data-sku');
                    var specificClassimage;
                    if ($(element1).find('.product__image-mask.hidePrice').length > 0) {
                        specificClassimage = '<div class="card--product"><div class="media" style="height: 0; padding-bottom: 130.0%;"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div><div class="product__secondary-image small--hide"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div></div>';
                    } else {
                        specificClassimage = $(element1).find('.card--product .media').html();
                    }

                    productContainer.append('<li class="pro-li-single-main'+specificClassid+'">' +
                      '<div class="left-search-div product__image-link"><input type="checkbox" id="myCheckbox" name="myCheckbox" onclick="add_pro_search_cart3('+specificClassid+');" class="pro-li-single'+specificClassid+' pro-li-single" data-proid="'+specificClassid+'">' +
                      specificClassimage + '</div>' +
                      '<div class="right-search-div">' +
                      '<p><strong>' + specificClasstitle + '</strong></p>' +
                      '<p class="pro_sku_get" data-skunew="'+sku_new+'">' + specificClasssku + '</p>' +                      
                      '<p class="pro-button-sksr"><a href="' + specificClassurl + '" target="_blank"><span>Details</span></a></p>' +
                      '</div>' +
                      '</li>'
                    );
                  });
              });

            $('.loader_ikg_search3').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber3').prop('disabled', false).css('cursor', 'auto');
            }else{
              $('.get_product_arti3').html('<p style="color: red;">Artikel nicht gefunden, aber mit dieser Artikelnummer in den Warenkorb einfügen</p>');
              $('.loader_ikg_search').hide();
              $('.get_product_arti3').removeClass('add_border_get');
              $('.get_product_arti3').addClass('add_border_get_not');
              $('.artikelnummer_cu_fi').removeClass('loading');
              $('#custom_field_artikelnumber3').prop('disabled', false);
              $('#custom_field_artikelnumber3').css('cursor', 'auto');
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error:', jqXHR, textStatus, errorThrown);
            productContainer.html('<p style="color: red;">An error occurred while fetching products.</p>');
            $('.loader_ikg_search').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber3').prop('disabled', false).css('cursor', 'auto');
          },
        });
      }

      fetchProducts();
    } else {
      productContainer.html('');
      productContainer.removeClass('add_border_get');
    }
  });
});

$(document).ready(function () {
  $('#custom_field_artikelnumber4').on('change', function () {
    $('#custom_field_artikelnumber4').attr('data-reproduct','');
    var sku = $(this).val();
    var productContainer = $('.get_product_arti4');

    productContainer.html('');

    if (sku.length >= 3) {
      $('.loader_ikg_search4').show();
      $('.artikelnummer_cu_fi').addClass('loading');
      $('#custom_field_artikelnumber4').prop('disabled', true).css('cursor', 'not-allowed');

      function fetchProducts() {
        $.ajax({
          url: '/search?type=product&q=variants.sku:' + sku,
          type: 'GET',
          success: function (data) {
            productContainer.addClass('add_border_get');
            $('.get_product_arti4').show();
             var asd = $(data).find('.card-information-block .unstyled-link').text();
            //console.log(asd);
            if(asd != ''){
            $(data)
              .find('.collection-results')
              .each(function (index, element) {
                $(element)
                  .find('.template-search__item')
                  .each(function (index1, element1) {
                    var specificClassurl = $(element1).find('.card-information-block .unstyled-link').attr('href');
                    var specificClasstitle = $(element1).find('.card-information-block .unstyled-link').html();
                    var specificClasssku = $(element1).find('.card__sku').html();
                    var specificClassid = $(element1).find('.card__sku').attr('data-id');
                    var sku_new = $(element1).find('.card__sku').attr('data-sku');
                    var specificClassimage;
                    if ($(element1).find('.product__image-mask.hidePrice').length > 0) {
                        specificClassimage = '<div class="card--product"><div class="media" style="height: 0; padding-bottom: 130.0%;"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div><div class="product__secondary-image small--hide"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div></div>';
                    } else {
                        specificClassimage = $(element1).find('.card--product .media').html();
                    }

                    productContainer.append('<li class="pro-li-single-main'+specificClassid+'">' +
                      '<div class="left-search-div product__image-link"><input type="checkbox" id="myCheckbox" name="myCheckbox" onclick="add_pro_search_cart4('+specificClassid+');" class="pro-li-single'+specificClassid+' pro-li-single" data-proid="'+specificClassid+'">' +
                      specificClassimage + '</div>' +
                      '<div class="right-search-div">' +
                      '<p><strong>' + specificClasstitle + '</strong></p>' +
                      '<p class="pro_sku_get" data-skunew="'+sku_new+'">' + specificClasssku + '</p>' +                      
                      '<p class="pro-button-sksr"><a href="' + specificClassurl + '" target="_blank"><span>Details</span></a></p>' +
                      '</div>' +
                      '</li>'
                    );
                  });
              });

            $('.loader_ikg_search4').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber4').prop('disabled', false).css('cursor', 'auto');
            }else{
              $('.get_product_arti4').html('<p style="color: red;">Artikel nicht gefunden, aber mit dieser Artikelnummer in den Warenkorb einfügen</p>');
              $('.loader_ikg_search').hide();
              $('.get_product_arti4').removeClass('add_border_get');
              $('.get_product_arti4').addClass('add_border_get_not');
              $('.artikelnummer_cu_fi').removeClass('loading');
              $('#custom_field_artikelnumber4').prop('disabled', false);
              $('#custom_field_artikelnumber4').css('cursor', 'auto');
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error:', jqXHR, textStatus, errorThrown);
            productContainer.html('<p style="color: red;">An error occurred while fetching products.</p>');
            $('.loader_ikg_search').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber4').prop('disabled', false).css('cursor', 'auto');
          },
        });
      }

      fetchProducts();
    } else {
      productContainer.html('');
      productContainer.removeClass('add_border_get');
    }
  });
});

$(document).ready(function () {
  $('#custom_field_artikelnumber5').on('change', function () {
    $('#custom_field_artikelnumber5').attr('data-reproduct','');
    var sku = $(this).val();
    var productContainer = $('.get_product_arti5');

    productContainer.html('');

    if (sku.length >= 3) {
      $('.loader_ikg_search5').show();
      $('.artikelnummer_cu_fi').addClass('loading');
      $('#custom_field_artikelnumber5').prop('disabled', true).css('cursor', 'not-allowed');

      function fetchProducts() {
        $.ajax({
          url: '/search?type=product&q=variants.sku:' + sku,
          type: 'GET',
          success: function (data) {
            productContainer.addClass('add_border_get');
            $('.get_product_arti5').show();
             var asd = $(data).find('.card-information-block .unstyled-link').text();
            //console.log(asd);
            if(asd != ''){
            $(data)
              .find('.collection-results')
              .each(function (index, element) {
                $(element)
                  .find('.template-search__item')
                  .each(function (index1, element1) {
                    var specificClassurl = $(element1).find('.card-information-block .unstyled-link').attr('href');
                    var specificClasstitle = $(element1).find('.card-information-block .unstyled-link').html();
                    var specificClasssku = $(element1).find('.card__sku').html();
                    var specificClassid = $(element1).find('.card__sku').attr('data-id');
                    var sku_new = $(element1).find('.card__sku').attr('data-sku');
                    var specificClassimage;
                    if ($(element1).find('.product__image-mask.hidePrice').length > 0) {
                        specificClassimage = '<div class="card--product"><div class="media" style="height: 0; padding-bottom: 130.0%;"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div><div class="product__secondary-image small--hide"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div></div>';
                    } else {
                        specificClassimage = $(element1).find('.card--product .media').html();
                    }

                    productContainer.append('<li class="pro-li-single-main'+specificClassid+'">' +
                      '<div class="left-search-div product__image-link"><input type="checkbox" id="myCheckbox" name="myCheckbox" onclick="add_pro_search_cart5('+specificClassid+');" class="pro-li-single'+specificClassid+' pro-li-single" data-proid="'+specificClassid+'">' +
                      specificClassimage + '</div>' +
                      '<div class="right-search-div">' +
                      '<p><strong>' + specificClasstitle + '</strong></p>' +
                      '<p class="pro_sku_get" data-skunew="'+sku_new+'">' + specificClasssku + '</p>' +                      
                      '<p class="pro-button-sksr"><a href="' + specificClassurl + '" target="_blank"><span>Details</span></a></p>' +
                      '</div>' +
                      '</li>'
                    );
                  });
              });

            $('.loader_ikg_search5').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber5').prop('disabled', false).css('cursor', 'auto');
            }else{
              $('.get_product_arti5').html('<p style="color: red;">Artikel nicht gefunden, aber mit dieser Artikelnummer in den Warenkorb einfügen</p>');
              $('.loader_ikg_search').hide();
              $('.get_product_arti5').removeClass('add_border_get');
              $('.get_product_arti5').addClass('add_border_get_not');
              $('.artikelnummer_cu_fi').removeClass('loading');
              $('#custom_field_artikelnumber5').prop('disabled', false);
              $('#custom_field_artikelnumber5').css('cursor', 'auto');
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error:', jqXHR, textStatus, errorThrown);
            productContainer.html('<p style="color: red;">An error occurred while fetching products.</p>');
            $('.loader_ikg_search').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber5').prop('disabled', false).css('cursor', 'auto');
          },
        });
      }

      fetchProducts();
    } else {
      productContainer.html('');
      productContainer.removeClass('add_border_get');
    }
  });
});

$(document).ready(function () {
  $('#custom_field_artikelnumber6').on('change', function () {
    $('#custom_field_artikelnumber6').attr('data-reproduct','');
    var sku = $(this).val();
    var productContainer = $('.get_product_arti6');

    productContainer.html('');

    if (sku.length >= 3) {
      $('.loader_ikg_search6').show();
      $('.artikelnummer_cu_fi').addClass('loading');
      $('#custom_field_artikelnumber6').prop('disabled', true).css('cursor', 'not-allowed');

      function fetchProducts() {
        $.ajax({
          url: '/search?type=product&q=variants.sku:' + sku,
          type: 'GET',
          success: function (data) {
            productContainer.addClass('add_border_get');
            $('.get_product_arti6').show();
             var asd = $(data).find('.card-information-block .unstyled-link').text();
            //console.log(asd);
            if(asd != ''){
            $(data)
              .find('.collection-results')
              .each(function (index, element) {
                $(element)
                  .find('.template-search__item')
                  .each(function (index1, element1) {
                    var specificClassurl = $(element1).find('.card-information-block .unstyled-link').attr('href');
                    var specificClasstitle = $(element1).find('.card-information-block .unstyled-link').html();
                    var specificClasssku = $(element1).find('.card__sku').html();
                    var specificClassid = $(element1).find('.card__sku').attr('data-id');
                    var sku_new = $(element1).find('.card__sku').attr('data-sku');
                    var specificClassimage;
                    if ($(element1).find('.product__image-mask.hidePrice').length > 0) {
                        specificClassimage = '<div class="card--product"><div class="media" style="height: 0; padding-bottom: 130.0%;"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div><div class="product__secondary-image small--hide"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div></div>';
                    } else {
                        specificClassimage = $(element1).find('.card--product .media').html();
                    }

                    productContainer.append('<li class="pro-li-single-main'+specificClassid+'">' +
                      '<div class="left-search-div product__image-link"><input type="checkbox" id="myCheckbox" name="myCheckbox" onclick="add_pro_search_cart6('+specificClassid+');" class="pro-li-single'+specificClassid+' pro-li-single" data-proid="'+specificClassid+'">' +
                      specificClassimage + '</div>' +
                      '<div class="right-search-div">' +
                      '<p><strong>' + specificClasstitle + '</strong></p>' +
                      '<p class="pro_sku_get" data-skunew="'+sku_new+'">' + specificClasssku + '</p>' +                      
                      '<p class="pro-button-sksr"><a href="' + specificClassurl + '" target="_blank"><span>Details</span></a></p>' +
                      '</div>' +
                      '</li>'
                    );
                  });
              });

            $('.loader_ikg_search6').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber6').prop('disabled', false).css('cursor', 'auto');
            }else{
              $('.get_product_arti6').html('<p style="color: red;">Artikel nicht gefunden, aber mit dieser Artikelnummer in den Warenkorb einfügen</p>');
              $('.loader_ikg_search').hide();
              $('.get_product_arti6').removeClass('add_border_get');
              $('.get_product_arti6').addClass('add_border_get_not');
              $('.artikelnummer_cu_fi').removeClass('loading');
              $('#custom_field_artikelnumber6').prop('disabled', false);
              $('#custom_field_artikelnumber6').css('cursor', 'auto');
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error:', jqXHR, textStatus, errorThrown);
            productContainer.html('<p style="color: red;">An error occurred while fetching products.</p>');
            $('.loader_ikg_search').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber6').prop('disabled', false).css('cursor', 'auto');
          },
        });
      }

      fetchProducts();
    } else {
      productContainer.html('');
      productContainer.removeClass('add_border_get');
    }
  });
});

$(document).ready(function () {
  $('#custom_field_artikelnumber7').on('change', function () {
    $('#custom_field_artikelnumber7').attr('data-reproduct','');
    var sku = $(this).val();
    var productContainer = $('.get_product_arti7');

    productContainer.html('');

    if (sku.length >= 3) {
      $('.loader_ikg_search7').show();
      $('.artikelnummer_cu_fi').addClass('loading');
      $('#custom_field_artikelnumber7').prop('disabled', true).css('cursor', 'not-allowed');

      function fetchProducts() {
        $.ajax({
          url: '/search?type=product&q=variants.sku:' + sku,
          type: 'GET',
          success: function (data) {
            productContainer.addClass('add_border_get');
            $('.get_product_arti7').show();
             var asd = $(data).find('.card-information-block .unstyled-link').text();
            //console.log(asd);
            if(asd != ''){
            $(data)
              .find('.collection-results')
              .each(function (index, element) {
                $(element)
                  .find('.template-search__item')
                  .each(function (index1, element1) {
                    var specificClassurl = $(element1).find('.card-information-block .unstyled-link').attr('href');
                    var specificClasstitle = $(element1).find('.card-information-block .unstyled-link').html();
                    var specificClasssku = $(element1).find('.card__sku').html();
                    var specificClassid = $(element1).find('.card__sku').attr('data-id');
                    var sku_new = $(element1).find('.card__sku').attr('data-sku');
                    var specificClassimage;
                    if ($(element1).find('.product__image-mask.hidePrice').length > 0) {
                        specificClassimage = '<div class="card--product"><div class="media" style="height: 0; padding-bottom: 130.0%;"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div><div class="product__secondary-image small--hide"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div></div>';
                    } else {
                        specificClassimage = $(element1).find('.card--product .media').html();
                    }

                    productContainer.append('<li class="pro-li-single-main'+specificClassid+'">' +
                      '<div class="left-search-div product__image-link"><input type="checkbox" id="myCheckbox" name="myCheckbox" onclick="add_pro_search_cart7('+specificClassid+');" class="pro-li-single'+specificClassid+' pro-li-single" data-proid="'+specificClassid+'">' +
                      specificClassimage + '</div>' +
                      '<div class="right-search-div">' +
                      '<p><strong>' + specificClasstitle + '</strong></p>' +
                      '<p class="pro_sku_get" data-skunew="'+sku_new+'">' + specificClasssku + '</p>' +                      
                      '<p class="pro-button-sksr"><a href="' + specificClassurl + '" target="_blank"><span>Details</span></a></p>' +
                      '</div>' +
                      '</li>'
                    );
                  });
              });

            $('.loader_ikg_search7').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber7').prop('disabled', false).css('cursor', 'auto');
            }else{
              $('.get_product_arti7').html('<p style="color: red;">Artikel nicht gefunden, aber mit dieser Artikelnummer in den Warenkorb einfügen</p>');
              $('.loader_ikg_search').hide();
              $('.get_product_arti7').removeClass('add_border_get');
              $('.get_product_arti7').addClass('add_border_get_not');
              $('.artikelnummer_cu_fi').removeClass('loading');
              $('#custom_field_artikelnumber7').prop('disabled', false);
              $('#custom_field_artikelnumber7').css('cursor', 'auto');
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error:', jqXHR, textStatus, errorThrown);
            productContainer.html('<p style="color: red;">An error occurred while fetching products.</p>');
            $('.loader_ikg_search').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber7').prop('disabled', false).css('cursor', 'auto');
          },
        });
      }

      fetchProducts();
    } else {
      productContainer.html('');
      productContainer.removeClass('add_border_get');
    }
  });
});

$(document).ready(function () {
  $('#custom_field_artikelnumber8').on('change', function () {
    $('#custom_field_artikelnumber8').attr('data-reproduct','');
    var sku = $(this).val();
    var productContainer = $('.get_product_arti8');

    productContainer.html('');

    if (sku.length >= 3) {
      $('.loader_ikg_search8').show();
      $('.artikelnummer_cu_fi').addClass('loading');
      $('#custom_field_artikelnumber8').prop('disabled', true).css('cursor', 'not-allowed');

      function fetchProducts() {
        $.ajax({
          url: '/search?type=product&q=variants.sku:' + sku,
          type: 'GET',
          success: function (data) {
            productContainer.addClass('add_border_get');
            $('.get_product_arti8').show();
             var asd = $(data).find('.card-information-block .unstyled-link').text();
            //console.log(asd);
            if(asd != ''){
            $(data)
              .find('.collection-results')
              .each(function (index, element) {
                $(element)
                  .find('.template-search__item')
                  .each(function (index1, element1) {
                    var specificClassurl = $(element1).find('.card-information-block .unstyled-link').attr('href');
                    var specificClasstitle = $(element1).find('.card-information-block .unstyled-link').html();
                    var specificClasssku = $(element1).find('.card__sku').html();
                    var specificClassid = $(element1).find('.card__sku').attr('data-id');
                    var sku_new = $(element1).find('.card__sku').attr('data-sku');
                    var specificClassimage;
                    if ($(element1).find('.product__image-mask.hidePrice').length > 0) {
                        specificClassimage = '<div class="card--product"><div class="media" style="height: 0; padding-bottom: 130.0%;"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div><div class="product__secondary-image small--hide"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div></div>';
                    } else {
                        specificClassimage = $(element1).find('.card--product .media').html();
                    }

                    productContainer.append('<li class="pro-li-single-main'+specificClassid+'">' +
                      '<div class="left-search-div product__image-link"><input type="checkbox" id="myCheckbox" name="myCheckbox" onclick="add_pro_search_cart8('+specificClassid+');" class="pro-li-single'+specificClassid+' pro-li-single" data-proid="'+specificClassid+'">' +
                      specificClassimage + '</div>' +
                      '<div class="right-search-div">' +
                      '<p><strong>' + specificClasstitle + '</strong></p>' +
                      '<p class="pro_sku_get" data-skunew="'+sku_new+'">' + specificClasssku + '</p>' +                      
                      '<p class="pro-button-sksr"><a href="' + specificClassurl + '" target="_blank"><span>Details</span></a></p>' +
                      '</div>' +
                      '</li>'
                    );
                  });
              });

            $('.loader_ikg_search8').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber8').prop('disabled', false).css('cursor', 'auto');
            }else{
              $('.get_product_arti8').html('<p style="color: red;">Artikel nicht gefunden, aber mit dieser Artikelnummer in den Warenkorb einfügen</p>');
              $('.loader_ikg_search').hide();
              $('.get_product_arti8').removeClass('add_border_get');
              $('.get_product_arti8').addClass('add_border_get_not');
              $('.artikelnummer_cu_fi').removeClass('loading');
              $('#custom_field_artikelnumber8').prop('disabled', false);
              $('#custom_field_artikelnumber8').css('cursor', 'auto');
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error:', jqXHR, textStatus, errorThrown);
            productContainer.html('<p style="color: red;">An error occurred while fetching products.</p>');
            $('.loader_ikg_search').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber8').prop('disabled', false).css('cursor', 'auto');
          },
        });
      }

      fetchProducts();
    } else {
      productContainer.html('');
      productContainer.removeClass('add_border_get');
    }
  });
});

$(document).ready(function () {
  $('#custom_field_artikelnumber9').on('change', function () {
    $('#custom_field_artikelnumber9').attr('data-reproduct','');
    var sku = $(this).val();
    var productContainer = $('.get_product_arti9');

    productContainer.html('');

    if (sku.length >= 3) {
      $('.loader_ikg_search9').show();
      $('.artikelnummer_cu_fi').addClass('loading');
      $('#custom_field_artikelnumber9').prop('disabled', true).css('cursor', 'not-allowed');

      function fetchProducts() {
        $.ajax({
          url: '/search?type=product&q=variants.sku:' + sku,
          type: 'GET',
          success: function (data) {
            productContainer.addClass('add_border_get');
            $('.get_product_arti9').show();
             var asd = $(data).find('.card-information-block .unstyled-link').text();
            //console.log(asd);
            if(asd != ''){
            $(data)
              .find('.collection-results')
              .each(function (index, element) {
                $(element)
                  .find('.template-search__item')
                  .each(function (index1, element1) {
                    var specificClassurl = $(element1).find('.card-information-block .unstyled-link').attr('href');
                    var specificClasstitle = $(element1).find('.card-information-block .unstyled-link').html();
                    var specificClasssku = $(element1).find('.card__sku').html();
                    var specificClassid = $(element1).find('.card__sku').attr('data-id');
                    var sku_new = $(element1).find('.card__sku').attr('data-sku');
                    var specificClassimage;
                    if ($(element1).find('.product__image-mask.hidePrice').length > 0) {
                        specificClassimage = '<div class="card--product"><div class="media" style="height: 0; padding-bottom: 130.0%;"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div><div class="product__secondary-image small--hide"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div></div>';
                    } else {
                        specificClassimage = $(element1).find('.card--product .media').html();
                    }

                    productContainer.append('<li class="pro-li-single-main'+specificClassid+'">' +
                      '<div class="left-search-div product__image-link"><input type="checkbox" id="myCheckbox" name="myCheckbox" onclick="add_pro_search_cart9('+specificClassid+');" class="pro-li-single'+specificClassid+' pro-li-single" data-proid="'+specificClassid+'">' +
                      specificClassimage + '</div>' +
                      '<div class="right-search-div">' +
                      '<p><strong>' + specificClasstitle + '</strong></p>' +
                      '<p class="pro_sku_get" data-skunew="'+sku_new+'">' + specificClasssku + '</p>' +                      
                      '<p class="pro-button-sksr"><a href="' + specificClassurl + '" target="_blank"><span>Details</span></a></p>' +
                      '</div>' +
                      '</li>'
                    );
                  });
              });

            $('.loader_ikg_search9').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber9').prop('disabled', false).css('cursor', 'auto');
            }else{
              $('.get_product_arti9').html('<p style="color: red;">Artikel nicht gefunden, aber mit dieser Artikelnummer in den Warenkorb einfügen</p>');
              $('.loader_ikg_search').hide();
              $('.get_product_arti9').removeClass('add_border_get');
              $('.get_product_arti9').addClass('add_border_get_not');
              $('.artikelnummer_cu_fi').removeClass('loading');
              $('#custom_field_artikelnumber9').prop('disabled', false);
              $('#custom_field_artikelnumber9').css('cursor', 'auto');
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error:', jqXHR, textStatus, errorThrown);
            productContainer.html('<p style="color: red;">An error occurred while fetching products.</p>');
            $('.loader_ikg_search').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber9').prop('disabled', false).css('cursor', 'auto');
          },
        });
      }

      fetchProducts();
    } else {
      productContainer.html('');
      productContainer.removeClass('add_border_get');
    }
  });
});

$(document).ready(function () {
  $('#custom_field_artikelnumber10').on('change', function () {
    $('#custom_field_artikelnumber10').attr('data-reproduct','');
    var sku = $(this).val();
    var productContainer = $('.get_product_arti10');

    productContainer.html('');

    if (sku.length >= 3) {
      $('.loader_ikg_search10').show();
      $('.artikelnummer_cu_fi').addClass('loading');
      $('#custom_field_artikelnumber10').prop('disabled', true).css('cursor', 'not-allowed');

      function fetchProducts() {
        $.ajax({
          url: '/search?type=product&q=variants.sku:' + sku,
          type: 'GET',
          success: function (data) {
            productContainer.addClass('add_border_get');
            $('.get_product_arti10').show();
             var asd = $(data).find('.card-information-block .unstyled-link').text();
            //console.log(asd);
            if(asd != ''){
            $(data)
              .find('.collection-results')
              .each(function (index, element) {
                $(element)
                  .find('.template-search__item')
                  .each(function (index1, element1) {
                    var specificClassurl = $(element1).find('.card-information-block .unstyled-link').attr('href');
                    var specificClasstitle = $(element1).find('.card-information-block .unstyled-link').html();
                    var specificClasssku = $(element1).find('.card__sku').html();
                    var specificClassid = $(element1).find('.card__sku').attr('data-id');
                    var sku_new = $(element1).find('.card__sku').attr('data-sku');
                    var specificClassimage;
                    if ($(element1).find('.product__image-mask.hidePrice').length > 0) {
                        specificClassimage = '<div class="card--product"><div class="media" style="height: 0; padding-bottom: 130.0%;"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div><div class="product__secondary-image small--hide"><img src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"></div></div>';
                    } else {
                        specificClassimage = $(element1).find('.card--product .media').html();
                    }

                    productContainer.append('<li class="pro-li-single-main'+specificClassid+'">' +
                      '<div class="left-search-div product__image-link"><input type="checkbox" id="myCheckbox" name="myCheckbox" onclick="add_pro_search_cart10('+specificClassid+');" class="pro-li-single'+specificClassid+' pro-li-single" data-proid="'+specificClassid+'">' +
                      specificClassimage + '</div>' +
                      '<div class="right-search-div">' +
                      '<p><strong>' + specificClasstitle + '</strong></p>' +
                      '<p class="pro_sku_get" data-skunew="'+sku_new+'">' + specificClasssku + '</p>' +                      
                      '<p class="pro-button-sksr"><a href="' + specificClassurl + '" target="_blank"><span>Details</span></a></p>' +
                      '</div>' +
                      '</li>'
                    );
                  });
              });

            $('.loader_ikg_search10').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber10').prop('disabled', false).css('cursor', 'auto');
            }else{
              $('.get_product_arti10').html('<p style="color: red;">Artikel nicht gefunden, aber mit dieser Artikelnummer in den Warenkorb einfügen</p>');
              $('.loader_ikg_search').hide();
              $('.get_product_arti10').removeClass('add_border_get');
              $('.get_product_arti10').addClass('add_border_get_not');
              $('.artikelnummer_cu_fi').removeClass('loading');
              $('#custom_field_artikelnumber10').prop('disabled', false);
              $('#custom_field_artikelnumber10').css('cursor', 'auto');
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error:', jqXHR, textStatus, errorThrown);
            productContainer.html('<p style="color: red;">An error occurred while fetching products.</p>');
            $('.loader_ikg_search').hide();
            $('.artikelnummer_cu_fi').removeClass('loading');
            $('#custom_field_artikelnumber10').prop('disabled', false).css('cursor', 'auto');
          },
        });
      }

      fetchProducts();
    } else {
      productContainer.html('');
      productContainer.removeClass('add_border_get');
    }
  });
});




  $(document).ready(function() {
    $('.add_pro_bulk').click(function() {
        var elementsWithSameClass = $(".main_article_search_di").find(".custom_field_artikelnumber_in");
        var productData = [];
        var productDataem = [];
        var nonEmptyCount = 0;
        elementsWithSameClass.each(function(index, element) {
            var pro_id_inside = $(element).attr('data-reproduct');
            var pro_quan = $(element).parent().parent().find('.cu_quantity').val();
            //var proid_new = pro_id_inside || '47045136154915';
            var customFieldValue = pro_id_inside ? '' : $(element).val();
            var customFieldName = 'Custom SKU';
            var cu_value = $(element).val();
            if(pro_id_inside){
              var proid_new = pro_id_inside;
            }else{
              var proid_new = '47045136154915';
            }
          //console.log(proid_new);
            if(cu_value){
              console.log(proid_new);
              productData.push({
                  id: proid_new,
                  quantity: pro_quan,
                  properties: {
                      [customFieldName]: customFieldValue
                  }
              });
            }else{
              nonEmptyCount++;
              /*productDataem.push({
                  id: proid_new,
                  quantity: 1,
                  properties: {
                      [customFieldName]: customFieldValue
                  }
              });*/
            }
        });

        // Replace 'YOUR_STOREFRONT_ACCESS_TOKEN' and 'YOUR_STORE_URL' with your actual token and store URL
        var storefrontAccessToken = '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';
        var storeUrl = 'https://www.shanti-enterprise.ch';

        // Function to add products to the cart
        function addToCart(products) {
            $.ajax({
                type: 'POST',
                url: `${storeUrl}/cart/add.js`,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({ items: products }),
                success: function(response) {
                    $('.return_mess').html('<span class="suc_mess">Produkte Zum Warenkorb hinzugefügt</span>');
                    setTimeout(function() {
                        $('.return_mess').html('');
                        location.reload();
                    }, 3500);
                },
                error: function(error) {
                    //console.error('Error adding product to cart:', error);
                    //console.error('Response text:', error.responseText);
                    $('.return_mess').html('<span class="err_mess">Produkte konnten nicht in den Warenkorb gelegt werden</span>');
                    setTimeout(function() {
                        $('.return_mess').html('');
                        location.reload();
                    }, 3500);
                }
            });
        }

        // Add products to the cart
        if(nonEmptyCount == 10){
          //console.log(nonEmptyCount);
          //function addToCart(productId) {
              // Replace 'custom_field_name' with the actual name of your custom field
              $.post(`${storeUrl}/cart/add.js`, {
                  id: '47045136154915',
                  quantity: 1,
              })
              .done(() => {
                  $('.return_mess').html('<span class="suc_mess">Produkte Zum Warenkorb hinzugefügt</span>');
                  setTimeout(function() {
                      $('.return_mess').html('');
                      location.reload();
                  }, 2500);
              })
              .fail((error) => {
                  //console.error('Error adding product to cart:', error);
                  //console.error('Response text:', error.responseText);
                  $('.return_mess').html('<span class="err_mess">Produkte konnten nicht in den Warenkorb gelegt werden</span>');
                  setTimeout(function() {
                      $('.return_mess').html('');
                      location.reload();
                  }, 2500);
              });
          //}
        }else{
          addToCart(productData);
        }
    });
});





  function add_pro_search_cart1(proid) {
    //alert('here');
    // Remove the class from all elements with the class 'pro-li-single'
    $('.pro-li-single').removeClass('active-search-product');
    $('.pro-li-single').prop('checked', false);
    
    // Add the class to the clicked element
    $('.pro-li-single'+proid).addClass('active-search-product');
    $('.pro-li-single'+proid).prop('checked', true);
    var pro_sku_get = $('.pro-li-single-main'+proid+' .pro_sku_get').attr('data-skunew');
    $('#custom_field_artikelnumber1').val(pro_sku_get);
    $('.get_product_arti').html('');
    $('#custom_field_artikelnumber1').attr('data-reproduct',proid);
  }

  function add_pro_search_cart2(proid) {
    //alert('here');
    // Remove the class from all elements with the class 'pro-li-single'
    $('.pro-li-single').removeClass('active-search-product');
    $('.pro-li-single').prop('checked', false);
    
    // Add the class to the clicked element
    $('.pro-li-single'+proid).addClass('active-search-product');
    $('.pro-li-single'+proid).prop('checked', true);
    var pro_sku_get = $('.pro-li-single-main'+proid+' .pro_sku_get').attr('data-skunew');
    $('#custom_field_artikelnumber2').val(pro_sku_get);
    $('.get_product_arti').html('');
    $('#custom_field_artikelnumber2').attr('data-reproduct',proid);
  }

function add_pro_search_cart3(proid) {
    //alert('here');
    // Remove the class from all elements with the class 'pro-li-single'
    $('.pro-li-single').removeClass('active-search-product');
    $('.pro-li-single').prop('checked', false);
    
    // Add the class to the clicked element
    $('.pro-li-single'+proid).addClass('active-search-product');
    $('.pro-li-single'+proid).prop('checked', true);
    var pro_sku_get = $('.pro-li-single-main'+proid+' .pro_sku_get').attr('data-skunew');
    $('#custom_field_artikelnumber3').val(pro_sku_get);
    $('.get_product_arti').html('');
    $('#custom_field_artikelnumber3').attr('data-reproduct',proid);
  }

function add_pro_search_cart4(proid) {
    //alert('here');
    // Remove the class from all elements with the class 'pro-li-single'
    $('.pro-li-single').removeClass('active-search-product');
    $('.pro-li-single').prop('checked', false);
    
    // Add the class to the clicked element
    $('.pro-li-single'+proid).addClass('active-search-product');
    $('.pro-li-single'+proid).prop('checked', true);
    var pro_sku_get = $('.pro-li-single-main'+proid+' .pro_sku_get').attr('data-skunew');
    $('#custom_field_artikelnumber4').val(pro_sku_get);
    $('.get_product_arti').html('');
    $('#custom_field_artikelnumber4').attr('data-reproduct',proid);
  }

function add_pro_search_cart5(proid) {
    //alert('here');
    // Remove the class from all elements with the class 'pro-li-single'
    $('.pro-li-single').removeClass('active-search-product');
    $('.pro-li-single').prop('checked', false);
    
    // Add the class to the clicked element
    $('.pro-li-single'+proid).addClass('active-search-product');
    $('.pro-li-single'+proid).prop('checked', true);
    var pro_sku_get = $('.pro-li-single-main'+proid+' .pro_sku_get').attr('data-skunew');
    $('#custom_field_artikelnumber5').val(pro_sku_get);
    $('.get_product_arti').html('');
    $('#custom_field_artikelnumber5').attr('data-reproduct',proid);
  }

function add_pro_search_cart6(proid) {
    //alert('here');
    // Remove the class from all elements with the class 'pro-li-single'
    $('.pro-li-single').removeClass('active-search-product');
    $('.pro-li-single').prop('checked', false);
    
    // Add the class to the clicked element
    $('.pro-li-single'+proid).addClass('active-search-product');
    $('.pro-li-single'+proid).prop('checked', true);
    var pro_sku_get = $('.pro-li-single-main'+proid+' .pro_sku_get').attr('data-skunew');
    $('#custom_field_artikelnumber6').val(pro_sku_get);
    $('.get_product_arti').html('');
    $('#custom_field_artikelnumber6').attr('data-reproduct',proid);
  }

function add_pro_search_cart7(proid) {
    //alert('here');
    // Remove the class from all elements with the class 'pro-li-single'
    $('.pro-li-single').removeClass('active-search-product');
    $('.pro-li-single').prop('checked', false);
    
    // Add the class to the clicked element
    $('.pro-li-single'+proid).addClass('active-search-product');
    $('.pro-li-single'+proid).prop('checked', true);
    var pro_sku_get = $('.pro-li-single-main'+proid+' .pro_sku_get').attr('data-skunew');
    $('#custom_field_artikelnumber7').val(pro_sku_get);
    $('.get_product_arti').html('');
    $('#custom_field_artikelnumber7').attr('data-reproduct',proid);
  }

function add_pro_search_cart8(proid) {
    //alert('here');
    // Remove the class from all elements with the class 'pro-li-single'
    $('.pro-li-single').removeClass('active-search-product');
    $('.pro-li-single').prop('checked', false);
    
    // Add the class to the clicked element
    $('.pro-li-single'+proid).addClass('active-search-product');
    $('.pro-li-single'+proid).prop('checked', true);
    var pro_sku_get = $('.pro-li-single-main'+proid+' .pro_sku_get').attr('data-skunew');
    $('#custom_field_artikelnumber8').val(pro_sku_get);
    $('.get_product_arti').html('');
    $('#custom_field_artikelnumber8').attr('data-reproduct',proid);
  }

function add_pro_search_cart9(proid) {
    //alert('here');
    // Remove the class from all elements with the class 'pro-li-single'
    $('.pro-li-single').removeClass('active-search-product');
    $('.pro-li-single').prop('checked', false);
    
    // Add the class to the clicked element
    $('.pro-li-single'+proid).addClass('active-search-product');
    $('.pro-li-single'+proid).prop('checked', true);
    var pro_sku_get = $('.pro-li-single-main'+proid+' .pro_sku_get').attr('data-skunew');
    $('#custom_field_artikelnumber9').val(pro_sku_get);
    $('.get_product_arti').html('');
    $('#custom_field_artikelnumber9').attr('data-reproduct',proid);
  }

function add_pro_search_cart10(proid) {
    //alert('here');
    // Remove the class from all elements with the class 'pro-li-single'
    $('.pro-li-single').removeClass('active-search-product');
    $('.pro-li-single').prop('checked', false);
    
    // Add the class to the clicked element
    $('.pro-li-single'+proid).addClass('active-search-product');
    $('.pro-li-single'+proid).prop('checked', true);
    var pro_sku_get = $('.pro-li-single-main'+proid+' .pro_sku_get').attr('data-skunew');
    $('#custom_field_artikelnumber10').val(pro_sku_get);
    $('.get_product_arti').html('');
    $('#custom_field_artikelnumber10').attr('data-reproduct',proid);
  }

//Stefan 14.12 hide payment state in customer BE

        $(document).ready(function(){
           $(".table--responsive th:contains('Zahlungsstatus')").hide();
            $(".table--responsive td[data-label='Zahlungsstatus']").hide();
        });
  
function increment1() {
    var quantityInput = document.getElementById('quantity1');
    quantityInput.stepUp();
  }

function decrement1() {
  var quantityInput = document.getElementById('quantity1');
  quantityInput.stepDown();
}


function increment2() {
    var quantityInput = document.getElementById('quantity2');
    quantityInput.stepUp();
  }

function decrement2() {
  var quantityInput = document.getElementById('quantity2');
  quantityInput.stepDown();
}

function increment3() {
    var quantityInput = document.getElementById('quantity3');
    quantityInput.stepUp();
  }

function decrement3() {
  var quantityInput = document.getElementById('quantity3');
  quantityInput.stepDown();
}

function increment4() {
    var quantityInput = document.getElementById('quantity4');
    quantityInput.stepUp();
  }

function decrement4() {
  var quantityInput = document.getElementById('quantity4');
  quantityInput.stepDown();
}

function increment5() {
    var quantityInput = document.getElementById('quantity5');
    quantityInput.stepUp();
  }

function decrement5() {
  var quantityInput = document.getElementById('quantity5');
  quantityInput.stepDown();
}

function increment6() {
    var quantityInput = document.getElementById('quantity6');
    quantityInput.stepUp();
  }

function decrement6() {
  var quantityInput = document.getElementById('quantity6');
  quantityInput.stepDown();
}

function increment7() {
    var quantityInput = document.getElementById('quantity7');
    quantityInput.stepUp();
  }

function decrement7() {
  var quantityInput = document.getElementById('quantity7');
  quantityInput.stepDown();
}

function increment8() {
    var quantityInput = document.getElementById('quantity8');
    quantityInput.stepUp();
  }

function decrement8() {
  var quantityInput = document.getElementById('quantity8');
  quantityInput.stepDown();
}

function increment9() {
    var quantityInput = document.getElementById('quantity9');
    quantityInput.stepUp();
  }

function decrement9() {
  var quantityInput = document.getElementById('quantity9');
  quantityInput.stepDown();
}

function increment10() {
    var quantityInput = document.getElementById('quantity10');
    quantityInput.stepUp();
  }

function decrement10() {
  var quantityInput = document.getElementById('quantity10');
  quantityInput.stepDown();
}




$(document).ready(function(){
  
 
  var intervalId_qu = setInterval(function() {
      var newAcfRows_qu = jQuery(".hura-coblock");
      
      if (newAcfRows_qu.length > 0) {
          $('.hura-coblock').each(function() {
            
            var data_productid = $(this).attr('data-productid');
            var pro_link1 = $(this).find('a').attr('href');
            $.get(pro_link1, function(data) {
                var externalContent = $(data).find(".find-front").html();
                var externalContentlink = $(data).find(".find-front").attr('data-link');
                //console.log(externalContent);
            
                // Ensure DOM updates happen inside the callback
                $('.hura-coblock').each(function() {
                    var pro_link12 = $(this).find('a').attr('href');
                    if(externalContentlink == pro_link12){
                      $(this).find('a').attr('href', '/account/register');
                      $(this).find('a').addClass('for-recom-front');
                      $(this).find('a .hura-product-thumbnail-wrapper').html(externalContent); // This will now work properly
                    }
                });
            });

            //if(externalContent == '<img class="gen_cu_img product__image-mask image-wrap" src="https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif" alt="Hidden Image">'){
              
            //}
            //$(this).find('a').attr('href')
            $(this).append('<span class="custom-add-cart" data_productid="'+data_productid+'"><svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none"><path d="M175 4725 c-5 -2 -22 -6 -38 -9 -41 -9 -103 -71 -123 -122 -41 -106 21 -221 137 -254 19 -6 176 -10 354 -10 l320 0 272 -1265 272 -1264 -57 -108 c-77 -145 -120 -244 -128 -292 -8 -50 10 -103 49 -148 47 -53 97 -72 192 -73 l80 -1 -42 -14 c-67 -20 -126 -60 -181 -120 -70 -77 -96 -145 -96 -260 0 -80 3 -97 31 -157 165 -353 675 -288 746 95 13 71 -2 176 -34 239 -46 90 -144 172 -244 204 -33 10 197 13 1270 13 1288 0 1309 0 1252 -19 -167 -53 -276 -217 -265 -399 19 -333 430 -488 668 -251 207 208 118 568 -163 655 l-42 14 78 0 c137 2 220 59 240 169 18 94 -55 200 -152 221 -37 8 -464 11 -1460 11 l-1409 0 34 77 c39 91 42 132 14 248 -10 44 -18 80 -17 81 1 1 731 87 1623 191 1785 209 1671 191 1729 272 l30 43 3 831 c2 574 0 843 -8 869 -14 48 -53 94 -101 118 -38 20 -72 20 -1908 20 l-1871 0 -5 23 c-2 12 -14 67 -24 121 -32 157 -74 219 -170 246 -32 9 -830 14 -856 5z"></path></g></svg></span><b class="cls-'+data_productid+' loading-overlay__spinner hidden"><svg aria-hidden="true" focusable="false" role="presentation" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle></svg></b>');
    //$(this).find('img').attr('src','https://cdn.shopify.com/s/files/1/0719/1635/5875/t/5/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif');
          });
  

          $('.custom-add-cart').click(function() {
            var storefrontAccessToken = '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';
            var storeUrl = 'https://www.shanti-enterprise.ch';
            var data_productid = $(this).attr('data_productid');
            $('.cls-'+data_productid).removeClass('hidden');
            $(this)
              $.post(`${storeUrl}/cart/add.js`, {
                  id: data_productid,
                  quantity: 1,
              })
              .done(() => {
                  $('.cls-'+data_productid).addClass('hidden');
                  /*$('.return_mess').html('<span class="suc_mess">Produkte Zum Warenkorb hinzugefügt</span>');
                  setTimeout(function() {
                      $('.return_mess').html('');
                  }, 2500);*/
              })
              .fail((error) => {
                  $('.cls-'+data_productid).addClass('hidden');
                  /*$('.return_mess').html('<span class="err_mess">Produkte konnten nicht in den Warenkorb gelegt werden</span>');
                  setTimeout(function() {
                      $('.return_mess').html('');
                  }, 2500);*/
              });
          });
          
          clearInterval(intervalId_qu); // Stop checking once added
      }
  }, 500);
  
});



/*
$(document).ready(function() {
    $('.custom-add-cart').click(function() {
      alert('asd');
      /*var storefrontAccessToken = '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';
      var storeUrl = 'https://www.shanti-enterprise.ch';
      var data_productid = $(this).attr('data_productid');
      $('.cls-'+data_productid).removeClass('hidden');
      $(this)
        $.post(`${storeUrl}/cart/add.js`, {
            id: data_productid,
            quantity: 1,
        })
        .done(() => {
            $('.cls-'+data_productid).addClass('hidden');
            /*$('.return_mess').html('<span class="suc_mess">Produkte Zum Warenkorb hinzugefügt</span>');
            setTimeout(function() {
                $('.return_mess').html('');
            }, 2500);*//*
        })
        .fail((error) => {
            $('.cls-'+data_productid).addClass('hidden');
            /*$('.return_mess').html('<span class="err_mess">Produkte konnten nicht in den Warenkorb gelegt werden</span>');
            setTimeout(function() {
                $('.return_mess').html('');
            }, 2500);*//*
        });  */   /* 
    });
});*/


/*  for newsletter start */

jQuery(document).ready(function(){
  flatpickr("#birthdate_home_date", {
      dateFormat: "d.m.Y",
  });
  $('#birthdate_home_date').on('change', function() {
      var dateValue = $(this).val();        
      // Split the input date string by "."
      var parts = dateValue.split(".");
      if (parts.length === 3) {
          // Format to YYYY-MM-DD
          var formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
          $('#birthdate_home').val(formattedDate);
      }
  });
});


jQuery(document).ready(function() {
  $("#updateMetafieldForm").on("submit", function(e) {
    e.preventDefault(); // Prevent default form submission

    // Get form data
    var birthdate_home = $("#birthdate_home").val();    
    var customerId = $("#customer_id").val();
    
    
    if(birthdate_home == ''){
      $('.birthdate_home_err_msg').show();
    } else {
      $('.birthdate_home_err_msg').hide();

      $.ajax({
        url: "https://p666591.mittwaldserver.info/shanti_newsletter/path-to-your-php-script.php", // Replace with the actual PHP script URL
        method: "POST",
        data: {
          birthdate_home: birthdate_home,
          customer_id: customerId
        },
        success: function(response) {
          if (response === 'yes') {
            
            $('.succ_msg').show();
            $('.erro_msg').hide();
          } else {
            $('.succ_msg').hide();
            $('.erro_msg').show();
          }
        },
        error: function(xhr, status, error) {
          $('.succ_msg').hide();
          $('.erro_msg').show();
        }
      });
    }
  });
});


 

/*  for newsletter end */

