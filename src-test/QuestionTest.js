TestCase("QuestionTest", {
    setUp: function () {
        var translations = new Translation();
        translations.addMeaning(['папа', 'отец']);
        translations.addMeaning(['father']);
        var examples = ['Ich liebe meinen Vater.', 'Er liebt den Vater.', 'Mein Vater hat ein teueres Auto.'];
        this.textWord = 'der Vater';
        this.word = new Word(this.textWord, translations, examples/*, serviceInfo, testStatistics*/);

        var compareWordsCallback = function (w1, w2) {
            return w1 === w2;
        };

        this.question = new Question(this.word, compareWordsCallback);
    },

    "test create question": function () {
        var word = this.word;
        var question = this.question;
        assertEquals(word, question.getWord());
        assertEquals(true, question.verifyAnswer('папа'));
        assertEquals(true, question.verifyAnswer('отец'));
        assertEquals(true, question.verifyAnswer('father'));
        assertEquals(false, question.verifyAnswer('qwerty'));
    },

    "test ": function () {
        var question = this.question;
        var textWord = this.textWord;
        assertEquals(true, question.verifyAnswerInverse(textWord));
        assertEquals(false, question.verifyAnswerInverse('qwerty'));
    }
});