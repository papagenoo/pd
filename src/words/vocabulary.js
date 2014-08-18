(function () {

    var dirty = pd.util.dirty;

    /**
     * Возвращает массив слов
     * @param voc
     * @returns {Array}
     * @private
     */
    function _words(voc) {
        if (!voc._words) {
            voc._words = [];
            voc.setDirty();
        }
        return voc._words;
    }

    /**
     * Добавляет лсово
     * @param word
     */
    function addWord(word) {
        _words(this).push(word);
        this.setDirty();
    }

    /**
     * Размер словаря
     * @returns {*}
     */
    function size() {
        return _words(this).length;
    }

    /**
     * Возвращает вероятности по словам
     * @param voc
     * @returns {{}|*}
     * @private
     */
    function _prob(voc) {
        if (!voc._prob) {
            voc._prob = {};
            voc.setDirty();
        }
        return voc._prob;
    }

    /**
     * Возвращает вероятность для слова
     * @param word
     * @returns {*}
     */
    function wordProb(word) {
        return _prob(this)[word.name()];
    }

    /**
     * Устанавливает вероятность для слова
     * @param word
     * @param prob
     */
    function setWordProb(word, prob) {
        _prob(this)[word.name()] = prob;
        this.setDirty();
    }

    /**
     * Сортирует слова по возрастанию вероятности
     */
    function sort() {
        var voc = this;
        _words(this).sort(function (w1, w2) {
            return compareWordsByProb(voc, w1, w2);
        });
        voc = null;
        this.setNotDirty();
    }

    /**
     * Сравнивает два слова по вероятности
     * Используется в сортировке
     * @param voc Ссылка на словарь
     * @param w1 Первое слово
     * @param w2 Второе слово
     * @returns {number}
     */
    function compareWordsByProb(voc, w1, w2) {
        var p1 = voc.wordProb(w1);
        var p2 = voc.wordProb(w2);
        return (p1 === p2 ? 0 : (p1 > p2 ? 1 : -1));
    }

    /**
     * Возвращает наиболее изученное слово
     * @returns {*[]}
     */
    function mostKnown() {
        this.callIfDirty(this.sort);
        var words = _words(this);
        if (!words.length)
            return;
        var word = words[words.length - 1];
        return [ word, this.wordProb(word) ];
    }

    /**
     * Возвращает наименее изученное слово
     * @returns {*[]}
     */
    function leastKnown() {
        this.callIfDirty(this.sort);
        var words = _words(this);
        if (!words.length)
            return;
        var word = words[0];
        return [ word, this.wordProb(word) ];
    }

    /**
     * Возвращает слова в виде массива
     * @returns {Array}
     */
    function toArray() {
        this.callIfDirty(this.sort);
        return _words(this);
    }

    /**
     * Удаляет слово
     * @param word
     */
    function remove(word) {
        var words = _words(this);
        words.splice(words.indexOf(word), 1);
        delete _prob(this)[word.name()];
        this.setDirty();
    }

    /**
     * Обновляет вероятности слов
     * @param leastKnownPassiveWordProb Вероятности наименее изученного пассивного слова
     */
    function updateProbabilities(leastKnownPassiveWordProb) {
        var words = _words(this);
        for (var i = 0, l = words.length; i < l; i++) {
            var word = words[i];
            var ts = new Date().getTime();
            var prob = word.estimateCorrectAnswerProbability(word, ts, leastKnownPassiveWordProb);
            this.setWordProb(word, prob);
        }
        this.setDirty();
    }

    /**
     * Прототип объекта словаря
     */
    var vocabulary = {
        addWord: addWord,
        size: size,
        wordProb: wordProb,
        setWordProb: setWordProb,
        sort: sort,
        mostKnown: mostKnown,
        leastKnown: leastKnown,
        toArray: toArray,
        remove: remove,
        updateProbabilities: updateProbabilities
    };

    // подмешиваем поведение dirty
    pd.extend(vocabulary, dirty);

    /**
     * Создаёт объект словаря
     * @returns {vocabulary}
     */
    function createVocabulary() {
        return Object.create(vocabulary);
    }

    pd.namespace('words').vocabulary = {
        create: createVocabulary
    };
}());