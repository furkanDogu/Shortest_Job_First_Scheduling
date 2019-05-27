const utils = {
    // will be used while calculating turnaround time. (TAT = WT + BT)
    findTAT(btArray, wtArray) {
        return wtArray.map((wt, i) => wt + btArray[i]);
    }
}
module.exports = utils;