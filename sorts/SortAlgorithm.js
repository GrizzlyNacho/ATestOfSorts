/**
 * A generic start point for sorting methods.
 * @param {Array} startingData
 * @param {Function} drawFunction
 */
var SortAlgorithm = function SortAlgorithm(startingData, drawFunction) {
    this._numberSet = startingData;
    this._maxLength = startingData.length;
    this._draw = drawFunction;
    this._util = new Util();
};

/**
 * Perform one step of the sorting algorithm.
 * This should handle calling draw whenever a change is made.
 */
SortAlgorithm.prototype.step = function step() {
    console.error("Step was not overridden");
};
