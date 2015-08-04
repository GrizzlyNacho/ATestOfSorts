/**
 * Standard Insertion sort.
 * Operates in O(n*n) time.
 * @param {Array} startingSet
 * @param {Function} drawFunction
 */
var InsertionSort = function InsertionSort(startingSet, drawFunction) {
        SortAlgorithm.call(this, startingSet, drawFunction);
        this.__createdSet = [];
        this.__position = 0;
        this.step();
};

// Handle Class inheritance
InsertionSort.prototype = Object.create(SortAlgorithm.prototype);
InsertionSort.prototype.constructor = InsertionSort;

/**
 * Perform one step of the sort.
 */
InsertionSort.prototype.step = function step() {
    if (this.__position >= this._maxLength) {
        console.log("Insertion Sort terminated");
        this._draw(
            [{
                numberSet: this._numberSet,
            },
            {
                numberSet: this.__createdSet,
                alteredIndices: [],
            }]
        );
        return;
    }

    var tracePosition = this.__position;
    this.__position++;
    var createdIndex = this.__insertIntoCreated(this._numberSet[tracePosition]);

    this._draw(
        [{
            numberSet: this._numberSet,
            alteredIndices: [tracePosition],
        },
        {
            numberSet: this.__createdSet,
            alteredIndices: [createdIndex],
        }],
        this.step.bind(this)
    );
};

/**
 * Insert the value into the created array in a sorted position
 * and return its position in the created array.
 * @param {Number} insertValue
 * @return {Number}
 */
InsertionSort.prototype.__insertIntoCreated = function __insertIntoCreated(insertValue) {
    if (this.__createdSet.length === 0) {
        this.__createdSet.push(insertValue);
        return 0;
    }

    for(var idx = 0; idx < this.__createdSet.length; idx++) {
        var currentValue = this.__createdSet[idx];
        if (insertValue < currentValue) {
            this.__createdSet.splice(idx, 0, insertValue);
            return idx;
        }
    }

    this.__createdSet.push(insertValue);
    return this.__createdSet.length - 1;

};
