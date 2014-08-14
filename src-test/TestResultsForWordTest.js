TestCase("TestResultsForWordTest", {
    setUp: function () {
        this.tr1 = { timestamp: new Date('2014.08.10 12:00:00').getTime(), right: false };
        this.tr2 = { timestamp: new Date('2014.08.10 12:30:00').getTime(), right: true };
        this.testResults = new TestResultsForWord([ this.tr2, this.tr1 ]);
    },

    "test create empty sorted list": function () {
        var testResults = new TestResultsForWord();
        assertEquals([], testResults.toArray());
        assertEquals(null, testResults.first());
        assertEquals(null, testResults.last());
    },

    "test initial create": function () {
//        this.testResults.toArray() ;
        //testResults = new TestResultsForWord([ this.tr2, this.tr1 ]);
        //assertEquals([ this.tr1, this.tr2 ], this.testResults._arr);
        this.testResults._sort(true);
        assertEquals([ this.tr1, this.tr2 ], this.testResults.toArray());
        //assertEquals([], this.testResults._arr);
        //assertEquals('function', this.testResults._compareCallback.toString());
    }
});