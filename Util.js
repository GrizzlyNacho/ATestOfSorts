/**
 * Utility class for generic functions.
 */
var Util = function util() {};

/**
 * Swap two values in a dataSet
 * @param {Array} dataSet
 * @param {int} idxA
 * @param {int} idxB
 */
Util.prototype.swap = function swap(dataSet, idxA, idxB) {
    var temp = dataSet[idxA];
    dataSet[idxA] = dataSet[idxB];
    dataSet[idxB] = temp;
}
