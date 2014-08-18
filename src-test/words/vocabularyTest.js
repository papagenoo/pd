(function () {

    var vocabulary = pd.words.vocabulary;

    var wordMock = {
        _name: '',
        name: function () {
            return this._name;
        }
    };

    var createWordMock = function (name) {
        var word = Object.create(wordMock);
        word._name = name;
        return word;
    };

    TestCase("VocabularyTest", {
        setUp: function () {
            this.emptyVocabulary = vocabulary.create();
            this.vocabulary = vocabulary.create();
            this.word1 = createWordMock('word1');
            this.word2 = createWordMock('word2');
            this.word3 = createWordMock('word3');
            this.vocabulary.addWord(this.word1);
            this.vocabulary.addWord(this.word2);
            this.vocabulary.addWord(this.word3);
        },

        "test create vocabulary": function () {
            assertObject(vocabulary.create());
        },

        "test get empty vocabulary size": function () {
            assertEquals(0, this.emptyVocabulary.size());
        },

        "test get filled vocabulary size": function () {
            assertEquals(3, this.vocabulary.size());
        },

        "test set and get word probability": function () {
            assertEquals(null, this.vocabulary.wordProb(this.word1));
            assertEquals(null, this.vocabulary.wordProb(this.word2));
            this.vocabulary.setWordProb(this.word1, 0.6);
            this.vocabulary.setWordProb(this.word2, 0.2);
            assertEquals(0.6, this.vocabulary.wordProb(this.word1));
            assertEquals(0.2, this.vocabulary.wordProb(this.word2));
        },

        "test get most known word in empty voc": function () {
            assertUndefined(this.emptyVocabulary.mostKnown());
        },

        "test get most known word": function () {
            this.vocabulary.setWordProb(this.word1, 0.6);
            this.vocabulary.setWordProb(this.word2, 0.2);
            this.vocabulary.setWordProb(this.word3, 0.1);
            assertEquals([this.word1, 0.6], this.vocabulary.mostKnown());
        },

        "test get less known word in empty voc": function () {
            assertUndefined(this.emptyVocabulary.leastKnown());
        },

        "test get less known word": function () {
            this.vocabulary.setWordProb(this.word1, 0.6);
            this.vocabulary.setWordProb(this.word2, 0.2);
            this.vocabulary.setWordProb(this.word3, 0.1);
            assertEquals([this.word3, 0.1], this.vocabulary.leastKnown());
        },

        "test to array": function () {
            this.vocabulary.setWordProb(this.word1, 0.6);
            this.vocabulary.setWordProb(this.word2, 0.2);
            this.vocabulary.setWordProb(this.word3, 0.1);
            this.vocabulary.sort();
            assertEquals([
                this.word3,
                this.word2,
                this.word1
            ], this.vocabulary.toArray());
        },

        "test remove word": function () {
            this.vocabulary.setWordProb(this.word1, 0.6);
            this.vocabulary.setWordProb(this.word2, 0.2);
            this.vocabulary.setWordProb(this.word3, 0.1);
            this.vocabulary.sort();
            this.vocabulary.remove(this.word2);
            assertEquals([
                this.word3,
                this.word1
            ], this.vocabulary.toArray());

        }
    });
}());
