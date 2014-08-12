TestCase("TestResultsTest", {
    setUp: function () {
        this.testResults = new TestResults();
    },

    "test add new test result": function () {
        var ts1 = new Date('2014.08.10 12:00:00').getTime();
        var ts2 = new Date('2014.08.10 12:15:00').getTime();
        var ts3 = new Date('2014.08.10 12:30:00').getTime();
        var ts4 = new Date('2014.08.10 12:35:00').getTime();
        this.testResults.addResultForWord('der Vater', ts1, false);
        this.testResults.addResultForWord('die Muter', ts2, false);
        this.testResults.addResultForWord('der Vater', ts3, true);
        this.testResults.addResultForWord('die Muter', ts4, true);
        var results1 = [
            [ts1, false],
            [ts3, true]
        ];
        var results2 = [
            [ts2, false],
            [ts4, true]
        ];
        assertEquals([], this.testResults.resultsForWord('NON_EXISTENT'));
        assertEquals(results1, this.testResults.resultsForWord('der Vater'));
        assertEquals(results2, this.testResults.resultsForWord('die Muter'));
    },

    "test get last test result": function () {
        var ts1 = new Date('2014.08.10 12:00:00').getTime();
        var ts2 = new Date('2014.08.10 12:15:00').getTime();
        var ts3 = new Date('2014.08.10 12:30:00').getTime();
        var ts4 = new Date('2014.08.10 12:35:00').getTime();
        this.testResults.addResultForWord('der Vater', ts1, false);
        this.testResults.addResultForWord('die Muter', ts2, false);
        this.testResults.addResultForWord('der Vater', ts3, true);
        this.testResults.addResultForWord('die Muter', ts4, true);
        assertNull(this.testResults.lastResultForWord('NON_EXISTENT'));
        assertEquals([ts3, true], this.testResults.lastResultForWord('der Vater'));
        assertEquals([ts4, true], this.testResults.lastResultForWord('die Muter'));

    }
});