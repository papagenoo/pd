(function () {

}());

TestCase("LoadSampleDataToVocabularyTest", {
    setUp: function () {
        this.vocabulary = new Vocabulary();
        loadSampleDataToVocabulary(this.vocabulary);
    }
});