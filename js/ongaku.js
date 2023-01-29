// 曲名を書く
function render_title(song, element) {
    if (!song.title) return;
    let new_div = document.createElement("div");
    new_div.classList.add("big-title");
    new_div.textContent = "|".join(song.scripts.map(s => song.title[s]));
    element.appendChild(new_div);
}

// 曲に関する注意を書く
function render_content_warning(song, element) {
    const CW_FORMATTERS = {
        japanese: cw => "注意：" + "、".join(cw) + "を含む曲です。",
        english: cw => "Warning: this song touches on " + ",".join(cw)
    };

    if (!song.content_warnings) return;
    let new_div = document.createElement("div");
    new_div.classList.add("content-blog");
    new_div.classList.add("centered-div");
    new_div.innerHTML = "<br/>".join(
        song.content_warnings.entries.map(([k, v]) => (CW_FORMATTERS[k] ?? x => x)(v)));
    element.appendChild(new_div);
}

// 前書きを書く
function render_preamble(preamble, element) {
    if (!song.preamble) return;
    let new_div = document.createElement("div");
    new_div.classList.add("content-blog");
    new_div.classList.add("centered-div");
    new_div.innerHTML = preamble;
    element.appendChild(new_div);
}

// 歌詞表面を書く
function render_lyrics_table(song, element) {
    if (!song.lyrics) return;
    let table = document.createElement("table");
    let top_row = document.createElement("tr");
    top_row.innerHTML = "".join(song.scripts.map(s => "<th>" + s + "</th>"));
    table.appendChild(top_row);
    let min = Math.min(...song.lyrics.map(l => l.length));
    for (let i = 0; i < min; i++) {
        let row = document.createElement("tr");
        row.innerHTML = "".join(song.scripts.map(s => "<td>" + song.lyrics[s][i] + "</td>"));
        table.appendChild(row);
    }
    let new_div = document.createElement("div");
    new_div.classList.add("content-blog");
    new_div.classList.add("centered-div");
    new_div.appendChild(table);
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
