// 曲名を書く
function render_title(title, element) {
    let new_div = document.createElement("div");
    new_div.classList.add("big-title");
    new_div.textContent = title.japanese + "|" + title.romaji + "|" + title.japanese;
    element.appendChild(new_div);
}

// 曲に関する注意を書く
function render_content_warning(cw, element) {
    let new_div = document.createElement("div");
    new_div.classList.add("content-blog");
    new_div.classList.add("centered-div");
    let japanese_cw = "注意：" + "、".join(cw.japanese) + "を含む曲です。"
    let english_cw = "Warning: this song touches on " + ",".join(cw.english);
    new_div.textContent = japanese_cw + "<br/>" + english_cw;
    element.appendChild(new_div);
}

// 前書きを書く
function render_preamble(preamble, element) {
    let new_div = document.createElement("div");
    new_div.classList.add("content-blog");
    new_div.classList.add("centered-div");
    new_div.innerHTML = preamble;
    element.appendChild(new_div);
}

// 歌詞表面を書く
function render_lyrics_table(song, element) {

}

// JSONを読んでHTMLを書く
function render_song(song, element) {
    render_title(song.name, element);
    if (song.content_warning !== undefined) {
        render_content_warning(song.content_warning, element);
    }
    if (song.preamble !== undefined) {
        render_preamble(song.preamble, element);
    }
}
