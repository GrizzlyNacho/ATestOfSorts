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
};

/**
 * Does a shallow merge of master over slave.
 * The resultant object will have all the properties of slave and master
 * The value of each property will be master if available, or slave if not.
 * @param {Object} slave
 * @param {Object} master
 * @return {Object}
 */
Util.prototype.shallowMerge = function shallowMerge(slave, master) {
	var result = {};
	var slaveKeys = Object.keys(slave);
	var masterKeys = Object.keys(master);
	for(var idxSlave = slaveKeys.length - 1; idxSlave >= 0; idxSlave--) {
		result[slaveKeys[idxSlave]] = slave[slaveKeys[idxSlave]];
	}
	for(var idxMaster = masterKeys.length - 1; idxMaster >= 0; idxMaster--) {
		result[masterKeys[idxMaster]] = master[masterKeys[idxMaster]];
	}
	return result;
};
