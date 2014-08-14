(function () {

    pd.namespace('words').TestResults = TestResults;

    var TestResultsForWord = pd.words.TestResultsForWord;

    /**
     * Результаты тестирования пользователя
     * @constructor
     */
    function TestResults() {
        this._results = [];
    }

    /**
     * Добавить результат
     * @param word проверяемое слово
     * @param timestamp когда ответил
     * @param correct верный ли ответ
     */
    TestResults.prototype.addResultForWord = function (word, timestamp, correct) {
        if (!this._results[word])
            this._results[word] = new TestResultsForWord();
        this._results[word].addResult(timestamp, correct);
    };

    /**
     * Возвращает результаты тестирования для слова
     * @param word
     * @returns {*}
     */
    TestResults.prototype.resultsForWord = function (word) {
        return this._results[word]
            ? this._results[word].toArray()
            : [];
    };

    /**
     * Возвращает последний результат для слова
     * @param word
     * @returns {*}
     */
    TestResults.prototype.lastResultForWord = function (word) {
        var resuls = this.resultsForWord(word);
        return resuls.length
            ? resuls[resuls.length - 1]
            : null;
    };

}());