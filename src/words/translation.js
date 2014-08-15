(function () {
    // Массив массивов. Внешний массив отвечает за значения.
    // Внутренний - за синонимы внутри одного значения
    function _translations(self) {
        if (!self._translations)
            self._translations = [];
        return self._translations;
    }

    /**
     * Добавить переводы для нового значения
     * @param translations
     */
    function addMeaning(translations) {
        _translations(this).push(translations);
    }

    /**
     * Получить список синонимов одного из значений
     * @param meaningId
     * @returns {*}
     */
    function getSynonyms(meaningId) {
        return _translations(this)[meaningId];
    }

    /**
     * Количество значений, которое есть у слова
     * @returns {Number}
     */
    function numberOfMeanings() {
        return _translations(this).length;
    }

    /**
     * Добавить перевод в конкретном значении
     * @param meaningId
     * @param synonym
     */
    function addSynonym(meaningId, synonym) {
        _translations(this)[meaningId].push(synonym);
    }

    function getAllForms() {
        var forms = [];
        _translations(this).forEach(function (meaning) {
            meaning.forEach(function (form) {
                forms.push(form);
            });
        });
        return forms;
    }

    var translation = {
        addMeaning: addMeaning,
        getSynonyms: getSynonyms,
        numberOfMeanings: numberOfMeanings,
        addSynonym: addSynonym,
        getAllForms: getAllForms
    };

    function create() {
        return Object.create(translation);
    }

    pd.namespace('words').translation = {
        create: create
    };
}());