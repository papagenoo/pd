TestCase("WordTest", {
    "test add new meaning and get synonyms": function () {
        var translations = new Translation();
        translations.addMeaning(['папа', 'отец']);
        translations.addMeaning(['father']);
        var examples = ['Ich liebe meinen Vater.', 'Er liebt den Vater.', 'Mein Vater hat ein teueres Auto.'];
        var word = new Word('der Vater', translations, examples/*, serviceInfo, testStatistics*/);
        assertEquals('der Vater', word.getWord());
        assertEquals(translations, word.getTranslations());
        assertEquals(examples, word.getExamples());
    },

    "test estimate correct answer probability must be null if < 30 sec after last answer": function () {
        var word = new Word('der Vater');
        var now = new Date('2014.08.10 12:30:20').getTime();
        var answers = [
            { timestamp: new Date('2014.08.10 12:00:00').getTime(), right: true },
            { timestamp: new Date('2014.08.10 12:30:00').getTime(), right: true },
        ];
        var testResults = new TestResultsForWord(answers);
        //assertNull(word.estimateCorrectAnswerProbability(answers, now, testResults));
    }//,

//
//    "estimate correct answer probability": function () {
//        var word = new Word('der Vater');
//        var answers = [
//            { timestamp: new Date('2014.08.10 12:24:56'), right: true },
//            { timestamp: new Date('2014.08.10 12:34:56'), right: true },
//        ];
//        assertEquals(1, word.estimateCorrectAnswerProbability());
//    }

});