(function () {

    var word = pd.words.word;

    TestCase("WordTest", {
        setUp: function () {
            this.translations = {};
            this.examples = [];
            this.wordName = 'der Vater';
            this.word = word.create(this.wordName, this.translations, this.examples/*, serviceInfo, testStatistics*/);
        },

        "test get word name": function () {
            assertEquals(this.wordName, this.word.getWord());
        },

        "test get translations": function () {
            assertEquals(this.translations, this.word.getTranslations());
        },

        "test get examples": function () {
            assertEquals(this.examples, this.word.getExamples());
        },

//        "test estimate correct answer probability must be null if < 30 sec after last answer": function () {
//            var w = word.create('der Vater', {}, []);
//            var now = new Date('2014.08.10 12:30:20').getTime();
//            var answers = [
//                [ new Date('2014.08.10 12:00:00').getTime(), true ],
//                [ new Date('2014.08.10 12:30:00').getTime(), true ],
//            ];
//            var testResults = testResultsForWord.create(answers);
//            //assertEquals(0, word.estimateCorrectAnswerProbability(testResults, now, null));
//        }//,

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