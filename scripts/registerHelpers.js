'use strict';

const Handlebars = require('handlebars');
const readTemplate = require('./readTemplate');

function registerHelpers() {
    const { SafeString } = Handlebars;
    Handlebars.registerHelper('header', () => new SafeString(readTemplate('fragments/header.hbs')({})));
    Handlebars.registerHelper('footer', () => new SafeString(readTemplate('fragments/footer.hbs')({})));
    Handlebars.registerHelper(
        'seo',
        (title, picture) => new SafeString(readTemplate('fragments/seo.hbs')({ title, picture }))
    );
    Handlebars.registerHelper(
        'resources',
        addSwiper => new SafeString(readTemplate('fragments/resources.hbs')({ addSwiper }))
    );
    Handlebars.registerHelper(
        'collectionArticle',
        (name, description, things, pictureFolder) =>
            new SafeString(
                readTemplate('fragments/collectionArticle.hbs')({ name, description, things, pictureFolder })
            )
    );
}

module.exports = registerHelpers;
