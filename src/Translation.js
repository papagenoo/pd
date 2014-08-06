function Translation() {
    // Массив массивов. Внешний массив отвечает за значения.
    // Внутренний - за синонимы внутри одного значения
    this._translations = [];
}

Translation.prototype = {
    /**
     * Добавить переводы для нового значения
     * @param translations
     */
    addMeaning: function (translations) {
        this._translations.push(translations);
    },

    /**
     * Получить список синонимов одного из значений
     * @param meaningId
     * @returns {*}
     */
    getSynonyms: function (meaningId) {
        return this._translations[meaningId];
    },

    /**
     * Количество значений, которое есть у слова
     * @returns {Number}
     */
    numberOfMeanings: function () {
        return this._translations.length;
    },

    /**
     * Добавить перевод в конкретном значении
     * @param meaningId
     * @param synonym
     */
    addSynonym: function (meaningId, synonym) {
        this._translations[meaningId].push(synonym);
    },

    getAllForms: function () {
        var forms = [];
        this._translations.forEach(function (meaning) {
            meaning.forEach(function (form) {
                forms.push(form);
            });
        });
        return forms;
    }
};
