import {populateTemplate} from "../template.js";
import {DEFAULT_OPTIONS} from "./consts.js";
import {getStorageValue} from "../utils.js";


function getMovieFromImdb() {
    let movie = new Object();
    movie.title  = document.getElementsByClassName('sc-b73cd867-0')[0].innerText.trim();
    let metadata = document.getElementsByClassName('sc-bfec09a1-8');
    movie.director = metadata[0].childNodes[0].childNodes[1].innerText.trim();
    movie.writers = [];
    metadata[0].childNodes[1].childNodes[1].childNodes[0].childNodes.forEach(
        function (element) {
            movie.writers.push(element.innerText.trim());
        });
    //TODO: make this a common util as this is used both for movie writers and book authors.
    movie.formatted_writers = movie.writers.map(function(writer) {
        return `[[${writer}]]`;
    }).join(", ");
    movie.plot_summary = document.getElementsByClassName('sc-132205f7-0')[0]
        .childNodes[0].innerText.trim();
    let cast_elements = document.getElementsByClassName('sc-bfec09a1-0')[0]
        .childNodes[1].childNodes[1].childNodes;
    movie.actors = [];
    cast_elements.forEach(
        function (element) {
            movie.actors.push(element.childNodes[1].childNodes[0].innerText.trim())
        })
    movie.formatted_actors = movie.actors.map(function(actor) {
        return `[[${actor}]]`;
    }).join(", ");
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
