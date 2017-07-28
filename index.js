'use strict';

const fs = require('fs');
const path = require('path');
const markdown = require('markdown').markdown;
const filters = require('./filters');

let content;
try {
    let argv = process.argv;
    if (argv.length !== 3) throw new Error('No file provided');

    let file = argv[2];
    content = fs.readFileSync(file).toString();
} catch (e) {
    let file = path.basename(__filename);
    console.error(`Usage: node ${file} <markdown_file>`);
    process.exit(1);
}

// Process the markdown file
content = markdown.toHTML(content);
console.log('After markdown:');
console.log(content);
console.log('');

content = filters.parse(content);
console.log('After custom filters:');
console.log(content);
