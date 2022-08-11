import {HANDLERS} from './consts.js';
import {populateTemplate} from "./template.js";

function getObsidianUri(obj, options) {
    console.log(obj);
    console.log(options);
    let title = populateTemplate(options.note_title, obj);
    let content = populateTemplate(options.note_content, obj);
    let file_location = options.file_location
    if (!file_location.endsWith('/')) {
        file_location += '/';
    }
    let vault = options.vault;
    let e = encodeURIComponent;  // For convenience.
    let obsidian_uri = `obsidian://new?vault=${e(vault)}&file=${e(file_location)}${e(title)}&content=${e(content)}`;
    return obsidian_uri;
}

function getHandler(url) {
    for (const site in HANDLERS) {
        if (url.includes(HANDLERS[site].url)) {
            return HANDLERS[site];
        }
    }
    return null;
}

async function handleBrowserButtonClick(tab) {
    const handler = getHandler(tab.url);
    if (handler === null) {
        return;
    }
    const results = await chrome.scripting.executeScript(
        {
            target: {tabId: tab.id},
            func: handler.handler.siteAction,
        });


    const siteActionResult = results[0].result;
    const uri = getObsidianUri(siteActionResult, await handler.handler.readOptionsFromStorage());
    console.log(uri);
    chrome.tabs.create({url: uri});
}

chrome.action.onClicked.addListener(handleBrowserButtonClick);
