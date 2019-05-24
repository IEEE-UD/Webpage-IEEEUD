var firstLoad = 0;
var actualPage = "";
var smooth;
var mobile;
var windowResized = false;
var vsSection = $('.vs-section');
var raf;
var results;
var viewportHeight = $('#contact').outerHeight();

var hauteurMaPage;
var itemMaxScroll;
var actualScroll = 0;
var currentPixel = actualScroll;
var myReq;


// To know total width of .vs-div
var sectionWidth = 0;

var preload = new createjs.LoadQueue();
var originSizeOrientation;

var skewDirection;

// ---------------------
// ------ Mobile ou Desktop -----
// ---------------------
function getSupport() {

    if (
        //        navigator.userAgent.match(/Android/i) ||
        //        navigator.userAgent.match(/webOS/i) ||
        //        navigator.userAgent.match(/iPhone/i) ||
                navigator.userAgent.match(/iPad/i) ||
        //        navigator.userAgent.match(/iPod/i) ||
        //        navigator.userAgent.match(/BlackBerry/i) ||
        //        navigator.userAgent.match(/Windows Phone/i) ||
        document.documentElement.clientWidth < 769) {
        
        // ALORS MOBILE
        mobile = true;
        skewDirection = "skewY(";

        if ($('html').hasClass('desktop')) {
            location.reload();
        }

        $('html').addClass('mobile');
    } else {
        //ALORS DESKTOP
        
        mobile = false;
        skewDirection = "skewX(";

        if ($('html').hasClass('mobile')) {
            location.reload();
        }

        $('html').addClass('desktop');
        mouseFollower();
    }
    //console.log('--- getSupport() is mobile = ' + mobile);


}



//
// LOADING PAGE - PRELOAD JS
//
//var Url = 'http://' + window.location.host + '/';

function loading() {
    //console.log('--- loading ---');
    var preload = new createjs.LoadQueue();
    //preload.on("fileload", handleFileLoad);
    preload.on("progress", handleOverallProgress);
    //preload.on("fileprogress", handleFileProgress);
    //preload.on("error", handleFileError);
    preload.on("complete", handleComplete);
    //preload.setMaxConnections(5);

    preload.loadFile('./img/home/deco1.jpg');
    preload.loadFile('./img/home/deco2.jpg');
    preload.loadFile('./img/home/deco3.jpg');
    preload.loadFile('./img/home/deco4.jpg');
    preload.loadFile('./img/home/deco5.jpg');
    preload.loadFile('./img/home/deco6.jpg');
    preload.loadFile('./img/home/deco7.jpg');
    preload.loadFile('./img/1.jpg');
    preload.loadFile('./img/2.jpg');
    preload.loadFile('./img/3.jpg');
    preload.loadFile('./img/4.jpg');
    preload.loadFile('./img/5.jpg');
    preload.loadFile('./img/6.jpg');
    preload.loadFile('./img/7.jpg');
    preload.loadFile('./img/8.jpg');
    preload.loadFile('./img/home/logo-iut.jpg');

    preload.loadFile('./js/dev/cartes.js');

    getSupport();

    function handleOverallProgress(event) {
        //console.log('--- handleOverallProgress ---' + Math.round(event.progress * 100));

        $('#pourcentLoader').html(parseInt(event.progress * 100) + "%");
        $('#bgLoaderBlanc').css(
            "width", (event.progress * 200)
        );
    }
    //function handleFileLoad(event) { //console.log('  while loading')}
    function handleComplete(event) {
        //console.log('--- handleComplete ---');


        TweenMax.to($('#containerLoader'), 1, {
            ease: Power3.easeOut,
            left: '170%',
            //delay: 0.5


        });
        TweenMax.to($('#loader'), 1, {
            ease: Power3.easeOut,
            //delay:0.5,
            skewX: 10,
            left: '-120%'

        });

        TweenMax.from($('.vs-section'), 1, {
            ease: Power3.easeOut,
            skewX: 10,
            scale: 0.8,
            left: '20%',
            onComplete: () => {
                SmoothInit();
                goToContact();
            }
        });

    }
}

// ---------------------
// ------ Fonction au smooth -----
// ---------------------


// ---------------------
// ------ On resize screen -----
// ---------------------
var resizeTimer;

function resizeWindows() {
    //console.log('--- enable resizeWindows() ---');

    $(window).on('resize', function (e) {

        windowResized = true;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (mobile == false) {
                sectionWidth = 0;
                getSupport();

                SmoothInit();
            }
            if (mobile == true) {
                getSupport();
            }
            // Run code here, resizing has "stopped"
        }, 500);

    });
}



//
// INIT SMOOTH SCROLL
//


function initiateSmoothVertical() {
    // Si c'est la single, vertical smooth
    //console.log('--- var smoothVertical ---');
    document.querySelector('.vs-section').style.width = '100vw';


    jQuery.each([$('#intro'), $('#contact'), ], function (i, val) {
        val.css({
            height: viewportHeight
        });
    });
    $('#cartes').css({
        height: (2 * viewportHeight) + 4057
    });

    // To setup vertical smooth smooth
    smooth = new Smooth({
        native: true,
        preload: true,
        section: document.querySelector('.vs-section'),
        divs: document.querySelectorAll('.vs-div'),
        direction: 'vertical',
        ease: 0.5
    });
}

function initiateSmoothHorizontal() {

    //console.log('--- var smoothHorizontal ---');
    var divs = document.querySelectorAll('.calcWithVs');
                [].forEach.call(divs, function (el) {
        sectionWidth += el.clientWidth;
    });
    document.querySelector('.vs-section').style.width = sectionWidth + 'px';
    smooth = new Smooth({
        native: false,
        preload: true,
        section: document.querySelector('.vs-section'),
        divs: document.querySelectorAll('.vs-div'),
        direction: 'horizontal',
        ease: 0.1
    });
}

function goToContact() {
    $('#contactZone').click(function () {
        smooth.scrollTo(6290);
    })
    $('#scrollToCards').click(function () {
        smooth.scrollTo(1000);
    })

}

function mouseFollower() {
    var mouseX = 0,
        mouseY = 0,
        limitX = document.documentElement.clientWidth,
        limitY = document.documentElement.clientHeight;
    $(window).mousemove(function (e) {
        mouseX = Math.min(e.pageX, limitX);
        mouseY = Math.min(e.pageY, limitY);
    });
    
    // cache the selector
    var follower = $("#follower");
    var xp = 0,
        yp = 0;
    var loop = setInterval(function () {
        // change 12 to alter damping higher is slower
        xp += (mouseX - xp) / 10;
        yp += (mouseY - yp) / 10;
        follower.css("transform","translate("+(xp + actualScroll - 4) +"px," + (yp - 5)+"px)");
        
    }, 30);
}

function initialiseGoodSmooth() {
    //console.log('--- initialiseGoodSmooth ---');
    getSupport();



    if (mobile == true) {
        initiateSmoothVertical();
    } else {
        initiateSmoothHorizontal();
    }
    if (windowResized == true) {
        //console.log('--- smooth destroy ---');
        smooth.destroy();
    }
}

// 
// SMOOTH SCROLL INIT
//
function SmoothInit() {
    //console.log('--- smooth.init ---');
    initialiseGoodSmooth();
    smooth.init();

}




$(window).ready(function () {

    loading();
    resizeWindows();
});