(function () {

    var testResultsForWord = pd.words.testResultsForWord;

    function _results(self) {
        if (!self._results)
            self._results = [];
        return self._results;
    }

    function _resultsForWord(self, word) {
        var results = _results(self);
        if (!results[word])
            results[word] = testResultsForWord.create();
        return results[word];
    }

    /**
     * Результаты тестирования пользователя
     * @constructor
     */

    /**
     * Добавить результат
     * @param word проверяемое слово
     * @param timestamp когда ответил
     * @param correct верный ли ответ
     */
    function addResultForWord(word, timestamp, correct) {
        var resultsForWord = _resultsForWord(this, word);
        resultsForWord.addResult(timestamp, correct);
    }

    /**
     * Возвращает результаты тестирования для слова
     * @param word
     * @returns {*}
     */
    function resultsForWordAsArray(word) {
        return this._results[word]
            ? this._results[word].toArray()
            : [];
    }

    /**
     * Возвращает последний результат для слова
     * @param word
     * @returns {*}
     */
    function lastResultTimestamp(word) {
        var results = _resultsForWord(this, word);
        var last = results.length ? results.last() : null;
        jstestdriver.console.log(JSON.stringify(results));

        return last ? last[0] : null;
    }

    var testResults = {
        addResultForWord: addResultForWord,
        resultsForWordAsArray: resultsForWordAsArray,
        lastResultTimestamp: lastResultTimestamp
    };

    pd.namespace('words').testResults = {
        create: function () {
            return Object.create(testResults);
        }
    };

}());