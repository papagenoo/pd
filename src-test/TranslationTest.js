TestCase("translationTest", {
//    setUp: function () {
//    },
//
//    tearDown: function () {
//    },
//
    "test add new meaning and get synonyms": function () {
        var translation = new Translation();
        translation.addMeaning(['папа', 'отец']);
        assertEquals(['папа', 'отец'], translation.getSynonyms(0));
        translation.addMeaning(['мама', 'мать']);
        assertEquals(['мама', 'мать'], translation.getSynonyms(1));
    },

    "test numberOfMeanings": function () {
        var translation = new Translation();
        translation.addMeaning(['папа', 'отец']);
        assertEquals(1, translation.numberOfMeanings());
        translation.addMeaning(['мама']);
        assertEquals(2, translation.numberOfMeanings());
    },

    "test add synonym": function () {
        var translation = new Translation();
        translation.addMeaning(['папа']);
        translation.addSynonym(0, ['отец']);
        assertEquals(['папа', 'отец'], translation.getSynonyms(0));
    },

    'test getAllForms': function () {
        var translation = new Translation();
        translation.addMeaning(['папа', 'отец']);
        translation.addMeaning(['father']);
        assertEquals(['папа', 'отец', 'father'], translation.getAllForms());
    }
});