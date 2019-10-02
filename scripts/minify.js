const fs = require('fs');
const path = require('path');
const uglify = require('uglify-es');
const cleancss = require('clean-css');

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

    const styleNames = fs.readdirSync(path.join(__dirname, '../assets/css')).filter(name => !name.includes('.min'));
    for (let i = 0; i < styleNames.length; i++) {
        const styleName = styleNames[i];
        const styleSourceCode = fs.readFileSync(path.join(__dirname, `../assets/css/${styleName}`)).toString();
        const result = (new cleancss()).minify(styleSourceCode);
        fs.writeFileSync(path.join(__dirname, `../assets/css/${styleName.replace('.css', '')}.min.css`), result.styles);
    }
}

module.exports = minify;
