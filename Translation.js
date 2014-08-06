function Translation() {
	this._translations = [];
	/// <summary>
        /// Получить список синонимов одного из значений
        /// </summary>
        /// <param name="meaning"></param>
        /// <returns></returns>
        public HashSet<string> GetSynonyms(int meaning)
        {
            return _translations[meaning];
        }

        /// <summary>
        /// Добавить переводы для нового значения
        /// </summary>
        /// <param name="transls"></param>
        public void AddNewMeaning(string[] transls)
        {
            int count = _translations.Count;
            _translations.Add(new HashSet<string>());
            foreach (var e in transls)
                _translations[count].Add(e.Trim());
        }

        /// <summary>
        /// Добавить перевод в конкретном значении
        /// </summary>
        /// <param name="meaning"></param>
        /// <param name="transl"></param>
        public void AddSynonym(int meaning, string transl)
        {
            if (!_translations[meaning].Contains(transl))
                _translations[meaning].Add(transl);
        }

        /// <summary>
        /// Количество значений, которое есть у слова
        /// </summary>
        public int NumberOfMeanings
        {
            get { return _translations.Count; }
        }

        /// <summary>
        /// List отвечает за значения. HashSet за синонимы внутри одного значения
        /// </summary>
        List<HashSet<string>> _translations;

        /// <summary>
        /// Максимальное количество ошибок, на которое можно ошибиться во время ввода перевода
        /// </summary>
        public static int MaxLevenshteinDistError = 2;

        /// <summary>
        /// Относительное расстояние между двумя словами (0.5 значит ошибка в каждой их двух букв)
        /// </summary>
        public static double MaxRelativeDistError = 0.25;
}