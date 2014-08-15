(function () {

    function gaussianDistribution(x, expect, sigma) {
        var koef = 1 / (sigma * Math.sqrt(2 * Math.PI));
        var xMinusExpect = x - expect;
        var avg_shift = -(xMinusExpect) * (xMinusExpect);
        var sigma_koef = 2 * sigma * sigma;
        var exp = Math.exp(avg_shift / sigma_koef);
        return koef * exp;
    }

    pd.namespace('util').statistic = {
        gaussianDistribution: gaussianDistribution,
        gauss_expecation: 0,
        gauss_sigma: 0
    };

}());