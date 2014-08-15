(function () {
    var testResultsForWord = pd.words.testResultsForWord;

    TestCase("testResultsForWordTest", {
        setUp: function () {
            this.tr1 = [ new Date('2014.08.10 12:00:00').getTime(), false ];
            this.tr2 = [ new Date('2014.08.10 12:30:00').getTime(), true ];
            this.testResults = testResultsForWord.create([ this.tr2, this.tr1 ]);
        },

        "test create empty sorted list": function () {
            var testResults = testResultsForWord.create();
            assertEquals([], testResults.toArray());
            assertEquals(null, testResults.first());
            assertEquals(null, testResults.last());
        },

        "test initial create": function () {
            assertEquals([ this.tr1, this.tr2 ], this.testResults.toArray());
        }
    });
}());