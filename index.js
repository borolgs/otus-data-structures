const fs = require('fs');
const loader = require('@assemblyscript/loader');
const createTable = require('markdown-table');

loader
  .instantiate(fs.readFileSync(__dirname + '/build/untouched.wasm'), {
    console: {
      log(messagePtr) {
        console.log(exports.__getString(messagePtr));
      },
    },
  })
  .then((module) => {
    exports = module.exports;
    if (process.argv[2] === 'a') {
      const result = createTable(
        exports.__getArray(exports.test(10000)).map((arr) => exports.__getArray(arr).map(exports.__getString))
      );
      console.log(result);
    } else {
      exports.test();
    }
  })
  .catch((e) => {
    console.error(e);
  });
