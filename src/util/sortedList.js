(function () {

    function _arr(sortedList) {
        if (!sortedList._arr)
            sortedList._arr = [];
        return sortedList._arr;
    }

    /**
     * Для сортировки - если что-то добавилось, нужно пересортировать
     * @private
     */
    function _setDirty(sortedList) {
        sortedList._dirty = true;
    }

    function insert(val) {
        var arr = _arr(this);
        arr.push(val);
        _setDirty(this);
    }

    function insertFew(vals) {
        for (var i = 0, l = (vals || []).length; i < l; i++)
            this.insert(vals[i]);
    }

    function first() {
        _ensureSort(this);
        var arr = _arr(this);
        return arr.length ? arr[0] : null;
    }

    function last() {
        _ensureSort(this);
        var arr = _arr(this);
        return arr.length ? arr[arr.length - 1] : null;
    }

    /**
     * Преобразовать в обычный массив
     * @returns {Array}
     */
    function toArray() {
        _ensureSort(this);
        return _arr(this).slice();
    }

    function _ensureSort(sortedList) {
        if (sortedList._dirty) {
            sortedList._dirty = false;
            _sort(sortedList);
        }
    }

    function _sort(sortedList) {
        var arr = _arr(sortedList);
        arr.sort(sortedList._compare);
    }

    function defaultCompare(a, b) {
        return (a === b ? 0 : (a < b ? -1 : 1));
    }

    function length() {
        return _arr(this).length;
    }

    var sortedList = {
        insert: insert,
        insertFew: insertFew,
        first: first,
        last: last,
        toArray: toArray,
        length: length,
        _compare: defaultCompare
    };

    pd.namespace('util').sortedList = {
        create: function (initial, compare) {
            var sl = Object.create(sortedList);
            if (Array.isArray(initial))
                sl.insertFew(initial);
            if (typeof compare === 'function')
                sl._compare = compare;
            return sl;
        }
    };

}());