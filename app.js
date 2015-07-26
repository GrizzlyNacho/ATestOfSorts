/**
 * A class to manage and draw the data set.
 */
var SortManager = function createSortManager() {
    this.__numberSet = [];
    this.__timeDelay = 10;
    this.__arraySize = 25;
    this.__canvasReference = document.getElementById("sortCanvas");
    this.__canvasContext = this.__canvasReference.getContext("2d");
    this.scrambleList();
    this.drawState();
};

/**
 * Adjust and re-initialize the data set
 * @param {int} newSize
 */
SortManager.prototype.onArraySizeChange = function onArraySizeChange(newSize) {
    this.__numberSet.length = 0;
    this.__arraySize = newSize;
    this.scrambleList();
};

/**
 * Randomize the data set
 */
SortManager.prototype.scrambleList = function scrambleList() {
    for (var idxPosition = 0; idxPosition < this.__arraySize; idxPosition++) {
        this.__numberSet[idxPosition] = Math.random();
    }
};

/**
 * Draw the current state of the data set and then call the callback
 * @param @optional {Function} callback
 */
SortManager.prototype.drawState = function drawState(callback) {
    this.__canvasContext.clearRect(0, 0,
        this.__canvasReference.width, this.__canvasReference.height);

    this.__canvasContext.fillStyle = "#DCDCDC";
    this.__canvasContext.fillRect(0, 0,
        this.__canvasReference.width, this.__canvasReference.height);

    // Determine the vertical offset.
    // We don't want a line along the top or bottom edge, so we add 2
    var vOffset = this.__canvasReference.height / (this.__arraySize + 2);

    this.__canvasContext.beginPath();
    for (var idxLine = 0; idxLine < this.__arraySize; idxLine++) {
        var y = idxLine * vOffset + vOffset;
        this.__canvasContext.moveTo(0, y);
        this.__canvasContext.lineTo(
            this.__canvasReference.width * this.__numberSet[idxLine], y);
    }
    this.__canvasContext.closePath();

    this.__canvasContext.strokeStyle = "#303030";
    this.__canvasContext.stroke();

    if (callback) {
        callback();
    }
};

/**
 * Draw the state, and then delay before the next iteration.
 * @param {Function} callback
 */
SortManager.prototype.drawAndDelay = function drawAndDelay(callback) {
    var delay = this.__timeDelay;
    this.drawState(function delayedContinue() {
        setTimeout(callback, delay);
    });
}

/**
 * Initialize and thereby start a sorting method on the current Dataset
 * @param {Function} sortClass
 */
SortManager.prototype.startSort = function startSort(sortClass) {
    var sortMethod = new sortClass(this.__numberSet, this.drawAndDelay.bind(this));
}
