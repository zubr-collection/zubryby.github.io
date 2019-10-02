const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');

Handlebars.registerHelper('header', () => new Handlebars.SafeString(readTemplate('fragments/header.hbs')({})));
Handlebars.registerHelper('footer', () => new Handlebars.SafeString(readTemplate('fragments/footer.hbs')({})));
Handlebars.registerHelper(
  'seo',
  (title, picture) => new Handlebars.SafeString(readTemplate('fragments/seo.hbs')({ title, picture }))
);

const pageNames = fs.readdirSync(path.join(__dirname, '../src/data')).map(name => name.replace('.js', ''));
for (let i = 0; i < pageNames.length; i++) {
  const pageName = pageNames[i];
  const template = readTemplate(`templates/${pageName}.hbs`);
  const html = template(require(`../src/data/${pageName}`));
  fs.writeFileSync(path.join(__dirname, `../${pageName}.html`), html);
}

function readTemplate(template) {
  return Handlebars.compile(fs.readFileSync(path.join(__dirname, `../src/${template}`)).toString());
}

/* Scrap data from site */

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