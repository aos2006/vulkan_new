$(document).ready(function(){
  var inputTel = $('.js-phone');
  var item = $('.js-item');
  var modal = $('.js-modal');
  var buttonSubmit = $('.js-submit');
  var repeathChance = $('.thanks__repeat');
  var decorCheckbox = $('.js-decor-checkbox');
  var showModal = $('.js-show-modal');



  showModal.on('click', function(ev){
    ev.preventDefault();
    if ($('.js-thanks').hasClass('thanks-for-reg--show')) {
      $('.js-thanks').removeClass('thanks-for-reg--show');
    }
    $('body, html').animate({
      scrollTop: 0
    }, 1000, function(){
      modal.addClass('modal--show');
    });
  })

  decorCheckbox.on('click', function(ev) {
    ev.preventDefault();
  })

  function clearForm() {
    $('.form__error').removeClass('form__error--show')
    $('.form__input').removeClass('form__input--error');
  }

  repeathChance.on('click', function() {
    var currentForm = $(this).attr('data-form');
    $('.thanks').eq(currentForm).removeClass('thanks--show');
    $('.form').eq(currentForm).removeClass('form--hide');
  });

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  buttonSubmit.on('click', function(ev){
    ev.preventDefault();
    var selfInput = $('.js-phone');
    var isChcked = $('.js-checkbox').is(':checked');
    var isValidInput = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(selfInput.val());
    console.log(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(selfInput.val()));
    if (isChcked && isValidInput) {
      $(ev.currentTarget).parent().find('.js-error').removeClass('form__error--show');
      $(ev.currentTarget).parent().find('label').removeClass('error')
      selfInput.removeClass('modal__input--error');
      //$(ev.currentTarget).parent().find('.js-error').addClass('thanks')
      $.ajax({
        url: 'http://smsintegrator.ru/api/v1/order/save',
        method: 'post',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        success: function() {
          modal.removeClass('modal--show');
          $('.js-thanks').addClass('thanks-for-reg--show');
          setTimeout(function(){
            $('.js-thanks').removeClass('thanks-for-reg--show')
          }, 5000)
        },
        data: {
          phone: selfInput.val(),
          sub_id: getParameterByName('subid')
        }
      })
      return;
    }

    if (!isValidInput || selfInput.val() === '') {
      selfInput.addClass('modal__input--error');
      $(ev.currentTarget).parent().find('.js-error').addClass('form__error--show');
    }

    if (!isChcked) {
      var label = $(ev.currentTarget).parent().find('label');
      if (label.hasClass('error')) {
        label.removeClass('error');
        label.addClass('error');
      }
      label.addClass('error');

      return;
    }
  })

  //item.on('click', function() {
  //  console.log('clicked');
  //  modal.addClass('popup--show');
  //  clearForm();
  //})

  //modal.on('click', function(ev) {
  //  if ($(ev.target).hasClass('js-modal')) {
  //    modal.removeClass('modal--show');
  //    clearForm()
  //  }
  //
  //  return;
  //})

  //inputTel.on('focus', function() {
  //  //$('body').animate({
  //  //  scrollTop: '30px'
  //  //}, 1000)
  //  $('body').css({
  //    overflow: 'hidden'
  //  });
  //  //$('.out').css('height', deviceHeight);
  //})
  //
  //inputTel.on('blur', function() {
  //  $('body').css('overflow', 'visible');
  //  $('.out').css('height', '100%');
  //})

  inputTel.inputmask({
    alias: 'phone',
    allowDropdown: false
  })
})
