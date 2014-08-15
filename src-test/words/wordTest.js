(function () {

    var translation = pd.words.translation;
    var testResultsForWord = pd.words.testResultsForWord;

    TestCase("WordTest", {
        "test add new meaning and get synonyms": function () {
            var t = translation.create();
            t.addMeaning(['папа', 'отец']);
            t.addMeaning(['father']);
            var examples = ['Ich liebe meinen Vater.', 'Er liebt den Vater.', 'Mein Vater hat ein teueres Auto.'];
            var word = new Word('der Vater', t, examples/*, serviceInfo, testStatistics*/);
            assertEquals('der Vater', word.getWord());
            assertEquals(t, word.getTranslations());
            assertEquals(examples, word.getExamples());
        },

        "test estimate correct answer probability must be null if < 30 sec after last answer": function () {
            var word = new Word('der Vater');
            var now = new Date('2014.08.10 12:30:20').getTime();
            var answers = [
                [ new Date('2014.08.10 12:00:00').getTime(), true ],
                [ new Date('2014.08.10 12:30:00').getTime(), true ],
            ];
            var testResults = testResultsForWord.create(answers);
            //assertEquals(0, word.estimateCorrectAnswerProbability(testResults, now, null));
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

}());