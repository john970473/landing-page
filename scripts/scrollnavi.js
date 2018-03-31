var SCROLL_MSEC = 1000;
var SCROLL_INTV_MSEC = 10;

var naviLinks = document.querySelectorAll("a.nav-link");

var linkTarget;
var curScrollCtrl = null;


function scrollToTarget(naviLink) {
    if (curScrollCtrl !== null) {
        clearInterval(curScrollCtrl.eventId);
    }

    var ScrollCtrl = { eventId:0, curPosY:0, nintvs:0, intvLen:0, dstPosY:0 };
    curScrollCtrl = ScrollCtrl;

    ScrollCtrl.curPosY = window.pageYOffset;

    var tar = document.querySelector(naviLink.href.split(naviLink.pathname)[1]);
    linkTarget = tar;
    var height = tar.getBoundingClientRect().top;
    ScrollCtrl.nintvs = SCROLL_MSEC / SCROLL_INTV_MSEC;
    ScrollCtrl.intvLen = height / ScrollCtrl.nintvs;
    ScrollCtrl.dstPosY = window.pageYOffset + height;
    ScrollCtrl.nintvs -= 1;

    ScrollCtrl.eventId = setInterval(
        function () {
            if (ScrollCtrl.nintvs > 0 && ScrollCtrl.curPosY >= 0) {
                ScrollCtrl.nintvs -= 1;
                ScrollCtrl.curPosY += ScrollCtrl.intvLen;
                window.scrollTo(0, ScrollCtrl.curPosY);
            } else {
                window.scrollTo(0, ScrollCtrl.dstPosY);
                curScrollCtrl = null;
                clearInterval(ScrollCtrl.eventId);
            }
        },
        SCROLL_INTV_MSEC
    );
}

for (var i = 0; i < naviLinks.length; i++) {
    naviLinks[i].addEventListener(
        "click",
        (function (naviLink) {
            return function (e) {
                scrollToTarget(naviLink);
                e.preventDefault();
            };
        }) (naviLinks[i])
    );
}
