// 曲名を書く
function render_title(song, element) {
    if (!song.name) return;
    let new_div = document.createElement("div");
    new_div.classList.add("big-title");
    new_div.classList.add("content-blog");
    new_div.textContent = song.scripts.map(s => song.name[s]).join(" | ");
    element.appendChild(new_div);
}

// 曲に関する注意を書く
function render_content_warning(song, element) {
    function format_cw([lang, warnings]) {
        const CW_FORMATTERS = {
            japanese: cw => "\u6ce8\u610f\uff1a" + cw.join("\u3001") + "\u3092\u542b\u3080\u66f2\u3067\u3059\u3002",
            english: cw => "Warning: this song touches on " + cw.join(", ")
        };
        return (CW_FORMATTERS[lang] ?? (x => x))(warnings);
    }

    if (!song.content_warnings) return;
    let new_div = document.createElement("div");
    new_div.innerHTML = Object.entries(song.content_warnings)
        .map(format_cw).join("<br/>");
    new_div.classList.add("content-blog");
    element.appendChild(new_div);
}

// 前書きを書く
function render_preamble(song, element) {
    if (!song.preamble) return;
    let new_div = document.createElement("div");
    new_div.innerHTML = song.preamble;
    new_div.classList.add("content-blog");
    element.appendChild(new_div);
}

// 歌詞表面を書く
function render_lyrics_table(song, element) {
    if (!song.lyrics) return;
    let table = document.createElement("table");
    let top_row = document.createElement("tr");
    top_row.innerHTML = song.scripts.map(s => "<th>" + s + "</th>").join("");
    table.appendChild(top_row);
    let min = Math.min(...Object.entries(song.lyrics).map(([_, l]) => l.length));
    for (let i = 0; i < min; i++) {
        let row = document.createElement("tr");
        row.innerHTML = song.scripts.map(s => "<td>" + song.lyrics[s][i] + "</td>").join("");
        table.appendChild(row);
    }
    let new_div = document.createElement("div");
    new_div.appendChild(table);
    new_div.classList.add("content-blog");
    element.appendChild(new_div);
}

function render_links(song, element) {
    if(!song.links) return;
    let list = document.createElement("ul");
    for (const link of song.links) {
        let item = document.createElement("li");
        item.innerHTML = link;
        list.appendChild(item);
    }
    let new_div = document.createElement("div");
    let intro_div = document.createElement("div");
    intro_div.textContent = "Here are some links related to this song:";
    new_div.appendChild(intro_div);
    new_div.appendChild(list);
    new_div.classList.add("content-blog");
    element.appendChild(new_div);
}

// JSONを読んでHTMLを書く
function render_song(song, element) {
    return function() {
        element.innerHTML = "";
        render_title(song, element);
        render_content_warning(song, element);
        render_preamble(song, element);
        render_lyrics_table(song, element);
        render_links(song, element);
    };
}

// 言語の選択
function draw_language_options(song_map, element, datalist) {
    let curr_lang = '';

    function populate_datalist() {
        datalist.innerHTML = Object.keys(song_map[curr_lang]).map((name) => {
            return '<option value="' + name + '">';
        });
    }

    function render_option(lang, i) {
        let input = document.createElement("input");
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'gengo');
        input.value = lang;
        input.id = lang;
        if (i === 0) {
            curr_lang = lang;
            input.setAttribute('checked', true);
        }
        input.addEventListener('change', () => {
            curr_lang = lang
            populate_datalist();
        });
        let label = document.createElement('label');
        label.setAttribute('for', lang);
        label.innerText = lang;
        element.appendChild(input);
        element.appendChild(label);
    }

    element.innerHTML = "";
    Object.keys(song_map).forEach(render_option);
    populate_datalist();

    return function() { return curr_lang; };
}

// 左上のテキスト
function draw_left_bit(lefts, element) {
    return function () {
        element.innerHTML = lefts[Math.floor(Math.random() * lefts.length)];
    }
}

