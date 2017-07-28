'use strict';

module.exports = function (attributes) {
    let id = attributes.id || null;
    if (!id) {
        console.error('YouTube filter requires ID attribute');
        return '';
    }

    return '[YouTube generation for ID #' + id + ']';
};
