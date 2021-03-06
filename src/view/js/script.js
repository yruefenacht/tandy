jQuery(document).ready(function($) {

    //------------------------
    //  STICKY HEADER
    //------------------------
    function stickyHeader() {
        let scrollTop = $(window).scrollTop();
        let header = $("h1");
        let headerSquare = $(".header__menu__line__square");

        if(scrollTop >= 50) {
            header.slideUp();
            headerSquare.addClass("header__menu__line__square--shrink");
        } else {
            header.slideDown();
            headerSquare.removeClass("header__menu__line__square--shrink");
        }
    };
    $(window).scroll(stickyHeader);
    stickyHeader();

    //------------------------
    //  LOGIN SUBMIT
    //------------------------
    $("#formLogin").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("data-url"),
            data: $(this).serialize(),
            success: function(data)
            {
                data = JSON.parse(data);
                if(data.status === "success") {
                    window.location = data.href;
                } else {
                    showLoginErrorMessage(data.error);
                }
            }
        });
    });

    //------------------------
    //  REGISTER SUBMIT
    //------------------------
    $("#formRegister").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("data-url"),
            data: $(this).serialize(),
            success: function(data)
            {
                data = JSON.parse(data);
                if(data.status === "success") {
                   window.location = data.href;
                } else {
                   showLoginErrorMessage(data.error);
                }
            }
        });
    });

    //------------------------
    //  DISPLAY ERROR
    //------------------------
    let showLoginErrorMessage = function(message) {
        let errorDisplayDuration = 5000;
        let loginInput = $(".form__container__input");
        let loginInputErrorClass = "form__container__input--error";
        let loginErrorMsg = $(".form__container__error");
        loginErrorMsg.text(message);
        loginErrorMsg.slideDown(); 
        loginInput.addClass(loginInputErrorClass);
        setTimeout(() => {
            loginInput.removeClass(loginInputErrorClass);
            loginErrorMsg.slideUp();
        }, errorDisplayDuration);
    };

    //--------------------------------------
    //  CHOOSE COLOR (product_detail.php)
    //--------------------------------------
    $(".product__view__colors__radio").click(function() {
        let selected = "product__view__colors__radio--selected";
        $(".product__view__colors__radio").removeClass(selected);
        $(this).addClass(selected);
        $("#productColor").val($(this).attr("data-color-id"));
    });
    $(".product__view__colors__radio:first-child").click();

    //----------------------------
    //  ADD TO BASKET SUBMIT
    //----------------------------
    $("#formAddBasket").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr('data-url'),
            data: $(this).serialize(),
            success: function(data)
            {
                $("#orderCount").text(data);
                let cartIcon = ".header__icons__item--cart";
                $(cartIcon).css("animation-name", "header__icons__item--beat");
                setTimeout(function() {
                    $(cartIcon).css("animation-name", "none");
                }, 1000)
            }
        });
    });

    //---------------------------
    //  BASKET CHANGE AMOUNT
    //---------------------------
    $(".basket__item__right__number").bind('keyup mouseup', function () {
        $(this).closest("form").submit();        
    });

    //------------------------
    //  INPUT VALIDATION
    //------------------------
    $(".input--validate-me").on('input', function(e) {
        var format = /[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;
        $(this).val($(this).val().replace(format, ''));
    });

    //------------------------
    //  PAY BASKET SUBMIT
    //------------------------
    let payButton = $('.checkout__form__submit');
    $("#formProductPay").submit(function(e) {
        payButton.prop("disabled", true);
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr('data-url'),
            data: $(this).serialize(),
            success: function(data)
            {
                console.log(data)
                data = JSON.parse(data);
                if(data.status === "success") {
                   window.location = data.href;
                } else {
                    showCheckoutErrorMessage(data.error);
                    payButton.prop("disabled", false);
                }
            }
        });
    });

    let showCheckoutErrorMessage = function(message) {
        let errorDiv = $(".checkout__form__error");
        let errorDisplayDuration = 5000;
        errorDiv.text(message);
        errorDiv.slideDown();
        setTimeout(() => errorDiv.slideUp(), errorDisplayDuration);
    }

    //------------------------
    //  USER PROFILE
    //------------------------
    var prevEmail = $('.profile__section__email').val();
    $('.profile__section__email').keyup(function() {
        let enable = ($(this).val() != '' && $(this).val() != prevEmail);
        $('.profile__section__submit').prop('disabled', !enable);
    });

    $("#formEditEmail").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("data-url"),
            data: $(this).serialize(),
            success: function(data)
            {
                $('.profile__section__submit').addClass("profile__section__submit--success");
            }
        });
    });

    //------------------------
    //  HEADER SEARCH
    //------------------------
    $("#header__icons__search").click(function() {
        $('.header__search').slideToggle();
        $('.header__search__bar').focus();
    });
});