// TODO: non-stupid separation of concerns/API for the search feature vs. the table.
// Probably would be a lot better if the table is rendered first and returns the name_id_map and highlight_table_row_and_render_song.
// It's also smelly that song_map... exists.
function tabulate_song_map_and_search(songs, song_map, song_container, table_container, input_elt, left_bit_updater, lang_getter) {
    // map<int, tuple<DomElement, void()>>
    let table_and_render = {};
    let max_song_id = 0;
    function highlight_table_row_and_render_song(song_id, update_search) {
        if (song_id > max_song_id) {
            song_id = max_song_id;
        }
        if (song_id < 1) {
            song_id = 1;
        }

        table_and_render[song_id][1]();
        Array.prototype.forEach.call(document.querySelectorAll('.sentaku-kyoku'), (elem) => {
            elem.classList.remove('sentaku-kyoku');
        });
        table_and_render[song_id][0].classList.add('sentaku-kyoku');
        left_bit_updater();
        window.location.hash = '#song-' + song_id;
        if (!update_search) return;
        input_elt.value = songs[song_id - 1].name[lang_getter()];
    }

    let name_id_map = {};

    let table_elt = document.createElement('table');
    let table_header = document.createElement('tr');
    for (const script of Object.keys(song_map)) {
        let script_heading = document.createElement('th');
        script_heading.textContent = script;
        table_header.appendChild(script_heading);
        for (const title of Object.keys(song_map[script])) {
            let song_id = song_map[script][title][1];
            max_song_id = song_id;
            // TODO: worry about cross-lingual collisions?
            name_id_map[title] = song_id;
            if (!table_and_render[song_id]) table_and_render[song_id] = [document.createElement('tr'), song_map[script][title][0]];
            // Enclose over for-loop vars to capture a copy instead of whatever is last.
            let td_elt_maker = function(title, song_id, table_and_render) {
                let td_elt = document.createElement('td');
                td_elt.textContent = title;
                td_elt.addEventListener('click', function() {
                    highlight_table_row_and_render_song(song_id, true);
                });
                table_and_render[song_id][0].appendChild(td_elt);
            }
            td_elt_maker(title, song_id, table_and_render);
        }
    }
    table_elt.appendChild(table_header);
    for (const id of Object.keys(table_and_render)) {
        table_elt.appendChild(table_and_render[id][0]);
    }
    table_container.appendChild(table_elt);

    input_elt.addEventListener('input', () => {
        let id = name_id_map[input_elt.value];
        if (!id) {
            song_container.innerHTML = "Please finish entering your input. 検索を待ちます〜";
            return;
        }
        highlight_table_row_and_render_song(id, false);
    });

    function hash_change_handler() {
        if (!window.location.hash.startsWith('#song-')) return;
        const hash_song_id = parseInt(window.location.hash.substring(6));
        if (isNaN(hash_song_id)) return;
        highlight_table_row_and_render_song(hash_song_id, true);
    }
    window.addEventListener("hashchange", (e) => hash_change_handler());
    hash_change_handler();

}

function draw_from_json() {
    const request = new Request("jpop-ongaku-jouhou.json");
    fetch(request)
        .then(response => response.json())
        .then(data => {
            let song_container = document.getElementById("song-container");
            let song_map = {};
            // Off-by-one for a hack in the failure of a search.
            let i = 1;
            for (const song of data.songs) {
                const renderer = render_song(song, song_container);
                for (const script of song.scripts) {
                    if (!song_map[script]) song_map[script] = {};
                    song_map[script][song.name[script]] = [renderer, i];
                }
                i++;
            }
            const left_draw = draw_left_bit(data.left_bit, document.getElementById("the-left-bit"));
            left_draw();
            let get_lang = draw_language_options(song_map, document.getElementById("gengo-erabi"), document.getElementById("kyoku-risuto"));
            tabulate_song_map_and_search(data.songs, song_map, song_container, document.getElementById("table-container"), document.getElementById("kyoku-kensaku"), left_draw, get_lang);
        })
        .catch(console.error);
}

draw_from_json();
