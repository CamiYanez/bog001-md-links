const { vol, fs } = require('memfs');
const { path, testFiles } = require('../__mocks__/mdLinks.mock');
const { mdLinks, isDirectory } = require("../mdLinks");
// jest.mock("../mdLinks")

console.log(path);

describe('isDirectory', () => {
  it('debe resolver un booleano', () => {
    return isDirectory(path).then(directory => {
      expect(directory).toBe(Boolean);
    })
  });
});