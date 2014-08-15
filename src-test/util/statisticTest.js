(function () {

    var statistic = pd.util.statistic;

    TestCase("statisticUtilsTest", {
        "test GaussianDistribution": function () {
            assertEquals(0.10798193302637613, statistic.gaussianDistribution(-1, -2, 0.5));
        }
    });

}());