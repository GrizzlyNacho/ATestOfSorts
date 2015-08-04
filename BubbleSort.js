/**
 * Standard Bubble sort.
 * Operates in O(n*n) time.
 * @param {Array} numberSet
 * @param {Function} drawFunction
 */
var BubbleSort = function BubbleSort(numberSet, drawFunction) {
        this.__maxLength = numberSet.length;
        this.__position = 0;
        this.__iterationContainsChange = 0;
        this.__iterationCount = 0;

        this.__numberSet = numberSet;
        this.__util = new Util();
        this.__draw = drawFunction;

        this.step();
};

/**
 * Perform one step of the sort.
 */
BubbleSort.prototype.step = function step() {
    if (this.__position >= this.__maxLength) {
        if (!this.__iterationContainsChange) {
            // We have finished a full iteration without changing any values.
            // We are sorted.
            console.log("Bubble Sort terminated after "
                + (this.__iterationCount * this.__maxLength + this.__position)
                + " steps.");
            // Draw the last state
            this.__draw(
                [{
                    numberSet: this.__numberSet,
                }]
            );
            return;
        }
        this.__position = 0;
        this.__iterationCount ++;
        this.__iterationContainsChange = false;
    }

    var changeOccurred = false;
    if (this.__numberSet[this.__position] > this.__numberSet[this.__position+1]) {
        this.__util.swap(this.__numberSet, this.__position, this.__position+1);
        this.__iterationContainsChange = true;
        changeOccurred = true;
    }

    this.__position += 1;
    if (changeOccurred) {
        this.__draw(
            [{
                numberSet: this.__numberSet,
                alteredIndices: [this.__position, this.__position+1],
            }],
            this.step.bind(this)
        );
    } else {
        setTimeout(this.step.bind(this), 0);
    }
}
