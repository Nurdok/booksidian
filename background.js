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


function populateTemplate(template, book) {
    return template.replaceAll(/\{\{\s*(\w+)\s*\}\}/g, function(match, property, offset, string) {
        if (book.hasOwnProperty(property)) {
            return book[property];
        } else {
            return property;
        }
    });
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
    book.formatted_authors = book.authors.map(function(author) {
        return `[[${author}]]`;
    }).join(", ");
    document.querySelectorAll("#details .row").forEach(function(node) {
        if (node.innerText.includes("Published")) {
            book.publication_year = node.innerText.match(/\d{4}/)[0];
        }
    });

    return book;
}

async function getStorageValue(key) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get(key, function (value) {
                resolve(value);
            })
        }
        catch (ex) {
            reject(ex);
        }
    });
}

async function getObsidianUri(book) {
    const {vault, } = await getStorageValue({vault: 'notes'});
    const {note_title, } = await getStorageValue({note_title: 'notes'});
    let title = populateTemplate(note_title, book);
    let content = dedent(`
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
    `);
    content = populateTemplate(content, book);
    content = content.replaceAll('\n', '%0A');
    content = content.replaceAll('#', '%23');
    let obsidian_uri = `obsidian://new?vault=${vault}&name=${title}&content=${content}`;
    console.log(obsidian_uri);
    return obsidian_uri;
}

async function handleBrowserButtonClick(tab) {
    results = await chrome.scripting.executeScript(
        {
            target: {tabId: tab.id},
            func: getBookFromGoodreads,
        });

    console.log(results)

    const book = results[0].result;
    const uri = await getObsidianUri(book);
    chrome.tabs.create({url: uri});
}

chrome.action.onClicked.addListener(handleBrowserButtonClick);
