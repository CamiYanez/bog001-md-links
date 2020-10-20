module.exports = {
    mdLinks,
    isDirectory,
    validateExtDir,
    validateExtFile,
    dataLinks,
    httpRequest,
    httpCallback,
    httpErrorCallback
}

const fs = require('fs');
const pathModule = require('path')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const MarkdownIt = require('markdown-it')
const https = require('https');
const http = require('http');

function mdLinks(path, validate) {
    return isDirectory(path)
        .then((directory) => {
            if (directory) {
                return validateExtDir(path)
            } else {
                return validateExtFile(path)
            }
        }).then(paths => {
            return (dataLinks(paths));
        }).then(data => {
            if (validate) {
                return (httpRequest(data, httpCallback, httpErrorCallback))
            } else {
                return (data);
            }
        })
}

//Valida si la ruta existe y si es un directorio resuelve true
function isDirectory(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                return reject(new Error("la ruta ingresada no existe, por favor verifica y vuelve a intentarlo"));
            }
            resolve(stats.isDirectory())
        })
    })
}

//Verifica cuales archivos del directorio tienen la extensión .md y resuelve un array con las rutas de todos los archivos encontrados con dicha ext 
function validateExtDir(path) {
    return new Promise((resolve, reject) => {
        const sources = [];
        fs.readdir(path, (err, files) => {
            files.forEach(file => {
                if (pathModule.extname(file) === ".md") {
                    const src = path + "\\" + file
                    sources.push(src);
                }
            });
            resolve(sources);
        })
    })
}

//Valida que el archivo tenga extensión .md y de ser así resuelve la ruta del archivo
function validateExtFile(path) {
    return new Promise((resolve, reject) => {
        if (pathModule.extname(path) !== ".md") {
            return reject(new Error("El archivo tiene una extensión incorrecta, recuerda que el archivo debe ser de extension .md"))
        }
        resolve([path]);
    })
}


//Función para leer archivo, extraer links y armar arr de objetos de cada link con las propiedades href, text, y file, resuelve el array de objetos
function dataLinks(files) {
    const arrLinks = [];
    return new Promise((resolve, reject) => {
        files.forEach((file, index) => {
            fs.readFile(file, (err, data) => {
                if (err) {
                    return reject(new Error("Ha ocurrido un error"))
                }
                callbackDatalinks(data, file, arrLinks)
                if ((files.length - 1) === index) {
                    resolve(arrLinks);
                }
            })
        });
    })
}

function callbackDatalinks(data, file, arrLinks) {
    const md = new MarkdownIt();
    const tokens = md.render(data.toString());
    const dom = new JSDOM(tokens);
    const links = dom.window.document.querySelectorAll("a");
    links.forEach(link => {
        if (link.href.substring(0, 4) == "http") {
            arrLinks.push({
                href: link.href,
                text: link.textContent,
                file: file,
            })
        }
    });
    return arrLinks
}

//Se verifica que protocolo tiene el link, se llama al metodo correspondiente y se le agrega a los objetos las propiedades status y ok, resuelve array de objetos
function httpRequest(data, httpCallback, httpErrorCallback) {
    let arr = [];
    let protocol;
    return new Promise((resolve, reject) => {
        data.forEach((link, i) => {
            if (link.href.substring(0, 5) === "https") {
                protocol = https;
            } else { protocol = http; }
            protocol.get(link.href, (res) => {
                httpCallback(res, link, arr)
                if ((data.length - 1) === i) {
                    resolve(arr);
                }
            }).on('error', (e) => {
                httpErrorCallback(link, arr)
                if ((data.length - 1) === i) {
                    resolve(arr);
                }
            });
        })
    });
};

function httpCallback(res, link, arr) {
    const { statusCode } = res;
    link.status = statusCode;
    if (statusCode >= 400) {
        link.ok = "fail";
    } else {
        link.ok = "ok";
    }
    arr.push(link);
}

function httpErrorCallback(link, arr) {
    link.status = "Se ha producido un error al intentar hacer la conexión a la URL";
    link.ok = "fail";
    arr.push(link);
}