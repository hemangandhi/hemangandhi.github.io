let ls = document.getElementById('slide-0');
let slide_nav = document.getElementById('slide-nr');
let i = 0;
for(;(ls = document.getElementById('slide-' + i)) != null; i++) {
    ls.style.display = "none";
    let option = document.createElement('option');
    option.value = "slide-" + i;
    let title = ls.querySelector('.big-title');
    if (title === null) {
        title = ls.querySelector('div');
    }
    option.innerText = title.innerText;
    slide_nav.appendChild(option);
}

function getSlideOfUrl() {
    let id = window.location.hash;
    if (!id.startsWith('#')) {
        return 0;
    } else if (id.startsWith('#slide-')) {
        return parseInt(id.replace('#slide-', ''));
    }
    let node;
    for(node = document.getElementById(id.substr(1)); node !== null && node != document.body && !node.id.startsWith('slide-'); node = node.parentNode);
    if (node === null || node == document.body) return 0;
    let rv = parseInt(node.id.replace('slide-', ''));
    if (rv > i - 1 || rv < 0) return 0;
    return rv;
}

let curr_slide = getSlideOfUrl();
function updateSlide() {
    document.getElementById('slide-' + curr_slide).style.display = 'block';
    document.getElementById('slide-ct').innerText = (curr_slide + 1) + '/' + i;
    slide_nav.value = 'slide-' + curr_slide;
}
// Initialize the counter
updateSlide();

document.getElementById('next-slide').addEventListener('click', function (e) {
    if(curr_slide == i - 1) return;
    document.getElementById('slide-' + curr_slide).style.display = "none";
    curr_slide++;
    updateSlide();
});
document.getElementById('prev-slide').addEventListener('click', function (e) {
    if(curr_slide == 0) return;
    document.getElementById('slide-' + curr_slide).style.display = "none";
    curr_slide--;
    updateSlide();
});

slide_nav.addEventListener('change', function(e) {
    document.getElementById('slide-' + curr_slide).style.display = "none";
    curr_slide = parseInt(slide_nav.value.replace('slide-', ''));
    updateSlide();
});

window.onhashchange = function(){
    document.getElementById('slide-' + curr_slide).style.display = "none";
    curr_slide = getSlideOfUrl();
    updateSlide();
};
