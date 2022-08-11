import {populateTemplate} from "../template.js";
import {DEFAULT_OPTIONS} from "./consts.js";
import {getStorageValue} from "../utils.js";


function getVideoFromYoutube() {
    console.log("called getVideoFromYoutube");
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
    const {vault, } = await getStorageValue({vault: DEFAULT_OPTIONS.vault_yt});
    const {file_location, } = await getStorageValue({file_location: DEFAULT_OPTIONS.file_location_yt});
    const {note_title, } = await getStorageValue({note_title_yt: DEFAULT_OPTIONS.note_title_yt});
    const {note_content, } = await getStorageValue({note_content_yt: DEFAULT_OPTIONS.note_content_yt});

    let o = {
        vault, file_location, note_title, note_content
    }
    console.log(o);
    return o;
}


const YOUTUBE_HANDLER = {siteAction: getVideoFromYoutube, readOptionsFromStorage}

export {YOUTUBE_HANDLER}
