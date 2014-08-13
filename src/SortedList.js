function SortedList(compareCallback, initial) {
    this._compareCallback = compareCallback;
    this._arr = [];
    this.insertFew(initial);
}

//SortedList.prototype = new Array();
//SortedList.prototype.constructor = Array.prototype.constructor;

SortedList.prototype.insert = function (val) {
    this._arr.push(val);
    this._setDirty();
};

SortedList.prototype.insertFew = function (vals) {
    var self = this;
    (vals || []).forEach(function (val) {
        self.insert(val);
    });
    var self = null;
};

/**
 * Преобразовать в обычный массив
 * @returns {Array}
 */
SortedList.prototype.toArray = function () {
    this._ensureSort();
    return this._arr.slice();
};

SortedList.prototype.first = function () {
    this._ensureSort();
    return this._arr.length
        ? this._arr[0]
        : null;
};

SortedList.prototype.last = function () {
    this._ensureSort();
    return this._arr.length
        ? this._arr[this._arr.length - 1]
        : null;
};

SortedList.prototype._ensureSort = function () {
    if (this._dirty) {
        this._dirty = false;
        this._sort();
    }
};

SortedList.prototype._sort = function () {
    this._arr = this._arr.sort(this._compareCallback);
};

/**
 * Для сортировки - если что-то добавилось, нужно пересортировать
 * @private
 */
SortedList.prototype._setDirty = function () {
    this._dirty = true;
};