const { vol, fs } = require('memfs');
const path = '/app'
const testFiles = vol.fromJSON(
    {
        './README.md': '[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado ligero muy popular entre developers.',
        './src/index.js': '2',
        './pruebas.js': '3',
    },
    path
);

module.exports = { path, testFiles };


// console.log(fs.readdirSync("/app"));
// console.log(fs.readFileSync('/app/README.md', 'utf8'));

// fs.stat(path, (err, stats) => {
//     if (err) { throw Error }
//     console.log(stats.isDirectory());
// });

