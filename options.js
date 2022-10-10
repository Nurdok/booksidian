import {populateTemplate} from "./template.js";
import {DEFAULT_OPTIONS as DEFAULT_OPTIONS_GR} from "./goodreads/consts.js";
import {DEFAULT_OPTIONS as DEFAULT_OPTIONS_YT} from "./youtube/consts.js";


function getFakeBook() {
    let book = new Object();
    book.short_title = "Good Omens";
    book.full_title = "Good Omens: The Nice and Accurate Prophecies of Agnes Nutter, Witch\n";
    book.formatted_authors = "[[Terry Pratchett]], [[Neil Gaiman]]";
    book.publication_year = "2006";
    book.cover_image_url = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1615552073l/12067.jpg";
    book.cover_image = `![](${book.cover_image_url})`;
    book.abstract = "‘Armageddon only happens once, you know. They don’t let you go around again until you get it right.’\nPeople have been predicting the end of the world almost from its very beginning, so it’s only natural to be sceptical when a new date is set for Judgement Day. But what if, for once, the predictions are right, and the apocalypse really is due to arrive next Saturday, just af ...more\n"
    book.series = "Prophecies #3";
    book.rating = "4.24";
    book.rating_count = 620758;
    book.total_pages = "491 pages";
    book.isbn13 = "9780060853983";
    return book;
}

function getFakeVideo() {
    let video = new Object();
    video.short_title = "Coffee";
    video.full_title = "Coffee: The Greatest Addiction Ever";
    video.channel = "CGP Grey";
    return video;
}

function onNoteTitleInputChangeGoodreads() {
    let note_title = document.getElementById('note_title').value;
    let preview = document.getElementById('note_title_preview');
    preview.value = populateTemplate(note_title, getFakeBook());
}

function onNoteContentInputChangeGoodreads() {
    let note_content = document.getElementById('note_content').value;
    let preview = document.getElementById('note_content_preview');
    preview.value = populateTemplate(note_content, getFakeBook());
}

function onNoteTitleInputChangeYouTube() {
    let note_title = document.getElementById('note_title_yt').value;
    let preview = document.getElementById('note_title_preview_yt');
    preview.value = populateTemplate(note_title, getFakeVideo());
}

function onNoteContentInputChangeYouTube() {
    let note_content = document.getElementById('note_content_yt').value;
    let preview = document.getElementById('note_content_preview_yt');
    preview.value = populateTemplate(note_content, getFakeVideo());
}

// Saves options to chrome.storage
function saveOptionsToStorage() {
    let vault = document.getElementById('vault').value;
    let file_location = document.getElementById('file_location').value;
    let note_title = document.getElementById('note_title').value;
    let note_content = document.getElementById('note_content').value;

    let vault_yt = document.getElementById('vault-yt').value;
    let file_location_yt = document.getElementById('file_location_yt').value;
    let note_title_yt = document.getElementById('note_title_yt').value;
    let note_content_yt = document.getElementById('note_content_yt').value;

    let keys_to_set = {
        vault, file_location, note_title, note_content, vault_yt, file_location_yt, note_title_yt, note_content_yt
    };

    chrome.storage.sync.set(keys_to_set, function() {
        // Update status to let user know options were saved.
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function setFormValues(items) {
    document.getElementById('vault').value = items.vault;
    document.getElementById('file_location').value = items.file_location;
    document.getElementById('note_title').value = items.note_title;
    document.getElementById('note_content').value = items.note_content;

    document.getElementById('vault-yt').value = items.vault_yt;
    document.getElementById('file_location_yt').value = items.file_location_yt;
    document.getElementById('note_title_yt').value = items.note_title_yt;
    document.getElementById('note_content_yt').value = items.note_content_yt;


    // Trigger the previews, since changing the values in code doesn't seem to
    // trigger the event listeners).
    onNoteTitleInputChangeGoodreads();
    onNoteContentInputChangeGoodreads();
    onNoteTitleInputChangeYouTube();
    onNoteContentInputChangeYouTube();
}

function getOptionDefaults() {
    return {
        ...DEFAULT_OPTIONS_GR,
        ...DEFAULT_OPTIONS_YT,
    }
}

function restoreOptionsFromDefaults() {
    setFormValues(getOptionDefaults());
}

function restoreOptionsFromStorage() {
    chrome.storage.sync.get(getOptionDefaults(), setFormValues);
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('save').addEventListener('click', saveOptionsToStorage);
    document.getElementById('restore_defaults').addEventListener('click', restoreOptionsFromDefaults);

    let note_title_elm_gr = document.getElementById('note_title');
    note_title_elm_gr.addEventListener('input', onNoteTitleInputChangeGoodreads);

    let note_content_elm_gr = document.getElementById('note_content');
    note_content_elm_gr.addEventListener('input', onNoteContentInputChangeGoodreads);

    let note_title_elm_yt = document.getElementById('note_title_yt');
    note_title_elm_yt.addEventListener('input', onNoteTitleInputChangeYouTube);

    let note_content_elm_yt = document.getElementById('note_content_yt');
    note_content_elm_yt.addEventListener('input', onNoteContentInputChangeYouTube());

    restoreOptionsFromStorage();

    document.querySelectorAll(".booksidian_template").forEach(function(elm) {
        elm.innerHTML = `<code>${populateTemplate(elm.textContent, getFakeBook())}</code>`;
    })

    document.querySelectorAll(".booksidian_template_yt").forEach(function(elm) {
        elm.innerHTML = `<code>${populateTemplate(elm.textContent, getFakeVideo())}</code>`;
    })

    const note_content_preview_elm_gr = document.getElementById("note_content_preview");
    const resizeObserverGoodreads = new ResizeObserver(() => {
        note_content_preview_elm_gr.style.height = note_content_elm_gr.offsetHeight + "px";
        note_content_preview_elm_gr.style.width = note_content_elm_gr.offsetWidth + "px";
    });
    resizeObserverGoodreads.observe(note_content_elm_gr);

    const note_content_preview_elm_yt = document.getElementById("note_content_preview_yt");
    const resizeObserverYouTube = new ResizeObserver(() => {
        note_content_preview_elm_yt.style.height = note_content_elm_yt.offsetHeight + "px";
        note_content_preview_elm_yt.style.width = note_content_elm_yt.offsetWidth + "px";
    });
    resizeObserverYouTube.observe(note_content_elm_yt);
});


