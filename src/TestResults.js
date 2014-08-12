function TestResults() {
    this._results = [];
}

TestResults.prototype = {
    addResultForWord: function (word, timestamp, correct) {
        if (!this._results[word])
            this._results[word] = new TestResultForWord();
        this._results[word].addResult(timestamp, correct);
    },

    resultsForWord: function (word) {
        return this._results[word].toArray() || [];
    },

    lastResultForWord: function (word) {
        var resuls = this.resultsForWord(word);
        return resuls.length
            ? resuls[resuls.length - 1]
            : null;
    }
};

function TestResultForWord() {
    this._results = [];
}

TestResultForWord.prototype = {
    addResult: function (timestamp, correct) {
        this._results.push([timestamp, correct]);
    },

    last: function () {
        return this._results.length
            ? this._results[this._results.length - 1]
            : null;
    },

    toArray: function () {
        return this._results;
    }
};