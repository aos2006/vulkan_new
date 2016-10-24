$(document).ready(function(){
  var inputTel = $('.js-phone');
  var item = $('.js-item');
  var modal = $('.js-modal');
  var buttonSubmit = $('.js-submit');
  var deviceHeight = $(window).height();
  var deviceWidth = $(window).width();
  var repeathChance = $('.thanks__repeat');

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
    var selfInput = $(ev.currentTarget).parent().find('.js-phone');
    var isChcked = $($(ev.currentTarget).parent().find('.js-checkbox')).is(':checked');
    var isValidInput = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(selfInput.val());
    console.log(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(selfInput.val()));
    if (isChcked && isValidInput) {
      $(ev.currentTarget).parent().find('.js-error').removeClass('form__error--show');
      $(ev.currentTarget).parent().find('label').removeClass('error')
      selfInput.removeClass('form__input--error');
      //$(ev.currentTarget).parent().find('.js-error').addClass('thanks')
      $.ajax({
        url: 'http://smsintegrator.ru/api/v1/order/save',
        method: 'post',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        success: function() {
          $(ev.currentTarget).parent().addClass('form--hide');
          $(ev.currentTarget).parent().parent().find('.thanks').addClass('thanks--show');
        },
        data: {
          phone: selfInput.val(),
          sub_id: getParameterByName('subid')
        }
      })
      return;
    }

    if (!isValidInput || selfInput.val() === '') {
      selfInput.addClass('form__input--error');
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

  item.on('click', function() {
    console.log('clicked');
    modal.addClass('popup--show');
    clearForm();
  })

  modal.on('click', function(ev) {
    if ($(ev.target).hasClass('js-modal')) {
      modal.removeClass('popup--show');
      clearForm()
    }

    return;
  })

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
