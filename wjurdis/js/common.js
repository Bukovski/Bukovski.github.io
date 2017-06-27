$(function() {
    $(".slider-wrap").slideDown(); //включаем слайдер после загрузки страницы
    
    
	$(".top-line .sf-menu").superfish({
        cssArrows: false, //выключить встроенные иконки
        hoverClass: 'no-class', //отключаем изменение цвета когда стрелка уходит за переделы меню
        delay: 300 //скорость ховера
    }); //выпадающее подменю


	var owl = $(".slider");
	owl.owlCarousel({
		loop: true,
		items: 1, //количество слайдов
		itemClass: "slide-wrap",
		nav: true, //навигационные точки
		navText: "" //убираем надписи с навигации
	}); //основной слайдер
    $('.next').on('click', function () {
        owl.trigger('next.owl.carousel', [500]);
    });
    $('.prev').on('click', function () {
        owl.trigger('prev.owl.carousel', [500]);
    });
    
    
    $(".sf-menu").after("<div id='my-menu'>"); //создаем блок для меню
    $(".sf-menu").clone().appendTo("#my-menu"); //клонируем меню с шапки в мобильное меню
    $("#my-menu").find("*").attr("style", ""); //очищаем от встроеных стилей
    $("#my-menu").find("ul").removeClass("sf-menu"); //очищаем от встроеных стилей
    $("#my-menu").mmenu({ //настроки меню
        extensions: ['widescreen', 'theme-white', 'effect-menu-slide', 'pagedim-black'],
        navbar: {
            title: "Меню"
        }
    }); //само мобильное меню из плагина http://mmenu.frebsite.nl/tutorials/off-canvas/styling-lists.html
    $(".mobile-mnu").click(function() { //полоски в крестик
        $(this).find(".toggle-mnu").toggleClass("on");
        $(".main-mnu").slideToggle();
        return false;
    });
    //$("#clone-menu").clone().appendTo("#my-menu");
    var mmAPI = $("#my-menu").data( "mmenu" );
    mmAPI.bind("closed",function(){
        $(".toggle-mnu").removeClass("on");
    });
    $(".mobile-mnu").click(function() {
        if(!$(".toggle-mnu").hasClass("on")) {
            mmAPI.close();
        } else {
            mmAPI.open();
        }
    });
    
    
    $(".service-item h4").equalHeights(); //выравниваение текста внутри блока по высоте
    $(".new-item-text").equalHeights(); //выравниваение текста внутри блока по высоте
    $(".link-item").equalHeights(); //выравниваение текста внутри блока по высоте
    
    
    //http://dimsemenov.com/plugins/magnific-popup/
    $(".popup-with-move-anim").magnificPopup({ //высплывающая форма
        type: 'inline',
        
        fixedContentPos: false,
        fixedBgPos: true,
        
        overflowY: 'auto',
        
        closeBtnInside: true,
        preloader: false,
        
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });
    $("a[href=\\#callback]").click(function() { //отслеживаем форму отправки Заказать звонок верхняя или нижняя форма
        $("#callback .formname").val($(this).data("form"));
    });
    
    
    
    //SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() { //если браузер не поддерживает формат svg
			return $(this).attr("src").replace(".svg", ".png"); //заменяем svg->png
		});
	}

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$(".callback").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
		    $(".success").addClass("visible"); //после отправки формы на мыло, показываем сообщение об отправке формы
			setTimeout(function() {
				// Done Functions
				th.trigger("reset"); //все что было заполненно в полях очистится
                $(".success").removeClass("visible"); //скрываем сообщение об отправке формы
                $.magnificPopup.close(); //закрываем всплывающую форму отправки на мыло
			}, 3000);
		});
		return false;
	});

});
