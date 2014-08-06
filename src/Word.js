function Word(word, translations, examples) {
    this._word = word;
    this._translations = translations;
    this._examples = examples;
}

Word.prototype = {
    getWord: function () {
        return this._word;
    },

    getTranslations: function () {
        return this._translations;
    },

    getExamples: function () {
        return this._examples;
    }
};