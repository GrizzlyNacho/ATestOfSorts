/**
 * A class to manage and draw the data set.
 */
var SortManager = function createSortManager() {
    this.__util = new Util();
    this.__numberSet = [];
    this.__timeDelay = 10;
    this.__arraySize = 25;
    this.__canvasReference = document.getElementById("sortCanvas");
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
    var canvasContext = this.__canvasReference.getContext("2d");
    canvasContext.clearRect(0, 0,
        this.__canvasReference.width, this.__canvasReference.height);

    canvasContext.fillStyle = "#DCDCDC";
    canvasContext.fillRect(0, 0,
        this.__canvasReference.width, this.__canvasReference.height);
    canvasContext.lineWidth = 3;
    this.__drawArrayInCanvas(this.__canvasReference, this.__numberSet, {});

    if (callback) {
        callback();
    }
};

/**
 * Draw an array state in canvas
 * @param {DOM} canvasReference
 * @param {Array} arrData
 * @param {Object} props
 *        {Array} alteredIndices
 *        {Number} width
 *        {Number} offsetLeft
 */
SortManager.prototype.__drawArrayInCanvas =
        function __drawArrayInCanvas(canvasRef, arrData, props) {

    var canvasCtx = canvasRef.getContext("2d");
    var arraySize = arrData.length;
    // Populate with defaults if optional props are not present
    props = this.__util.shallowMerge(
        {
            alteredIndices: [],
            width: canvasRef.width,
            offsetLeft: 0,
        },
        props
    );

    // Determine the vertical offset.
    // We don't want a line along the top or bottom edge, so we add 2
    var vOffset = canvasRef.height / (arraySize + 2);
    for (var idxLine = 0; idxLine < arraySize; idxLine++) {
        canvasCtx.beginPath();
        var y = idxLine * vOffset + vOffset;
        canvasCtx.moveTo(props.offsetLeft, y);
        canvasCtx.lineTo(
            props.offsetLeft + props.width * arrData[idxLine], y);
        canvasCtx.closePath();

        if (props.alteredIndices && props.alteredIndices.length > 0
            && props.alteredIndices.indexOf(idxLine) >= 0) {
            canvasCtx.strokeStyle = "#006400";
        } else {
            canvasCtx.strokeStyle = "#303030";
        }
        canvasCtx.stroke();
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
