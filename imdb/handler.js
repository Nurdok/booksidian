import {populateTemplate} from "../template.js";
import {DEFAULT_OPTIONS} from "./consts.js";
import {getStorageValue} from "../utils.js";


function getMovieFromImdb() {
    let movie = new Object();
}

async function readOptionsFromStorage() {
    return {
        vault: (await getStorageValue({vault: DEFAULT_OPTIONS.vault})).vault,
        file_location:  (await getStorageValue({file_location: DEFAULT_OPTIONS.file_location})).file_location,
        note_title: (await getStorageValue({note_title: DEFAULT_OPTIONS.note_title})).note_title,
        note_content: (await getStorageValue({note_content: DEFAULT_OPTIONS.note_content})).note_content,
    }
}

const GOODREADS_HANDLER = {siteAction: getBookFromGoodreads, readOptionsFromStorage}

export {GOODREADS_HANDLER}
