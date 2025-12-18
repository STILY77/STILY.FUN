// get your own last.fm api key from https://www.last.fm/api/account/create
const LASTFM_API_KEY = "fe1edfe57f5e201b647470b7ad5d47f9";
const username = "STILY77"; // change username here
const url = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&format=json&extended=true&api_key=" + LASTFM_API_KEY + "&limit=1&user=" + username;
const fallbackCover = "decor/blacksparkle.gif";

function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function relativeTime(time, time_text) {
    var time_now = Math.round(Date.now() / 1000);
    var time_diff = time_now - time;

    let SEC_IN_MIN = 60;
    let SEC_IN_HOUR = SEC_IN_MIN * 60;
    let SEC_IN_DAY = SEC_IN_HOUR * 24;

    if (time_diff < SEC_IN_HOUR) {
        let minutes = Math.round(time_diff / SEC_IN_MIN);
        return minutes + " minute" + ((minutes !== 1) ? "s" : "") + " ago";
    }
    if (time_diff >= SEC_IN_HOUR && time_diff < SEC_IN_DAY) {
        let hours = Math.round(time_diff / SEC_IN_HOUR);
        return hours + " hour" + ((hours !== 1) ? "s" : "") + " ago";
    }
    if (time_diff >= SEC_IN_DAY) {
        return time_text;
    }
}

function renderFallback(message) {
    var trackElem = document.getElementById("track");
    var artistElem = document.getElementById("artist");
    var dateElem = document.getElementById("date");
    var albumcoverElem = document.getElementById("album-cover");

    if (trackElem) trackElem.textContent = "Нет данных";
    if (artistElem) artistElem.textContent = "";
    if (dateElem) dateElem.textContent = message || "—";
    if (albumcoverElem) albumcoverElem.src = fallbackCover;
}

try {
    var json = JSON.parse(httpGet(url));
    var tracks = json && json.recenttracks && json.recenttracks.track;
    if (!tracks || tracks.length === 0) {
        renderFallback("Нет прослушиваний");
        return;
    }

    var last_track = Array.isArray(tracks) ? tracks[0] : tracks;
    if (!last_track || !last_track.name || !last_track.artist) {
        renderFallback("Нет данных");
        return;
    }

    var track = last_track.name;
    var trackLink = last_track.url || "#";
    var artistLink = (last_track.artist && last_track.artist.url) ? last_track.artist.url : "#";
    var artist = last_track.artist && last_track.artist.name ? last_track.artist.name : "";
    var relative_time = null;
    if (last_track.date) {
        var unix_date = last_track.date.uts;
        var date_text = last_track.date["#text"];
        relative_time = relativeTime(unix_date, date_text);
    }
    var imageLink = (last_track.image && last_track.image[1] && last_track.image[1]["#text"]) ? last_track.image[1]["#text"] : fallbackCover;
    var loved = last_track.loved === "1";

    var trackElem = document.getElementById("track");
    var artistElem = document.getElementById("artist");
    var dateElem = document.getElementById("date");
    var albumcoverElem = document.getElementById("album-cover");

    if (!trackElem || !artistElem || !dateElem || !albumcoverElem) return;

    var trackLinkElem = document.createElement("a");
    trackLinkElem.id = "track";
    trackLinkElem.href = trackLink;
    trackLinkElem.target = "_blank";
    trackLinkElem.textContent = track;

    var artistLinkElem = document.createElement("a");
    artistLinkElem.id = "artist";
    artistLinkElem.href = artistLink;
    artistLinkElem.target = "_blank";
    artistLinkElem.textContent = artist;

    var heartSpan = document.createElement("span");
    heartSpan.id = "heart";
    heartSpan.textContent = loved ? " ♥" : "";

    var userLinkElem = document.createElement("a");
    userLinkElem.href = "https://www.last.fm/user/" + username;
    userLinkElem.target = "_blank";
    userLinkElem.textContent = (relative_time !== null) ? relative_time : "Now playing...";

    trackElem.textContent = "";
    artistElem.textContent = "";
    dateElem.textContent = "";

    trackElem.appendChild(trackLinkElem);
    trackElem.appendChild(heartSpan);
    artistElem.appendChild(artistLinkElem);
    dateElem.appendChild(userLinkElem);
    albumcoverElem.src = imageLink || fallbackCover;
} catch (e) {
    renderFallback("Ошибка загрузки");
}
