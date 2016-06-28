self.addEventListener('message', function(e) {
  var data = e.data;
  switch (data.cmd) {
    case 'start':
      self.postMessage('WORKER STARTED: ' + data.msg);
      break;
    case 'stop':
      self.postMessage('WORKER STOPPED: ' + data.msg +
                       '. (buttons will no longer work)');
      self.close(); // Terminates the worker.
      break;
    default:
      self.postMessage('Unknown command: ' + data.msg);
  };
}, false);
/**
 * 
Due to their multi-threaded behavior, web workers only has access to a subset of JavaScript's features:
.The navigator object
.The location object (read-only)
.XMLHttpRequest
.setTimeout()/clearTimeout() and setInterval()/clearInterval()
.The Application Cache
.Importing external scripts using the importScripts() method
.Spawning other web workers

Workers do NOT have access to:
.The DOM (it's not thread-safe)
.The window object
.The document object
.The parent object
*/