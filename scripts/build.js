'use strict';

const fs = require('fs');
const path = require('path');
const minify = require('./minify');
const readTemplate = require('./readTemplate');
const registerHelpers = require('./registerHelpers');

registerHelpers();

const pageNames = fs.readdirSync(path.join(__dirname, '../src/data')).map(name => name.replace('.js', ''));
for (let i = 0; i < pageNames.length; i++) {
    const pageName = pageNames[i];
    const template = readTemplate(`templates/${pageName}.hbs`);
    const data = require(`../src/data/${pageName}`);
    if (data.things && data.things.length) {
        // const names = data.things.map(t => t.props).reduce((acc, p) => {
        //     acc.push(...p.map(i => i.name));
        //     return acc;
        // }, []);
        // console.log(Array.from(new Set(names.filter(n => names.filter(nn => nn === n).length > 10))));

        data.things.forEach(thing => thing.formattedYear = thing.year.split('.').reverse().join('-'));
    }
    const html = template(data);
    fs.writeFileSync(path.join(__dirname, `../${pageName}.html`), html);
}

minify();

/* Scrap all collection data from site */

// const context = { things: [] };
// document.querySelectorAll('section').forEach(s => {
//     const item = {
//         image: s.querySelector('img').getAttribute('src').split('/').pop().replace('.jpg', ''),
//         year: s.querySelector('time').innerHTML,
//         title: s.querySelector('h3').innerHTML,
//         props: []
//     };
//     const dl = s.querySelector('dl');
//     dl.querySelectorAll('dt').forEach(t => {
//         item.props.push({
//             name: t.innerHTML
//         });
//     });
//     dl.querySelectorAll('dd').forEach((d,i) => {
//         item.props[i].value = d.innerHTML;
//     });
//     context.things.push(item);
// });
