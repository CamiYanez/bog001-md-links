const { path } = require('../__mocks__/mdLinks.mock');
const { mdLinks, isDirectory, validateExtDir, validateExtFile, dataLinks, httpRequest, httpCallback, httpErrorCallback } = require("../mdLinks");
const https = require('https');


const arrFileTest = ["/app\\README.md"];
const arrTestFalse = [{ href: "https://es.wikipedia.org/wiki/Markdown", text: "Markdown", file: "/app\\README.md" }]
const arrTestTrue = [{ href: "https://es.wikipedia.org/wiki/Markdown", text: "Markdown", file: "/app\\README.md", status: 200, ok: "ok" }]
const url = [{ href: "https://miurl.coh", text: "Markdown", file: "/app\\README.md" }]

jest.mock('fs', () => {
  const { fs } = require('memfs');
  return fs;
});

describe('isDirectory', () => {
  it('debe resolver un booleano', () => {
    return isDirectory(path).then(directory => {
      expect(directory).toBe(true);
    })
  });
});

describe('isDirectory', () => {
  it('debe retornar un error de ruta invalida', () => {
    return isDirectory('./REAAADME.md').catch(err => {
      expect(err).toEqual(new Error("la ruta ingresada no existe, por favor verifica y vuelve a intentarlo"));
    })
  });
});

describe('validateExtDir', () => {
  it('debe resolver un array con los archivos de extensión md', () => {
    return validateExtDir(path).then(filesMd => {
      expect(filesMd).toEqual(arrFileTest)
    })
  });
});

describe('validateExtFile', () => {
  it('debe resolver la misma ruta si es un archivo md', () => {
    return validateExtFile("/app\\README.md").then(pathFile => {
      expect(pathFile).toEqual(arrFileTest)
    })
  })
})

describe('validateExtFile', () => {
  it('debe rechazar y lanzar error si el archivo no tiene extensión .md', () => {
    return validateExtFile("/app\\pruebas.js").catch(file => {
      expect(file).toEqual(new Error("El archivo tiene una extensión incorrecta, recuerda que el archivo debe ser de extension .md"))
    })
  })
})

describe('dataLinks', () => {
  it('debe resolver un array de objetos con las propiedades href, text y file', () => {
    return dataLinks(arrFileTest).then(arrLinks => {
      expect(arrLinks).toEqual(arrTestFalse)
    })
  })
})

describe('dataLinks', () => {
  it('debe retornar un error', () => {
    return dataLinks(["/app\\READMEEEE.md"]).catch(error => {
      expect(error).toEqual(new Error("Ha ocurrido un error"))
    })
  })
})

describe('httpRequest', () => {
  it('para protocolo https, debe resolver un array de objetos con las propiedades href, text, file, status y ok', () => {
    return httpRequest(arrTestFalse, httpCallback, httpErrorCallback).then(arrLinks => {
      expect(arrLinks).toEqual(arrTestTrue)
    })
  })
})

describe('httpRequest', () => {
  it('para protocolo http, debe resolver un array de objetos con las propiedades href, text, file, status y ok', () => {
    const arrLinkHttp = [{ href: "http://community.laboratoria.la/c/js", text: "Community Laboratoria", file: "/app\\README.md" }];
    return httpRequest(arrLinkHttp, httpCallback, httpErrorCallback).then(arrLinks => {
      expect(arrLinks).toEqual([{ href: "http://community.laboratoria.la/c/js", text: "Community Laboratoria", file: "/app\\README.md", status: 200, ok: "ok" }])
    })
  })
})

describe('httpRequest', () => {
  it('debe retornar un array de objetos', (done) => {
    function httpCallback(res, link, arr) {
      const { statusCode } = res;
      link.status = statusCode;
      if (statusCode >= 400) {
        link.ok = "fail";
      } else {
        link.ok = "ok";
      }
      arr.push(link);
      expect(arr).toEqual(arrTestTrue)
      done();
    }
    httpRequest(arrTestFalse, httpCallback, httpErrorCallback)
  })
})

describe('httpRequest', () => {
  it('debe retornar array de objetos con fail', (done) => {
    let arr = [];
    function httpErrorCallback(link, arr) {
      link.status = "Se ha producido un error al intentar hacer la conexión a la URL";
      link.ok = "fail";
      arr.push(link);
      expect(arr).toEqual([{ href: "https://miurl.coh", text: "Markdown", file: "/app\\README.md", status: "Se ha producido un error al intentar hacer la conexión a la URL", ok: "fail" }])
      done();
    }
    httpRequest(url, httpCallback, httpErrorCallback)
  })
})

describe('mdLinks', () => {
  it('recibe un directorio y debe retornar array de objetos con 3 propiedades', () => {
    return mdLinks(path, false).then(links => {
      expect(links).toEqual([{ "file": "/app\\README.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown" }])
    })
  })
})

describe('mdLinks', () => {
  it('recibe un archivo y debe retornar array de objetos con 3 propiedades', () => {
    return mdLinks('/app/README.md', false).then(links => {
      expect(links).toEqual([{ "file": "/app/README.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown" }])
    })
  })
})

describe('mdLinks', () => {
  it('debe retornar array de objetos con 5 propiedades', () => {
    return mdLinks(path, true).then(links => {
      expect(links).toEqual([{ "file": "/app\\README.md", "href": "https://es.wikipedia.org/wiki/Markdown", "ok": "ok", "status": 200, "text": "Markdown" }])
    })
  })
})


