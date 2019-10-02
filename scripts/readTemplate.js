'use strict';

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

function readTemplate(template) {
    return Handlebars.compile(fs.readFileSync(path.join(__dirname, `../src/${template}`), 'utf8').toString());
}

module.exports = readTemplate;
