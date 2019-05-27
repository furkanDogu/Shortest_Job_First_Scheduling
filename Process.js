// will represent the process id.
let pid = 0;

// Process model
module.exports = function (at, bt) {
    this.arrivalTime = at;
    this.burstTime = bt;
    this.pid = ++pid;
}