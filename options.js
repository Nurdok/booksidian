import {populateTemplate} from "./template.js";

function dedent(text) {
    let re_whitespace = /^([ \t]*)(.*)\n/gm;
    let l, m, i;
    while ((m = re_whitespace.exec(text)) !== null) {
        if (!m[2]) continue;
        if (l = m[1].length) {
            i = (i !== undefined) ? Math.min(i, l) : l;
        } else break;
    }
    if (i)
        text = text.replace(new RegExp('^[ \t]{' + i + '}(.*\n)', 'gm'), '$1');
    return text;
}

function getFakeBook() {
    let book = new Object();
    book.short_title = "Good Omens";
    book.full_title = "Good Omens: The Nice and Accurate Prophecies of Agnes Nutter, Witch\n";
    book.formatted_authors = "[[Terry Pratchett]], [[Neil Gaiman]]";
    book.publication_year = "2006";
    book.cover_image_url = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1615552073l/12067.jpg";
    book.cover_image = `![](${book.cover_image_url})`;
    book.abstract = "‘Armageddon only happens once, you know. They don’t let you go around again until you get it right.’\nPeople have been predicting the end of the world almost from its very beginning, so it’s only natural to be sceptical when a new date is set for Judgement Day. But what if, for once, the predictions are right, and the apocalypse really is due to arrive next Saturday, just af ...more\n"
    book.series = "Prophecies #3"
    return book;
}

function onNoteTitleInputChange() {
    let note_title = document.getElementById('note_title').value;
    let preview = document.getElementById('note_title_preview');
    preview.value = populateTemplate(note_title, getFakeBook());
}

function onNoteContentInputChange() {
    let note_content = document.getElementById('note_content').value;
    let preview = document.getElementById('note_content_preview');
    preview.value = populateTemplate(note_content, getFakeBook());
}

// Saves options to chrome.storage
function saveOptionsToStorage() {
    let vault = document.getElementById('vault').value;
    let file_location = document.getElementById('file_location').value;
    let note_title = document.getElementById('note_title').value;
    let note_content = document.getElementById('note_content').value;
    chrome.storage.sync.set({
        vault, file_location, note_title, note_content,
    }, function() {
        // Update status to let user know options were saved.
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function getDefaultOptions() {
    return {
        vault: 'notes',
        file_location: '',
        note_title: '{{ short_title }} (book)',
        note_content: dedent(`\
            ---
            tags:
            - book
            ---
            # {{ short_title }}
            
            | | |
            | - | - |
            | **Full title** | {{ full_title }} |
            | **Authors** | {{ formatted_authors }} |
            | **Publication Year** | {{ publication_year }} |
            | | |
        `),
    }
}

function setFormValues(items) {
    document.getElementById('vault').value = items.vault;
    document.getElementById('file_location').value = items.file_location;
    document.getElementById('note_title').value = items.note_title;
    document.getElementById('note_content').value = items.note_content;


    // Trigger the previews, since changing the values in code doesn't seem to
    // trigger the event listeners).
    onNoteTitleInputChange();
    onNoteContentInputChange();
}

function restoreOptionsFromDefaults() {
   setFormValues(getDefaultOptions());
}

function restoreOptionsFromStorage() {
    chrome.storage.sync.get(getDefaultOptions(), setFormValues);
}

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('save').addEventListener('click', saveOptionsToStorage);
    document.getElementById('restore_defaults').addEventListener('click', restoreOptionsFromDefaults);

    let note_title_elm = document.getElementById('note_title');
    note_title_elm.addEventListener('input', onNoteTitleInputChange);

    let note_content_elm = document.getElementById('note_content');
    note_content_elm.addEventListener('input', onNoteContentInputChange);

    restoreOptionsFromStorage();

    document.querySelectorAll(".booksidian_template").forEach(function(elm) {
        elm.innerHTML = `<code>${populateTemplate(elm.textContent, getFakeBook())}</code>`;
    })

    const note_content_preview_elm = document.getElementById("note_content_preview");

    const resizeObserver = new ResizeObserver(() => {
        note_content_preview_elm.style.height = note_content_elm.offsetHeight + "px";
        note_content_preview_elm.style.width = note_content_elm.offsetWidth + "px";
    });
    resizeObserver.observe(note_content_elm);

});


