(function () {

    var vocabulary = pd.words.vocabulary;

    /**
     * Инициализируем словарь (активный или пассивный)
     * @param self
     * @param name
     * @returns {*}
     * @private
     */
    function _initVoc(self, name) {
        if (!self[name])
            self[name] = vocabulary.create();
        return self[name];
    }

    /**
     * Получаем активный словарь
     * @returns {*}
     */
    function active() {
        return _initVoc(this, '_active');
    }

    /**
     * Получаем пассивный словарь
     * @returns {*}
     */
    function passive() {
        return _initVoc(this, '_passive');
    }

    // Превышение в долях над самым слабым словом из активного словаря,
    // чтобы переместиться в него
    var _schmidtTrigger = 0.25;

    /**
     * Получаем триггер Шмидта
     * @returns {number}
     */
    function schmidtTrigger() {
        return _schmidtTrigger;
    }

    /**
     * Устанавливаем триггер Шмидта
     * @param val
     */
    function setSchmidtTrigger(val) {
        _schmidtTrigger = val;
    }

    /**
     * Получаем наиболее изученное слово из активного словаря
     * @param self
     * @returns {*}
     * @private
     */
    function _mostKnownActiveWord(self) {
        return self.active().mostKnown();
    }

    /**
     * Получаем наименее изученное слово из пассивного словаря
     * @param self
     * @returns {*}
     * @private
     */
    function _leastKnownPassiveWord(self) {
        return self.passive().leastKnown();
    }

    /**
     * Поменяем одно слово из активного словаря и пассивного словаря,
     * если там сильно отличаются вероятности
     */
    function swapMostAndLeastKnownWords() {
        var mostKnown = _mostKnownActiveWord(this);
        var leastKnown = _leastKnownPassiveWord(this);
        var mostKnownWord = mostKnown[0];
        var leastKnownWord = leastKnown[0];
        var mostKnownProb = mostKnown[1];
        var leastKnownProb = leastKnown[1];
        if (mostKnownProb >= leastKnownProb && mostKnownProb >= schmidtTrigger()) {
            this.active().remove(mostKnownWord);
            this.passive().remove(leastKnownWord);
            this.active().addWord(leastKnownWord);
            this.passive().addWord(mostKnownWord);
            this.active().setWordProb(leastKnownWord, leastKnownProb);
            this.passive().setWordProb(mostKnownWord, mostKnownProb);
        }
        this.active().sort();
        this.passive().sort();
    }

    /**
     * Возвращает следующее слово,
     * предварительно обновив вероятности и поменяв местами
     * наиболее изученное активное слово и наименее изученное пассивное
     * @returns {*}
     */
    function nextWord() {
        _updateProbabilities(this);
        this.swapMostAndLeastKnownWords();
        var leastKnown = this.active().leastKnown();
        return leastKnown ? leastKnown[0] : undefined;
    }

    /**
     * Обновляет вероятности слов в активном и пассивном словарях
     * @param self
     * @private
     */
    function _updateProbabilities(self) {
        self.passive().updateProbabilities();
        var leastKnownPassiveWordProb = self.passive().leastKnown();
        self.active().updateProbabilities(leastKnownPassiveWordProb);
    }

    /**
     * Прототип объекта словарей
     * @type {{active: active, passive: passive, swapMostAndLeastKnownWords: swapMostAndLeastKnownWords}}
     */
    var vocabularies = {
        active: active,
        passive: passive,
        swapMostAndLeastKnownWords: swapMostAndLeastKnownWords,
        nextWord: nextWord
    };

    /**
     * Фабрика объекта словарей
     * @returns {vocabularies}
     */
    function createVocabularies() {
        return Object.create(vocabularies);
    }

    pd.namespace('words').vocabularies = {
        create: createVocabularies,
        schmidtTrigger: schmidtTrigger,
        setSchmidtTrigger: setSchmidtTrigger
    };
}());