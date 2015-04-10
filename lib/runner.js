
var webdriverio = require('webdriverio');
var options = {
  desiredCapabilities: {
    browserName: 'firefox'
  }
};
webdriverio
  .remote(options)
  .init()
  .url('http://www.google.com')
  .execute(function(done) {
    // browser context - you may not access neither client nor console
    return window.performance.timing;
  }, function(err, ret) {
    // node.js context - client and console are available
    console.log(ret.value); // outputs: 10
  })
  .end();