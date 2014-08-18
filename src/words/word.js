(function () {

    var date = pd.util.date;
    var statistic = pd.util.statistic;

    function getWord() {
        return this._word;
    }

    function getTranslations() {
        return this._translations;
    }

    function getExamples() {
        return this._examples;
    }

    /**
     *
     * @param wordTestResults массив ответов [[ timestamp, isRight ]]
     * @param now
     * @returns {number}
     */
    function estimateCorrectAnswerProbability(wordTestResults, now, worstWordProb) {
        var gauss_expecation = statistic.gauss_expecation;
        var gauss_sigma = statistic.gauss_sigma;
        var schmidt_trigger = 0.25;
        var lastAnswerTimestamp = wordTestResults
                                    ? wordTestResults.last()[0]
                                    : 0;
        var totalWeight = 0;
        var weightedSum = 0;
        for (var a in wordTestResults) {
            var hours = date.hoursFromTimestamp(a.timestamp - now);
            var weight = statistic.gaussianDistribution(hours, gauss_expecation, gauss_sigma);
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
        var sigmaMul = Math.sqrt(2 * Math.PI * gauss_sigma);
        var res = freq * (1 - 1 / (1 + Math.sqrt(sigmaMul * totalWeight)));
        // Если вопрос был задан менее 30 секунд назад, то этот вопрос мы больше не хотим
        // Избавиться от него мы можем переоценив его к верхней допустимой границе (ниже пассивных слов)
        // или еще выше, если того заслуживаем
        if (date.secondsFromTimestamp(now - lastAnswerTimestamp) < 30 && worstWordProb)
            return Math.max(Math.max(worstWordProb - 0.0001, schmidt_trigger - 0.0001), res);
        return res;
    }

    /*    EstimateCorrectAnswerProbability: function(wi, now, first_in)
     {
     Statistics stat = wi.TestStatistics;
     var answers = stat.Answers;
     int count = answers.Count;
     DateTime last_answer_dt = count == 0 ? DateTime.MinValue : answers.ElementAt(count - 1).Key;

     double total_weight = 0;
     double weighted_sum = 0;
     foreach (var a in answers)
     {
     TimeSpan time_shift = a.Key - now;
     double total_hours = time_shift.TotalHours;
     double weight = Utilities.GaussianDistribution(total_hours, Statistics.gauss_expecation, Statistics.gauss_sigma);
     total_weight += weight;
     int ans = a.Value == true ? 1 : 0;
     weighted_sum += ans * weight;
     }
     // В нормальном случае мы просто должны поделить weighted_sum на total_weight. Но total_weight может быть 0
     double freq = 0;
     // Если это совсем новое слово, дадим ему случайную низкую вероятность, чтобы для совсем новых слов был эффект ранжирования
     if (total_weight == 0)
     return 0;
     else
     freq = weighted_sum / total_weight;

     // Домножим теперь на модификатор достоверности
     double sigma_mult = Math.Sqrt(2 * Math.PI * Statistics.gauss_sigma);
     double ret = freq * (1 - 1 / (1 + Math.Sqrt(sigma_mult * total_weight)));


     // Если вопрос был задан менее 30 секунд назад, то этот вопрос мы больше не хотим
     // Избавиться от него мы можем переоценив его к верхней допустимой границе (ниже пассивных слов)
     // или еще выше, если того заслуживаем
     if (now - last_answer_dt < TimeSpan.FromSeconds(30) && !first_in)
     return Math.Max(Math.Max(_passive_words.ElementAt(0).Key - 0.0001, schmidt_trigger - 0.0001), ret);




     return ret;
     }*/

    var word = {
        getWord: getWord,
        getTranslations: getTranslations,
        getExamples: getExamples,
        estimateCorrectAnswerProbability: estimateCorrectAnswerProbability
    };

    pd.namespace('words').word = {
        create: function (wordName, translations, examples) {
            var newWord = Object.create(word);
            newWord._word = wordName;
            newWord._translations = translations;
            newWord._examples = examples;
            return newWord;
        }
    }

}());
