(function () {

    var testResults = pd.words.testResults;
    var dateUtils = pd.util.dateUtils;

    TestCase("testResultsTest", {
        setUp: function () {
            this.testResults = testResults.create();
        },

        "test add new test result": function () {
            var ts1 = dateUtils.timestampFromDateString('2014.08.10 12:00:00');
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
            assertEquals([], this.testResults.resultsForWordAsArray('NON_EXISTENT'));
            assertEquals(results1, this.testResults.resultsForWordAsArray('der Vater'));
            assertEquals(results2, this.testResults.resultsForWordAsArray('die Muter'));
        },

        "test get last chronological test result": function () {
            var ts1 = new Date('2014.08.10 12:00:00').getTime();
            var ts2 = new Date('2014.08.10 12:15:00').getTime();
            var ts3 = new Date('2014.08.10 12:30:00').getTime();
            var ts4 = new Date('2014.08.10 12:35:00').getTime();
            this.testResults.addResultForWord('der Vater', ts1, false);
            this.testResults.addResultForWord('der Vater', ts3, true);
            this.testResults.addResultForWord('die Muter', ts4, true);
            // Добавляем более раннюю дату после поздней
            // - метод всё равно должен вернуть последнюю дату по хронологии
            this.testResults.addResultForWord('die Muter', ts2, false);
            assertEquals([], this.testResults.resultsForWordAsArray('NON_EXISTENT'));
            assertEquals(ts3, this.testResults.lastResultTimestamp('der Vater'));
            assertEquals(ts4, this.testResults.lastResultTimestamp('die Muter'));
        }
    });

}());
