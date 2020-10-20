let { mdLinks } = require('./mdLinks');
const { argv } = require('process');
const path = argv[2];
const fs = require('fs');
const options = {
    validate: argv.includes("--validate"),
    stats: argv.includes("--stats")
};

mdLinks(path, true)
    .then(dataLinks => {
        cli(dataLinks, options)
    });

function cli(data, options) {
    const totalLinks = data.length;
    let unique = [];
    let objLinks = {};
    for (let i = 0; i < data.length; i++) {
        objLinks[data[i].href] = 0;
    }
    for (i in objLinks) {
        unique.push(i);
    }
    totalUnique = unique.length;


    if (options.validate == false && options.stats == false) {
        let linksOption1 = [];
        data.forEach(link => {
            let { href: href, text: text, file: file } = link
            linksOption1.push({ href, text, file })
        });
        console.log(linksOption1);
    }
    if (options.validate == true && options.stats == false) {
        console.log(data);
        //retorna array de objetos con props: href, text, file, status, y ok
    }
    if (options.validate == false && options.stats == true) {
        console.log("Total Links: " + totalLinks);
        console.log("Links Unique: " + totalUnique);


        //retorna string con: Total = total de links encontrados, Unique= links unicos encontrados
    }
    if (options.validate == true && options.stats == true) {
        let countBrokenLinks = 0;

        data.forEach(link => {
            if (link.statusCode >= 400) {
                countBrokenLinks += 1
            }
        });

        console.log("Total Links: " + totalLinks);
        console.log("Links Unique: " + totalUnique);
        console.log("Broken Links: " + countBrokenLinks);
        //retorna string con total de links encontrados, links unicos encontrados, links rotos encontrados
    }
}