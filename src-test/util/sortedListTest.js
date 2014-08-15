(function () {

    var sortedList = pd.util.sortedList;

    TestCase("sortedListTest", {

        setUp: function () {
            this.sortedList = sortedList.create();
            this.sortedList.insert(4);
            this.sortedList.insert(1);
            this.sortedList.insert(3);
            this.sortedList.insert(2);
        },

        "test create empty sorted list": function () {
            var sl = sortedList.create();
            assertEquals([], sl.toArray());
            assertEquals(null, sl.first());
            assertEquals(null, sl.last());
        },

        "test create initial sorted list": function () {
            var sl = sortedList.create([4, 1, 3, 2]);
            assertEquals([1, 2, 3, 4], sl.toArray());
        },

        "test create insert few": function () {
            var sl = sortedList.create([4, 1, 3, 2]);
            sl.insertFew([7, 9]);
            assertEquals([1, 2, 3, 4, 7, 9], sl.toArray());
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
            var sl = sortedList.create([
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
            ], sl.toArray());
        },

        'test length': function () {
            assertEquals(4, this.sortedList.length());
        }

    });

}());
