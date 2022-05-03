import {populateTemplate} from "./template.js";
import {DEFAULT_OPTIONS} from "./consts.js";
import {getStorageValue} from "../utils.js";


function getBookFromGoodreads() {
    let book = new Object();
    book.full_title = document.getElementById("bookTitle").innerText.trim();
    let split_title = book.full_title.split(":", 2);
    book.short_title = split_title[0];
    book.title_tag = split_title[1];
    book.authors = new Array();
    document.querySelectorAll(".authorName span").forEach(function(elm) {
        book.authors.push(elm.innerText);
    });
    book.formatted_authors = book.authors.map(function(author) {
        return `[[${author}]]`;
    }).join(", ");
    document.querySelectorAll("#details .row").forEach(function(node) {
        if (node.innerText.includes("Published") || node.innerText.includes("Expected publication")) {
            book.publication_year = node.innerText.match(/\d{4}/)[0];
        }
    });
    book.cover_image_url = document.getElementById("coverImage").getAttribute("src");
    book.cover_image = `![](${book.cover_image_url})`;
    book.abstract = document.getElementById("description").innerText;
    book.series = document.getElementById("bookSeries").innerText;
    book.rating = document.querySelector('[itemprop=ratingValue]').textContent;
    book.rating_count = document.querySelector('[itemprop=ratingCount]').content;
    try {
        book.total_pages = document.querySelector('[itemprop=numberOfPages]').textContent;
    }
    catch (error) {
        book.total_pages = null;
    }

    // Catch required as some books (such as test case) do not have this value
    try {
        book.isbn13 = document.querySelector('[itemprop=isbn]').textContent;
    }
    catch (error) {
        book.isbn13 = null;
    }
    return book;
}


async function getObsidianUri(book) {
    const {vault, } = await getStorageValue({vault: DEFAULT_OPTIONS.vault});
    let {file_location, } = await getStorageValue({file_location: DEFAULT_OPTIONS.file_location});
    const {note_title, } = await getStorageValue({note_title: DEFAULT_OPTIONS.note_title});
    const {note_content, } = await getStorageValue({note_content: DEFAULT_OPTIONS.note_content});
    let title = populateTemplate(note_title, book);
    let content = populateTemplate(note_content, book);
    if (!file_location.endsWith('/')) {
        file_location += '/';
    }
    let e = encodeURIComponent;  // For convenience.
    let obsidian_uri = `obsidian://new?vault=${e(vault)}&file=${e(file_location)}${e(title)}&content=${e(content)}`;
    return obsidian_uri;
}

const GOODREADS_HANDLER = {siteAction: getBookFromGoodreads, getObsidianUri}

export {GOODREADS_HANDLER}
