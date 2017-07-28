'use strict';

const fs = require('fs');
const path = require('path');

// load up all filters defined in this directory
let filters = {};
fs.readdirSync(__dirname)
    .filter(filename => path.basename(filename) !== 'index.js')
    .map(filename => path.basename(filename, '.js'))
    .forEach(filename => {
        filters[filename] = require(path.join(__dirname, filename + '.js'));
    });

module.exports = {
    parse: function (payload) {
        let tags = payload.match(/\{\{[^}]+\}\}/g);
        if (!!tags) {
            tags.forEach(tag => {
                // syntax:
                // {{ [name]: a=1, b=2 }}
                let match = tag.match(/\{\{([a-z0-9_-]+)(\:([^}]+))?\}\}/);
                if (!match || typeof filters[match[1]] === 'undefined') {
                    return console.error('Malformed or unsupported element:', tag);
                }

                // process each tag
                let type = match[1];
                let attributes = {};
                if (!!match[3]) {
                    match[3].trim()
                        .split(',')
                        .forEach(attr => {
                            let parts = attr.split('=');
                            if (parts.length === 2) {
                                attributes[parts[0].trim()] = parts[1].trim();
                            }
                        });
                }

                // call specified, recognized filter
                payload = payload.replace(tag, filters[type](attributes));
            });
        }
        return payload;
    }
};
