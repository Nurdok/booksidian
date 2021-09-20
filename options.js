// Saves options to chrome.storage
function save_options() {
    let vault = document.getElementById('vault').value;
    let note_title = document.getElementById('note_title').value;
    chrome.storage.sync.set({
      vault, note_title,
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
      note_title: '{{ book.short_title }} (book)'
    }, function(items) {
      document.getElementById('vault').value = items.vault;
        document.getElementById('note_title').value = items.note_title;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);