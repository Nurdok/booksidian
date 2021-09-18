// Saves options to chrome.storage
function save_options() {
    var vault = document.getElementById('vault').value;
    chrome.storage.sync.set({
      vault,
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  function restore_options() {
    chrome.storage.sync.get({
      vault: 'notes',
    }, function(items) {
      document.getElementById('vault').value = items.vault;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click',
      save_options);