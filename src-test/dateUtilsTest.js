TestCase("dateUtilsTest", {
    setUp: function () {
        this.timestamp = 1407681915365;
    },

    "test get seconds from timestamp": function () {
        assertEquals(1407681915, dateUtils.secondsFromTimestamp(this.timestamp));
    },

    "test get hours from timestamp": function () {
        assertEquals(391022, dateUtils.hoursFromTimestamp(this.timestamp));
    }//,

//    "test SortedList": function () {
//        var sortedList = new SortedList();
//        sortedList.insertOne(val)
//    }
});