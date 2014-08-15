(function () {
    var sortedList = pd.namespace('util').sortedList;

    /**
     * Добавить результат
     * @param timestamp когда тестировали
     * @param correct верно ли ответил
     */
    function addResult(timestamp, correct) {
        this.insert([timestamp, correct]);
    }

    function _compareWordTestResults(res1, res2) {
        var ts1 = res1[0];
        var ts2 = res2[0];
        return (ts1 === ts2
            ? 0
            : (ts1 < ts2 ? -1 : 1));
    }

    var mixin = {
        addResult: addResult
    };

    pd.namespace("words").testResultsForWord = {
        /**
         * Создать результаты тестирования для слова
         * @constructor
         */
       create: function (initial) {
           var tr = sortedList.create(initial, _compareWordTestResults);
           tr.addResult = addResult;
           pd.extend(tr, mixin);
           return tr;
       }
    };

}());