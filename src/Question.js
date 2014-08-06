function Question(word, compareWordsCallback) {
    this._word = word;
    this._compareWordsCallback = compareWordsCallback;
}

Question.prototype = {
    getWord: function () {
        return this._word;
    },

    verifyAnswer: function (answer) {
        var forms = this._word.getTranslations().getAllForms();
        var compare = this._compareWordsCallback;
        for (var i = 0, l = forms.length; i < l; i++)
            if (compare(forms[i], answer))
                return true;
        return false;
    },

    verifyAnswerInverse: function (answer) {
        var compare = this._compareWordsCallback;
        return compare(this._word.getWord(), answer);
    }
};