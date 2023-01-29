// 曲名を書く
function render_title(song, element) {
    if (!song.name) return;
    let new_div = document.createElement("div");
    new_div.classList.add("big-title");
    new_div.classList.add("content-blog");
    new_div.textContent = song.scripts.map(s => song.name[s]).join("|");
    element.appendChild(new_div);
}

// 曲に関する注意を書く
function render_content_warning(song, element) {
    function format_cw([lang, warnings]) {
        const CW_FORMATTERS = {
            japanese: cw => "\u6ce8\u610f\uff1a" + cw.join("\u3001") + "\u3092\u542b\u3080\u66f2\u3067\u3059\u3002",
            english: cw => "Warning: this song touches on " + cw.join(",")
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

// JSONを読んでHTMLを書く
function render_song(song, element) {
    render_title(song, element);
    render_content_warning(song, element);
    render_preamble(song, element);
    render_lyrics_table(song, element);
}

function draw_from_json() {
    const request = new Request("jpop-ongaku-jouhou.json");
    fetch(request)
        .then(response => response.json())
        .then(data => {
            let song_container = document.getElementById("song-container");
            for (const song of data.songs) {
                let new_div = document.createElement("div");
                render_song(song, new_div);
                song_container.appendChild(new_div);
            }
            const lefts = data.left_bit;
            document.getElementById("the-left-bit").innerHTML = lefts[Math.floor(Math.random() * lefts.length)];
        })
        .catch(console.error);
}

draw_from_json();
