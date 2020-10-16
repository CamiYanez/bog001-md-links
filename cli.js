let { mdLinks } = require('./mdLinks');
const { argv } = require('process');
const path = argv[2];
const options = {
    validate: argv.includes("--validate"),
    stats: argv.includes("--stats")
};

mdLinks(path, true)
    .then(dataLinks => {
        console.log(dataLinks);
    });


function cli(path, options) {

    if (options.validate == false && options.stats == false) {
        //retorna array de objetos con props: href, text, file
    }
    if (options.validate == true && options.stats == false) {
        //retorna array de objetos con props: href, text, file, status, y ok
    }
    if (options.validate == false && options.stats == true) {
        //retorna string con: Total = total de links encontrados, Unique= links unicos encontrados
    }
    if (options.validate == true && options.stats == true) {
        //retorna string con total de links encontrados, links unicos encontrados, links rotos encontrados
    }
}