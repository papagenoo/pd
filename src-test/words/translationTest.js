(function () {
    var translation = pd.words.translation;

    TestCase("translationTest", {
//    setUp: function () {
//    },
//
//    tearDown: function () {
//    },
//
        "test add new meaning and get synonyms": function () {
            var t = translation.create();
            t.addMeaning(['папа', 'отец']);
            assertEquals(['папа', 'отец'], t.getSynonyms(0));
            t.addMeaning(['мама', 'мать']);
            assertEquals(['мама', 'мать'], t.getSynonyms(1));
        },

        "test numberOfMeanings": function () {
            var t = translation.create();
            t.addMeaning(['папа', 'отец']);
            assertEquals(1, t.numberOfMeanings());
            t.addMeaning(['мама']);
            assertEquals(2, t.numberOfMeanings());
        },

        "test add synonym": function () {
            var t = translation.create();
            t.addMeaning(['папа']);
            t.addSynonym(0, ['отец']);
            assertEquals(['папа', 'отец'], t.getSynonyms(0));
        },

        'test getAllForms': function () {
            var t = translation.create();
            t.addMeaning(['папа', 'отец']);
            t.addMeaning(['father']);
            assertEquals(['папа', 'отец', 'father'], t.getAllForms());
        }
    });
}());
