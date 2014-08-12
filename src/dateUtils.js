var dateUtils = (function () {
    return {
        secondsFromTimestamp: function secondsFromTimestamp(ts) {
            return Math.floor(ts/1000);
        },

        hoursFromTimestamp: function hoursFromTimestamp(ts) {
            return Math.floor(ts/3600000);
        }
    };
}());