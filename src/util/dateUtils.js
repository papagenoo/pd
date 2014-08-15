(function () {

    function secondsFromTimestamp(ts) {
        return Math.floor(ts / 1000);
    }

    function hoursFromTimestamp(ts) {
        return Math.floor(ts / 3600000);
    }

    function timestampFromDateString(dateString) {
        return (new Date(dateString)).getTime();
    }

    pd.namespace('util').dateUtils = {
        secondsFromTimestamp: secondsFromTimestamp,
        hoursFromTimestamp: hoursFromTimestamp,
        timestampFromDateString: timestampFromDateString
    }

}());