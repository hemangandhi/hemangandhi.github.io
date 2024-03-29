function strip_monogatari(name) {
    //エロい名前で勘違いしないで下さい
    //...don't think of this is a... dirty way.
    var idx_monogatari = name.toLowerCase().indexOf('monogatari');
    return name.substring(0, idx_monogatari).replace(' ', '').toLowerCase();
}

function episode_to_id(series, ep_num){
    return strip_monogatari(series) + '-' + ep_num + '-clicked';
}

function populate_season(name, num_eps){
    var list_item = '<li class="ep-series">' + name + ': <ul>';
    for(var i = 1; i <= num_eps; i++){
        list_item += '<li id="' + episode_to_id(name, i) +
            '" class="ep-checkbox">Episode ' + i + '</li>';
    }
    return list_item + '</ul></li>';
}

function click_id_to_season(id){
    return '.' + id.replace('-clicked', '');
}

function make_all_the_episodes(ep_parent_id){
    var html = '<ul class="ep-series-series">';
    html += populate_season('Bakemonogatari', 15);
    html += populate_season('Nisemonogatari', 11);
    html += populate_season('Nekomonogatari', 4);
    html += populate_season('Second Monogatari Season', 23);
    html += populate_season('Hanamonogatari', 5);
    html += populate_season('Tsukimonogatari', 4);
    html += populate_season('Owarimonogatari', 26);
    html += populate_season('Kizumonogatari', 3);
    html += populate_season('Koyomimonogatari', 12);
    html += populate_season('Second Owarimonogatari Season', 7);
    html += populate_season('Zokuowarimonogatari', 6);
    html += '</ul>';
    document.getElementById(ep_parent_id).innerHTML = html;

    Array.from(document.getElementsByClassName('ep-checkbox')).forEach(function (elt){
        elt.addEventListener("click", function(evnt){
            var to_hide = evnt.target.classList.contains('episode-checked');
            if (to_hide) { // Fix checkbox
                evnt.target.classList.remove("episode-checked");
            } else {
                evnt.target.classList.add("episode-checked");
            }

            // Show/hide spoilers
            Array.from(document.querySelectorAll(click_id_to_season(elt.id))).forEach(function (alter_disp) {
                if (!to_hide) {
                    alter_disp.style.display = (alter_disp.tagName == 'SPAN')?'inline':'block';
                } else if (Array.from(alter_disp.classList).every(function(cls) {
                    return !document.getElementById(cls + '-clicked') ||
                        !document.getElementById(cls + '-clicked').classList.contains('episode-checked');
                })) {
                    alter_disp.style.display = 'none';
                }
            });
        });
    });
}
