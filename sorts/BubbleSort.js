/**
 * Standard Bubble sort.
 * Operates in O(n*n) time.
 * @param {Array} startingSet
 * @param {Function} drawFunction
 */
var BubbleSort = function BubbleSort(startingSet, drawFunction) {
		SortAlgorithm.call(this, startingSet, drawFunction);
		this.__position = 0;
		this.__iterationContainsChange = 0;
		this.__iterationCount = 0;
		this.step();
};

// Handle Class inheritance
BubbleSort.prototype = Object.create(SortAlgorithm.prototype);
BubbleSort.prototype.constructor = BubbleSort;

/**
 * Perform one step of the sort.
 */
BubbleSort.prototype.step = function step() {
	if (this.__position >= this._maxLength) {
		if (!this.__iterationContainsChange) {
			// We have finished a full iteration without changing any values.
			// We are sorted.
			console.log("Bubble Sort terminated after "
				+ (this.__iterationCount * this._maxLength + this.__position)
				+ " steps.");
			// Draw the last state
			this._draw(
				[{
					numberSet: this._numberSet,
				}]
			);
			return;
		}
		this.__position = 0;
		this.__iterationCount ++;
		this.__iterationContainsChange = false;
	}

	var changeOccurred = false;
	if (this._numberSet[this.__position] > this._numberSet[this.__position+1]) {
		this._util.swap(this._numberSet, this.__position, this.__position+1);
		this.__iterationContainsChange = true;
		changeOccurred = true;
	}

	this.__position += 1;
	if (changeOccurred) {
		this._draw(
			[{
				numberSet: this._numberSet,
				alteredIndices: [this.__position, this.__position+1],
			}],
			this.step.bind(this)
		);
	} else {
		setTimeout(this.step.bind(this), 0);
	}
}
