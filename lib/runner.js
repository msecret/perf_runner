var fs = require('fs');

var webdriver = require('selenium-webdriver')


var _browserCollector = function(store, done) {
  var perf = {};
  perf.timings = window.performance.timing;
  perf.marks = window.performance.getEntriesByType('mark');
  store.perf = perf;
  console.log(perf);
  done(perf);
  return perf;
};

var setupDriver = function(browserStr) {
  console.log('setupdriver');
  var driver = new webdriver.Builder()
    .forBrowser(browserStr)
    .build();
  return driver;
};

var setupPage = function(driver) {
  console.log('setuppage');
  return driver;
};

var collectInformation = function(driver) {
  console.log('startcollect');
  var store = {};
  try {
    var result = driver.executeScript(_browserCollector, store);
  } catch(err) {
    console.error(err);
    process.exit(0);
  }
  console.log('endcollect');
  return store;
};

//main
var store = {};
//var driver = setupDriver('chrome');
var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();
driver.get('http://127.0.0.1:3000/');
driver.getTitle().then(function(title) {
  console.log('Page title is: ' + title);
});
//driver.setAsyncScriptTimeout(8000);
driver.manage().timeouts().setScriptTimeout(8000);
var result = driver.executeAsyncScript(_browserCollector, store).then(function(err, data) {
  console.log(err);
  console.log(data);
  console.log(store);
  driver.quit();
});




/*
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
*/
