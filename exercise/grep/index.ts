const { readFileSync } = require("fs");
const { argv } = require("process");


const [,,filename = null, searchField = null]: null[]|string[] = argv;
console.log('filename:', filename)


const content = readFileSync(filename, {encoding: 'utf8'});

const searchedLines = content.split(/\n/).filter((l: string) => searchField != null && l.includes(searchField))
console.log({ searchedLines })