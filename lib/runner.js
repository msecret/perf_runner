var fs = require('fs');

var webdriver = require('selenium-webdriver')

/**
 *
 * Options:
 *   server command to run
 *   browser: [] or string
 *   url
 *   _ command to get perf things from, would have to be a function somehow
 *   _ where and how to output. to a db, text file, some other way. for now stdout
 */

var _browserCollector = function(store, done) {
  var perf = {};
  perf.timings = window.performance.timing;
  perf.marks = window.performance.getEntriesByType('mark');
  store.perf = perf;
  console.log(perf);
  done(perf);
  return perf;
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
