'use strict';

const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-es');
const CleanCSS = require('clean-css');

function minify() {
    processFiles('js', 'js', source => {
        const result = UglifyJS.minify(source);
        if (result.error) {
            console.error(result.error);
        }
        return result.code;
    });

    processFiles('css', 'css', source => {
        const result = new CleanCSS().minify(source);
        if (result.errors && result.errors.length) {
            console.error(result.errors);
        }
        return result.styles;
    });
}

function processFiles(dir, ext, minifyFunc) {
    const files = fs.readdirSync(path.join(__dirname, `../assets/${dir}`)).filter(name => !name.includes('.min'));
    for (let i = 0; i < files.length; i++) {
        const fileName = files[i];
        const sourceCode = fs.readFileSync(path.join(__dirname, `../assets/${dir}/${fileName}`), 'utf8').toString();
        const output = minifyFunc(sourceCode);
        fs.writeFileSync(
            path.join(__dirname, `../assets/${dir}/${fileName.replace(`.${ext}`, '')}.min.${ext}`),
            output
        );
    }
}

module.exports = minify;
