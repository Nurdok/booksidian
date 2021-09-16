function GetObsidianUri() {
    let book_title = document.getElementById("bookTitle").innerText.trim();
    let authors = new Array();
    document.querySelectorAll(".authorName span").forEach(function(elm) {
        authors.push(elm.innerText);
    });
    let formatted_authors = authors.map(function(author) {
        return `[[${author}]]`;
    }).join(", ")
    let nl = "%0A";
    let hash = "%23";
    let content = `---${nl}tags:${nl}- book${nl}${nl}---${nl}${hash} ${book_title}${nl}By ${formatted_authors}`;
    let obsidian_uri = `obsidian://new?vault=notes&name=${book_title}&content=${content}`;
    console.log(obsidian_uri);
    return obsidian_uri;
}

function handleBrowserButtonClick(tab) {
    chrome.scripting.executeScript(
        {
            target: {tabId: tab.id},
            func: GetObsidianUri,
        },
        (results) => {
            var uri = results[0].result;
            chrome.tabs.create({url: uri});
        });
}

chrome.action.onClicked.addListener(handleBrowserButtonClick);
