var util = pd.util;

TestCase("SortedListTest", {

    setUp: function () {
        this.sortedList = util.sortedList();

//        this.compare = function (a, b) {
//            return (a === b
//                    ? 0 : (a < b ? -1: 1));
//        };
//        this.sortedList = new SortedList(this.compare);
        this.sortedList.insert(4);
        this.sortedList.insert(1);
        this.sortedList.insert(3);
        this.sortedList.insert(2);
    },

    "test create empty sorted list": function () {
        var sortedList = util.sortedList();
//        var sortedList = new SortedList(this.compare);
        assertEquals([], sortedList.toArray());
        assertEquals(null, sortedList.first());
        assertEquals(null, sortedList.last());
    },

    "test create initial sorted list": function () {
        var sortedList = util.sortedList([4, 1, 3, 2]);
        assertEquals([1, 2, 3, 4], sortedList.toArray());
    },

    "test create insert few": function () {
        var sortedList = util.sortedList([4, 1, 3, 2]);
        sortedList.insertFew([7, 9]);
        assertEquals([1, 2, 3, 4, 7, 9], sortedList.toArray());
    },

    "test insert in sorted list and toArray()": function () {
        assertEquals([1, 2, 3, 4], this.sortedList.toArray());
    },

    "test get first item": function () {
        assertEquals(1, this.sortedList.first());
    },

    "test get last item": function () {
        assertEquals(4, this.sortedList.last());
    },

    "test compare callback": function () {
        var compare = function (a, b) {
            return (a.v === b.v
                ? 0 : (a.v < b.v ? -1 : 1));
        };
        var sortedList = util.sortedList([
            {v: 4},
            {v: 1},
            {v: 3},
            {v: 2}
        ], compare);
        assertEquals([
            {v: 1},
            {v: 2},
            {v: 3},
            {v: 4}
        ], sortedList.toArray());
    }
});