// Saves options to chrome.storage
function save_options() {
  var api_key = document.getElementById('api_key').value;
  chrome.storage.sync.set({
    ffsungpt_api_key: api_key,
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    ffsungpt_api_key: '',
  }, function(items) {
    document.getElementById('api_key').value = items.ffsungpt_api_key;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);
