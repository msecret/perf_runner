var fs = require('fs');

var webdriverio = require('webdriverio');


var options = {
  desiredCapabilities: {
    browserName: 'firefox'
  }
};

function getFile() {
  var filePath = 'node_modules/perf-hunter/build/index.js';
  fs.readFile(filePath, 'utf8', function(err, fileData) {
    if (err) {
      console.warn('cannot read file');
      console.warn(err);
      return process.exit(1);
    }
    webdriverio
      .remote(options)
      .init()
      .url('http://www.google.com')
      .execute(function(scriptText, done) {
        // browser context - you may not access neither client nor console
        window.eval(scriptText);
        var perf = window.perfHunter.hunt(window);
        return perf;
      },fileData, function(err, ret) {
        // node.js context - client and console are available
        if (err) {
          console.warn('Running perf code failed');
          console.log(err);
          process.ext(1);
        }
        if (ret.value) {
          console.log(ret.value);
        }
      })
      .end();
  })
}
getFile();
