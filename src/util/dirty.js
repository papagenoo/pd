(function () {

    function setDirty() {
        this._dirty = true;
    }

    function isDirty() {
        return this._dirty || false;
    }

    function callIfDirty(callback) {
        if (this.isDirty()) {
            this._dirty = false;
            callback.call(this);
        }
    }

    function setNotDirty() {
        this._dirty = false;
    }

    pd.namespace('util').dirty = {
        setDirty: setDirty,
        isDirty: isDirty,
        callIfDirty: callIfDirty,
        setNotDirty: setNotDirty
    }

}());