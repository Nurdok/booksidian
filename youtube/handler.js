import {DEFAULT_OPTIONS} from "./consts.js";
import {getStorageValue} from "../utils.js";


function getVideoFromYoutube() {
    let video = new Object();
    let metadata = document.getElementsByClassName('watch-active-metadata')[0];
    video.full_title = metadata.getElementsByClassName("title")[0].childNodes[0].innerText.trim();
    let [short_title, ...title_tag] = video.full_title.split(/[*"\/\\<>:|?]+/)
    video.short_title = short_title
    video.title_tag = title_tag.join(' ')
    video.channel = metadata.getElementsByClassName('ytd-channel-name')[0].
        getElementsByClassName('yt-formatted-string')[0].innerText.trim();
    return video;
}

async function readOptionsFromStorage() {
    return {
        vault: (await getStorageValue({vault_yt: DEFAULT_OPTIONS.vault_yt})).vault_yt,
        file_location:  (await getStorageValue({file_location_yt: DEFAULT_OPTIONS.file_location_yt})).file_location_yt,
        note_title: (await getStorageValue({note_title_yt: DEFAULT_OPTIONS.note_title_yt})).note_title_yt,
        note_content: (await getStorageValue({note_content_yt: DEFAULT_OPTIONS.note_content_yt})).note_content_yt,
    }
}

const YOUTUBE_HANDLER = {siteAction: getVideoFromYoutube, readOptionsFromStorage}

export {YOUTUBE_HANDLER}
