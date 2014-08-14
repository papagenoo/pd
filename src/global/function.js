/*jslint indent: 2, nomen: false, onevar: false, eqeqeq: false*/
/*globals tddjs*/
if (!Function.prototype.inherit) {
  (function () {
    function F() {}

    Function.prototype.inherit = function (superFn) {
      F.prototype = superFn.prototype;
      this.prototype = new F();
      this.prototype.constructor = this;
      this.prototype._super = superFn.prototype;
    };
  }());
}