TestCase("VocabularyTest", {
    setUp: function () {
        this.emptyVocabulary = new Vocabulary();
        this.vocabulary = new Vocabulary();
        this.word1 = new Word('der Park');
        this.word2 = new Word('der Vater');
        this.word3 = new Word('die Mutter');
        this.vocabulary.addWord(this.word1, 0.7);
        this.vocabulary.addWord(this.word2, 0.2);
        this.vocabulary.addWord(this.word3, 0.2);
    },

    "test get vocabulary size": function () {
        assertEquals(0, this.emptyVocabulary.size());
        assertEquals(3, this.vocabulary.size());
    },

    "test get next word in empty vocabulary": function () {
        assertEquals(null, this.emptyVocabulary.nextWord());
    },

    "test get next word": function () {
        assertEquals(this.word2, this.vocabulary.nextWord());
        assertEquals(this.word3, this.vocabulary.nextWord());
        assertEquals(this.word1, this.vocabulary.nextWord());
        assertEquals(this.word2, this.vocabulary.nextWord());
        assertEquals(this.word3, this.vocabulary.nextWord());
        assertEquals(this.word1, this.vocabulary.nextWord());
    }
});