(function () {

    var vocabularies = pd.words.vocabularies;

    var wordMock = {
        _name: '',
        name: function () {
            return this._name;
        },
        estimateCorrectAnswerProbability: function () {
            return 0;
        }
    };

    var createWordMock = function (name) {
        var word = Object.create(wordMock);
        word._name = name;
        return word;
    };

    TestCase("VocabulariesTest", {
        setUp: function () {
            this.vocabularies = vocabularies.create();

            this.active = this.vocabularies.active();
            this.passive = this.vocabularies.passive();

            this.w1 = createWordMock('w1');
            this.w2 = createWordMock('w2');
            this.w3 = createWordMock('w3');
            this.w4 = createWordMock('w4');
            this.w5 = createWordMock('w5');
            this.w6 = createWordMock('w6');

            this.active.addWord(this.w1);
            this.active.addWord(this.w2);
            this.active.addWord(this.w3);

            this.passive.addWord(this.w4);
            this.passive.addWord(this.w5);
            this.passive.addWord(this.w6);

            this.active.setWordProb(this.w1, 0.9);
            this.active.setWordProb(this.w2, 0.8);
            this.active.setWordProb(this.w3, 0.7);

            this.passive.setWordProb(this.w4, 0.6);
            this.passive.setWordProb(this.w5, 0.5);
            this.passive.setWordProb(this.w6, 0.4);
        },

        "test get active voc": function () {
            assertSame(this.active, this.vocabularies.active());
        },

        "test get passive voc": function () {
            assertSame(this.passive, this.vocabularies.passive());
        },

        "test swap most known active word with least known passive word if diff greater than schmidt trigger": function () {
            this.vocabularies.swapMostAndLeastKnownWords();

            assertEquals([
                this.w6,
                this.w3,
                this.w2
            ], this.active.toArray());

            assertEquals([
                this.w5,
                this.w4,
                this.w1
            ], this.passive.toArray());

        },

        "test default schmidt trigger": function () {
            assertEquals(0.25, vocabularies.schmidtTrigger());
        },

        "test set schmidt trigger": function () {
            vocabularies.setSchmidtTrigger(0.5);
            assertEquals(0.5, vocabularies.schmidtTrigger());
        },

        "test get next word": function () {

            //assertEquals();
            //assertSame(this.w3, this.vocabularies.nextWord());
        }

//        "test add the word test result": function () {
//            vocabularies.addTestResult(this.);
//        }

    });
}());
