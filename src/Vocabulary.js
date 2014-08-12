function Vocabulary() {
    this._words = [];
    this._pos = 0;
    this._sortedWords = [];
    /// <summary>
    /// Превышение в долях над самым слабым словом из активного словаря, чтобы переместиться в него
    /// </summary>
//    schmidt_trigger: 0

}

Vocabulary.prototype = {
    addWord: function (word, prob) {
        this._words.push(new WordWithStatistics(word, prob));
        this._markAsUnsorted();
    },

    nextWord: function () {
        var size = this.size();
        if (!size)
            return null;
        // сортируем только, если неотсортирован
        if (this._needToSort())
            this._sortWordsByProb();
        var word = this._words[this._pos].word;
        this._pos++;
        if (this._pos === size)
            this._pos = 0;
        return word;
    },

    _needToSort: function () {
        return this._sortedWords.length === 0;
    },

    _markAsUnsorted: function () {
        this._sortedWords = [];
    },

    _sortWordsByProb: function () {
        this._sortedWords = this._words.sort(compareWordsByProb);

        function compareWordsByProb(w1, w2) {
            return (w1.prob === w2.prob
                    ? 0
                    : (w1.prob > w2.prob
                               ? 1
                               : -1));
        }
    },

    size: function () {
        return this._words.length;
    }
};

function WordWithStatistics(word, prob) {
    this.word = word;
    this.prob = prob;
}