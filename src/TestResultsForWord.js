(function () {
    /**
     * Результат тестирования для слова
     * @constructor
     */
    function TestResultsForWord(initial) {
        SortedList.call(this, this._compare, initial);
    }

    TestResultsForWord.inherit(SortedList);

    /**
     * Добавить результат
     * @param timestamp когда тестировали
     * @param correct верно ли ответил
     */
    TestResultsForWord.prototype.addResult = function (timestamp, correct) {
        this.insert([timestamp, correct]);
    };

    TestResultsForWord.prototype._compare = function compareWordTestResults(res1, res2) {
        var ts1 = res1[0];
        var ts2 = res2[0];
        return (ts1 === ts2
            ? 0
            : (ts1 < ts2 ? -1 : 1));
    };

    pd.namespace("test").TestResultsForWord = TestResultsForWord;
}());

