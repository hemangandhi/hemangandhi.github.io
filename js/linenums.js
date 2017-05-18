function prepareGutters(){
    $('.content').each(function(){
        var gutters = [];
        $(this).children('div').each(function(){
            gutters[$(this).attr('data-line-num') - 1] = "top:" + $(this).position().top + "px;";
            gutters[$(this).attr('data-line-num') - 1] += "height:" + $(this).height() + "px;";
        });

        var gutterHTML = gutters.map(function(pos, idx){
            return '<div style="position:absolute;' + pos + '">' + (idx + 1) + '</div>';
        }).join('\n');
        console.log(gutterHTML);

        $(this).siblings('.gutter').html(gutterHTML);
    });
}

function prepareContent(){
    $('.content').each(function(){
        var lines = $(this).html().split('<br>').slice(0, -1);
        var newHTML = lines.map(function(ln, idx){
            return '<div data-line-num="' + (idx + 1) + '">' + ln + '</div>';
        }).join('\n');
        $(this).html(newHTML);

    });

};

function totalHW(parent){
    var height = 0;
    var width = 0;
    parent.children().each(function(){
        height += $(this).outerHeight();
        width += $(this).outerWidth();
    });
    return {height: height, width: width};
}

function updatePositions(){
    var me = totalHW($(this));
    var y = 100 * $(this).scrollTop() / me.height;
    var x = $(this).scrollLeft() + '/' + Math.floor(me.width);
    $(this).siblings('.status-line').children('.position').html(y + '%, ' + x);
}

$(document).ready(function(){
    prepareContent();
    prepareGutters();

    $('.vim-scroll').each(updatePositions);
    $('.vim-scroll').scroll(updatePositions);

    $(window).resize(prepareGutters);
});
