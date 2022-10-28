import {populateTemplate} from "../template.js";
import {DEFAULT_OPTIONS} from "./consts.js";
import {getStorageValue} from "../utils.js";


function getMovieFromImdb() {
    let movie = new Object();
    movie.title  = document.getElementsByClassName('sc-b73cd867-0')[0].innerText.trim();
    return movie;
}

async function readOptionsFromStorage() {
    return {
        vault: (await getStorageValue({vault_imdb: DEFAULT_OPTIONS.vault})).vault_imdb,
        file_location:  (await getStorageValue({file_location_imdb: DEFAULT_OPTIONS.file_location})).file_location_imdb,
        note_title: (await getStorageValue({note_title_imdb: DEFAULT_OPTIONS.note_title})).note_title_imdb,
        note_content: (await getStorageValue({note_content_imdb: DEFAULT_OPTIONS.note_content})).note_content_imdb,
    }
}

const IMDB_HANDLER = {siteAction: getMovieFromImdb, readOptionsFromStorage}

export {IMDB_HANDLER}
