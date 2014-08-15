(function () {
    var date = pd.util.date;

    TestCase("dateUtilsTest", {
        setUp: function () {
            this.timestamp = 1407681915365;
        },

        "test get seconds from timestamp": function () {
            assertEquals(1407681915, date.secondsFromTimestamp(this.timestamp));
        },

        "test get hours from timestamp": function () {
            assertEquals(391022, date.hoursFromTimestamp(this.timestamp));
        },

        "test get timestamp from date string": function () {
            assertEquals(1407657600000, date.timestampFromDateString('2014.08.10 12:00:00'));
        }
    });
}());