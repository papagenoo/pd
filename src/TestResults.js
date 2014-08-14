/**
 * Результаты тестирования пользователя
 * @constructor
 */
function TestResults() {
    this._results = [];
}

TestResults.prototype = {
    /**
     * Добавить результат
     * @param word проверяемое слово
     * @param timestamp когда ответил
     * @param correct верный ли ответ
     */
    addResultForWord: function (word, timestamp, correct) {
        if (!this._results[word])
            this._results[word] = new TestResultsForWord();
        this._results[word].addResult(timestamp, correct);
    },

    /**
     * Возвращает результаты тестирования для слова
     * @param word
     * @returns {*}
     */
    resultsForWord: function (word) {
        return this._results[word]
            ? this._results[word].toArray()
            : [];
    },

    /**
     * Возвращает последний результат для слова
     * @param word
     * @returns {*}
     */
    lastResultForWord: function (word) {
        var resuls = this.resultsForWord(word);
        return resuls.length
            ? resuls[resuls.length - 1]
            : null;
    }
};

if (!Function.prototype.inherit) {
    (function () {
        function F() {}
        Function.prototype.inherit = function (superFn) {
            F.prototype = superFn.prototype;
            this.prototype = new F();
            this.prototype.constructor = this;
        };
    }());
}