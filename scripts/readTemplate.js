const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

function readTemplate(template) {
    return Handlebars.compile(fs.readFileSync(path.join(__dirname, `../src/${template}`)).toString());
}

module.exports = readTemplate;