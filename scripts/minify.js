const fs = require('fs');
const path = require('path');
const uglify = require("uglify-es");

function minify() {
    const scriptNames = fs.readdirSync(path.join(__dirname, '../assets/js')).filter(name => !name.includes('.min'));
    for (let i = 0; i < scriptNames.length; i++) {
        const scriptName = scriptNames[i];
        const scriptSourceCode = fs.readFileSync(path.join(__dirname, `../assets/js/${scriptName}`)).toString();
        const result = uglify.minify(scriptSourceCode);
        if (result.error) {
            console.error(result.error);
        }
        fs.writeFileSync(path.join(__dirname, `../assets/js/${scriptName.replace('.js', '')}.min.js`), result.code);
    }
}

module.exports = minify;