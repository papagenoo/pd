function Word(word, translations, examples) {
    this._word = word;
    this._translations = translations;
    this._examples = examples;
}

Word.prototype = {
    getWord: function () {
        return this._word;
    },

    getTranslations: function () {
        return this._translations;
    },

    getExamples: function () {
        return this._examples;
    },

    /**
     *
     * @param wordTestResults массив ответов [[ timestamp, isRight ]]
     * @param now
     * @returns {number}
     */
    estimateCorrectAnswerProbability: function (wordTestResults, now, worstWordProb) {
        var count = wordTestResults.length;
        var lastAnswerTimestamp = wordTestResults ? wordTestResults.last()[0] : 0;
        // Если вопрос был задан менее 30 секунд назад, то этот вопрос мы больше не хотим
        if (dateUtils.secondsFromTimestamp(now - lastAnswerTimestamp) < 30)
            return null;

        var totalWeight = 0;
        var weightedSum = 0;
        for (var a in wordTestResults) {
            var hours = dateUtils.hoursFromTimestamp(a.timestamp - now);
            var weight = statisticUtils.gaussianDistribution(hours, statisticUtils.gauss_expecation, statisticUtils.gauss_sigma);
            totalWeight += weight;
            var ans = a.right ? 1 : 0;
            weightedSum += ans * weight;
        }
        // В нормальном случае мы просто должны поделить weighted_sum на total_weight.
        // Но total_weight может быть 0
        var freq = 0;
        // Если это совсем новое слово, дадим ему случайную низкую вероятность,
        // чтобы для совсем новых слов был эффект ранжирования
        if (totalWeight === 0)
            return 0;
        else
            freq = weightedSum / totalWeight;

        // Домножим теперь на модификатор достоверности
        var sigmaMul = Math.sqrt(2 * Math.PI * statisticUtils.gauss_sigma);
        return freq * (1 - 1 / (1 + Math.sqrt(sigmaMul * totalWeight)));
    }

};