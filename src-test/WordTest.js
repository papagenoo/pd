TestCase("WordTest", {
    "test add new meaning and get synonyms": function () {
        var translations = new Translation();
        translations.addMeaning(['папа', 'отец']);
        translations.addMeaning(['father']);
        var examples = ['Ich liebe meinen Vater.', 'Er liebt den Vater.', 'Mein Vater hat ein teueres Auto.'];
        var word = new Word('der Vater', translations, examples/*, serviceInfo, testStatistics*/);
        assertEquals('der Vater', word.getWord());
        assertEquals(translations, word.getTranslations());
        assertEquals(examples, word.getExamples());
    }
});