# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Plan de acción](#2-plan-de-acción)
* [3. Objetivos de aprendizaje de este proyecto](#3-objetivos-de-aprendizaje-de-este-proyecto)
* [4. Checklist de entregables](#4-check-list-de-entregables)
* [5. Instrucciones de instalación de la librería](#5-instrucciones-de-instalación-de-la-librería)
* [6. Instrucciones de uso desde la línea de comandos](#6-instrucciones-de-uso-desde-la-línea-de-comandos)
* [7. Instrucciones de uso para importar con require](#7-instrucciones-de-uso-para-importar-con-require)

_______________________________________________________________________________

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

_______________________________________________________________________________

## 2. Plan de acción

### Diagrama de flujo

![Diagrama de flujo]("https://github.com/CamiYanez/bog001-md-links/blob/Dev/diagram.png")

### Backlog

#### Sprint 1
* [x] Investigar sobre node.js (NodeSchool workshopper learnyounode).

#### Sprint 2
* [x] Definir diferentes comandos de entrada posibles para mi programa.
* [x] Hacer diagrama de flujo.
* [x] Realizar función para verificar si la ruta ingresada existe y comprobar si es archivo o directorio.
* [x] Utilizar file system (Fs) para leer un archivo o directorio, según sea el caso.
* [x] Verificar que el o los archivos tengan extensión .md
* [x] Investigar como poder extraer los links del archivo markdown.

#### Sprint 3
* [x] Probar módulo markdown-it.
* [x] Convertir archivo markdown a Html con propiedad render de markdown-it.
* [x] Simular un DOM con el html generado por markdown-it, utilizando la libreria **JSDOM**, y así poder usar la propiedad windows de ese DOM para acceder window.querySelectorAll para extraer todos los links del archivo.
* [x] Generar un array que contenga un objeto con las propiedades href, text y file por cada uno de los links encontrados.
* [x] Investigar sobre librerias para hacer solicitudes HTTP.
* [x] Investigar sobre el método get de Node.js 
* [x] Hacer condicional para definir cuales links usan protocolo http y cuales https y emplear el método get para hacer las solcitudes correspondientes.
* [x] Agregar las propiedades status y ok a los objetos de los links.

#### Sprint 4
* [x] Refactorizar y pasar todo el código a promesas 
* [x] Crear módulo (exportar función mdLinks).
* [x] Crear archivo **cli.js** y requerir el módulo mdLinks.
* [x] Consumir la promesa que devuelve el módulo mdLinks.
* [x] Crear función con cuatro condicionales de acuerdo a las posibles entradas que se pueden tener.

#### Sprint 5
* [x] Hacer conteo de total de links, links rotos y links unicos.
* [x] Realizar test unitarios y asíncronos de las funciones en mdLinks.js.
* [x] Manejo de errores que faltaban.
* [x] Documentación y README.

_______________________________________________________________________________

## 3. Objetivos de aprendizaje de este proyecto

### JavaScript

* [x] Uso de condicionales (if-else | switch | operador ternario)
* [x] Uso de funciones (parámetros | argumentos | valor de retorno)
* [x] Manipular arrays (filter | map | sort | reduce)
* [x] Manipular objects (key | value)
* [x] Uso ES modules ([`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
| [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export))
* [ ] Diferenciar entre expression y statements.
* [x] Diferenciar entre tipos de datos atómicos y estructurados.
* [x] [Uso de callbacks.](https://developer.mozilla.org/es/docs/Glossary/Callback_function)
* [x] [Consumo de Promesas.](https://scotch.io/tutorials/javascript-promises-for-dummies#toc-consuming-promises)
* [x] [Creación de Promesas.](https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/)

### Node

* [x] Uso de sistema de archivos. ([fs](https://nodejs.org/api/fs.html), [path](https://nodejs.org/api/path.html))
* [x] Instalar y usar módulos. ([npm](https://www.npmjs.com/))
* [x] Creación de modules. [(CommonJS)](https://nodejs.org/docs/latest-v0.10.x/api/modules.html)
* [x] [Configuración de package.json.](https://docs.npmjs.com/files/package.json)
* [x] [Configuración de npm-scripts](https://docs.npmjs.com/misc/scripts)
* [x] Uso de CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing

* [x] [Testeo unitario.](https://jestjs.io/docs/es-ES/getting-started)
* [x] [Testeo asíncrono.](https://jestjs.io/docs/es-ES/asynchronous)
* [ ] [Uso de librerias de Mock.](https://jestjs.io/docs/es-ES/manual-mocks)
* [ ] Uso de Mocks manuales.
* [ ] Testeo para múltiples Sistemas Operativos.

### Estructura del código y guía de estilo

* [x] Organizar y dividir el código en módulos (Modularización)
* [x] Uso de identificadores descriptivos (Nomenclatura | Semántica)
* [ ] Uso de linter (ESLINT)

### Git y GitHub

* [x] Uso de comandos de git (add | commit | pull | status | push)
* [x] Manejo de repositorios de GitHub (clone | fork | gh-pages)
* [x] Colaboración en Github (branches | pull requests | |tags)
* [ ] Organización en Github (projects | issues | labels | milestones)

### HTTP

* [x] Verbos HTTP ([http.get](https://nodejs.org/api/http.html#http_http_get_options_callback))

### Fundamentos de programación

* [ ] [Recursión.](https://www.youtube.com/watch?v=lPPgY3HLlhQ)

_______________________________________________________________________________

## 4. Checklist de entregables

### General

* [ ] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

* [x] Un board con el backlog para la implementación de la librería.
* [x] Documentación técnica de la librería.
* [x] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

* [x] El módulo exporta una función con la interfaz (API) esperada.
* [x] Implementa soporte para archivo individual
* [x] Implementa soporte para directorios
* [x] Implementa `options.validate`

### CLI

* [x] Expone ejecutable `md-links` en el path (configurado en `package.json`)
* [ ] Se ejecuta sin errores / output esperado
* [x] Implementa `--validate`
* [x] Implementa `--stats`

### Pruebas / tests

* [x] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
* [x] Pasa tests (y linters) (`npm test`).

_______________________________________________________________________________

## 5. Instrucciones de instalación de la librería: 

Para instalar el módulo debes escribir en la terminal:

                  npm install CamiYanez/md-links

Luego de instalarlo puedes ejecutar el programa de la siguiente manera a través de la terminal:

                  md-links <path-to-file> [options]

O puedes usarlo con require desde tu archivo js de la siguiente manera:

                  const { mdLinks } = require('./mdLinks')

_______________________________________________________________________________

## 6. Instrucciones de uso desde la línea de comandos 

Tienes cuatro posibles opciones de respuesta de acuerdo al comando que ejecutes a través de tu terminal, la estructura del comando debe ser `md-links <path> [options]` donde `path` es la ruta al archivo o directorio, y `options` puede ser `--validate` y/o `--stats` (**este parámetro es opcional**).

#### Opción 1: md-links <path>
Por ejemplo: $ md-links ./some/example.md

En caso de no especificar options la salida será un array de objetos donde cada objeto correspondera a un link con las siguientes propiedades:
* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

#### Opción 2: md-links <path> --validate
Por ejemplo: $ md-links ./some/example.md --validate

En caso de especificar unicamente la opción validate la salida será un array de objetos donde cada objeto correspondera a un link con las siguientes propiedades:
* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de estado de respuesta de la petición HTTP a la URL encontrada. 
* `ok`: Depende del status, será ok si la petición fue exitosa y fail si hubo algún problema.

#### Opción 3: md-links <path> --stats
Por ejemplo: $ md-links ./some/example.md --stats

En caso de especificar unicamente la opción stats la salida será la estadistica del total de links encontrados y la cantidad de links unicos encontrados.
```
Total Links: 3
Unique Links: 3
```

#### Opción 4: md-links <path> --validate --stats
Por ejemplo: $ md-links ./some/example.md --validate --stats

En caso de especificar ambas opciones la salida será el total de links, links unicos, y links rotos encontrados.
```
Total Links: 3
Unique Links: 3
Broken Links: 1
```

#### Recuerda asegurarte de que la ruta ingresada sea valida.

_______________________________________________________________________________

## 7. Instrucciones de uso para importar con require 
Para usar el módulo dentro de tu código puedes importarlo de la siguiente manera: `const { mdLinks } = require('./mdLinks')`

mdLinks es una función que recibe dos parametros `mdLinks(path, option)` donde `path` es la ruta al archivo o directorio y `option` es un objeto con una propiedad llamada `validate` que debe contener un Booleano que sea true si deseas validar los links encontrados o false si no.

Esta función retorna una promesa que resuelve un array de objetos, cada objeto representa un link, y las propiedades de estos objetos varian de acuerdo al parametro options, si es `false` tendrá las propiedades href, text y file, pero si es `true` tendrá las propiedades href, text, file, status y ok, donde: 

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de estado de respuesta de la petición HTTP a la URL encontrada. 
* `ok`: Depende del status, será ok si la petición fue exitosa y fail si hubo algún problema.

#### Para consumir la promesa
```
mdLinks(path, option)
    .then(links => {
        console.log(links)
    });
```
#### Ejemplo:
```
mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
```
links es el array de objetos que mencionabamos anteriormente, ya puedes usar esta data para lo que necesites.
