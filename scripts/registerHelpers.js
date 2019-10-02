const Handlebars = require('handlebars');
const readTemplate = require('./readTemplate');

function registerHelpers() {
  Handlebars.registerHelper('header', () => new Handlebars.SafeString(readTemplate('fragments/header.hbs')({})));
  Handlebars.registerHelper('footer', () => new Handlebars.SafeString(readTemplate('fragments/footer.hbs')({})));
  Handlebars.registerHelper(
    'seo',
    (title, picture) => new Handlebars.SafeString(readTemplate('fragments/seo.hbs')({ title, picture }))
  );
  Handlebars.registerHelper(
    'resources',
    addSwiper => new Handlebars.SafeString(readTemplate('fragments/resources.hbs')({ addSwiper }))
  );
}

module.exports = registerHelpers;