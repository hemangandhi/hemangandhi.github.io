
var DURATION = 500000;
var TIMEOUT = 10;

var slowlyScrollTo = function(scr){
    console.log(scr);
    var dx = scr - document.body.scrollLeft;
    var perTick = dx / DURATION * TIMEOUT;

    setTimeout(function(){
        window.scrollTo(document.body.scrollLeft + dx, 0);
        if(document.body.scrollLeft === scr) return;
        slowlyScrollTo(scr);
    }, TIMEOUT);
};
