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

// Saves options to chrome.storage
function save_options() {
    let vault = document.getElementById('vault').value;
    let note_title = document.getElementById('note_title').value;
    let note_content = document.getElementById('note_content').value;
    chrome.storage.sync.set({
        vault, note_title, note_content,
    }, function() {
        // Update status to let user know options were saved.
        let status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        vault: 'notes',
        note_title: '{{ book.short_title }} (book)',
        note_content: dedent(`
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
    }, function(items) {
        document.getElementById('vault').value = items.vault;
        document.getElementById('note_title').value = items.note_title;
        document.getElementById('note_content').value = items.note_content;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);