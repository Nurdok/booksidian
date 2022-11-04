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
};

function formatList(list) {
    return list.map(
        function (element) {
            return `[[${element}]]`;
        }
    ).join(", ");
}


export {getStorageValue};