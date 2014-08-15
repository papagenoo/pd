(function () {
    var dateUtils = pd.util.dateUtils;

    TestCase("dateUtilsTest", {
        setUp: function () {
            this.timestamp = 1407681915365;
        },

        "test get seconds from timestamp": function () {
            assertEquals(1407681915, dateUtils.secondsFromTimestamp(this.timestamp));
        },

        "test get hours from timestamp": function () {
            assertEquals(391022, dateUtils.hoursFromTimestamp(this.timestamp));
        },

        "test get timestamp from date string": function () {
            assertEquals(1407657600000, dateUtils.timestampFromDateString('2014.08.10 12:00:00'));
        }
    });
}());