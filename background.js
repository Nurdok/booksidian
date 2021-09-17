//const nl = "%0A";  // #
//const hash = "%23";  // \n

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
    document.querySelectorAll("#details .row").forEach(function(node) {
    if (node.innerText.includes("Published")) {
        book.publication_year = node.innerText.match(/\d{4}/)[0];
    }
});

    return book;
}

function getObsidianUri(book) {
    let formatted_authors = book.authors.map(function(author) {
        return `[[${author}]]`;
    }).join(", ");

    let content = dedent(`
        ---
        tags:
        - book
        
        ---
        # ${book.short_title}
        
        | | |
        | - | - |
        | **Full title** | ${book.full_title} |
        | **Authors** | ${formatted_authors} |
        | **Publication Year** | ${book.publication_year} |
        | | |
    `);
    content = content.replaceAll('\n', '%0A');
    content = content.replaceAll('#', '%23');
    let obsidian_uri = `obsidian://new?vault=notes&name=${book.short_title}&content=${content}`;
    console.log(obsidian_uri);
    return obsidian_uri;
}

function handleBrowserButtonClick(tab) {
    chrome.scripting.executeScript(
        {
            target: {tabId: tab.id},
            func: getBookFromGoodreads,
        },
        (results) => {
            const book = results[0].result;
            const uri = getObsidianUri(book);
            chrome.tabs.create({url: uri});
        });
}

chrome.action.onClicked.addListener(handleBrowserButtonClick);
