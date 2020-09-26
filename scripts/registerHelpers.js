'use strict';

const Handlebars = require('handlebars');
const readTemplate = require('./readTemplate');
const { SafeString } = Handlebars;

function registerHeader(helper) {
    Handlebars.registerHelper(helper, name => {
        const flagMap = {
            pageName: name,
            isEnvelopes: name === 'envelopes',
            isPostalCards: name === 'postal-cards',
            isStamps: name === 'stamps',
            isPostcards: name === 'postcards',
            isAbout: name === 'about'
        };

        return new SafeString(readTemplate(`fragments/${helper}.hbs`)(flagMap));
    });
}

function registerFooter(helper) {
    Handlebars.registerHelper(helper, () => new SafeString(readTemplate(`fragments/${helper}.hbs`)({})));
}

function registerSEO(helper) {
    Handlebars.registerHelper(
        helper,
        (title, picture, description) =>
            new SafeString(readTemplate(`fragments/${helper}.hbs`)({ title, picture, description }))
    );
}

function registerCollection(helper) {
    Handlebars.registerHelper(
        helper,
        (name, description, things, pictureFolder) =>
            new SafeString(
                readTemplate(`fragments/${helper}.hbs`)({ name, description, things, pictureFolder })
            )
    );
}

function registerHelpers() {
    registerHeader('header');
    registerHeader('header_en');
    registerFooter('footer');
    registerFooter('footer_en');
    registerSEO('seo');
    registerSEO('seo_en');
    registerCollection('collectionArticle');
    registerCollection('collectionArticle_en');

    Handlebars.registerHelper(
        'resources',
        (addSwiper, image) => new SafeString(readTemplate('fragments/resources.hbs')({ addSwiper, image }))
    );
}

module.exports = registerHelpers;
