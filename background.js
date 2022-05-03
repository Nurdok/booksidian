import {HANDLERS} from './consts.js';

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
    const uri = await handler.handler.getObsidianUri(siteActionResult);
    chrome.tabs.create({url: uri});
}

chrome.action.onClicked.addListener(handleBrowserButtonClick);
