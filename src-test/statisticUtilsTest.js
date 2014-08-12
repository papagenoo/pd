TestCase("statisticUtilsTest", {
    "test GaussianDistribution": function () {
        assertEquals(0.10798193302637613, statisticUtils.gaussianDistribution(-1, -2, 0.5));
    }
});