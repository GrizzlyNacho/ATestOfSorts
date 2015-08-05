/**
 * Standard selection sort.
 * Operates in O(n*n) time.
 * @param {Array} startingSet
 * @param {Function} drawFunction
 */
var SelectionSort = function SelectionSort(startingSet, drawFunction) {
		SortAlgorithm.call(this, startingSet, drawFunction);
		this.__position = 0;
		this.step();
};

// Handle Class inheritance
SelectionSort.prototype = Object.create(SortAlgorithm.prototype);
SelectionSort.prototype.constructor = SelectionSort;

/**
 * Perform one step of the sort.
 */
SelectionSort.prototype.step = function step() {
	if (this.__position >= this._maxLength) {
		console.log("Selection Sort terminated");
		this._draw(
			[{
				numberSet: this._numberSet,
			}]
		);
		return;
	}

	var currentPosition = this.__position;
	var minimumIndex = this.__indexOfMinInRange(currentPosition, this._maxLength);
	this._util.swap(this._numberSet, currentPosition, minimumIndex);
	this.__position++;

	this._draw(
		[{
			numberSet: this._numberSet,
			alteredIndices: [currentPosition, minimumIndex],
		}],
		this.step.bind(this)
	);
};

/**
 * Find the index of the minimum value within the index range given
 * @param {Number} idxStart
 * @param {Number} idxEnd
 */
SelectionSort.prototype.__indexOfMinInRange = 
		function __indexOfMinInRange(idxStart, idxEnd) {
	var min = this._numberSet[idxStart];
	var idxMin = idxStart;

	for (var idxPos = idxStart; idxPos < this._maxLength; idxPos++) {
		if (this._numberSet[idxPos] < min) {
			min = this._numberSet[idxPos];
			idxMin = idxPos;
		}
	}

	return idxMin;
};
