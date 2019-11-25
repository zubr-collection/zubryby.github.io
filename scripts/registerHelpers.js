'use strict';

const Handlebars = require('handlebars');
const readTemplate = require('./readTemplate');

function registerHelpers() {
    const { SafeString } = Handlebars;
    Handlebars.registerHelper('header', name => {
        const flagMap = {
            isEnvelopes: name === 'envelopes',
            isPostcards: name === 'postcards',
            isStamps: name === 'stamps',
            isPhotos: name === 'photos',
            isAbout: name === 'photos'
        };

        return new SafeString(readTemplate('fragments/header.hbs')(flagMap));
    });
    Handlebars.registerHelper('footer', () => new SafeString(readTemplate('fragments/footer.hbs')({})));
    Handlebars.registerHelper(
        'seo',
        (title, picture, description) =>
            new SafeString(readTemplate('fragments/seo.hbs')({ title, picture, description }))
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
