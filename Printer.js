module.exports = function (processes, data) {
    console.log("ProcessID\t\tArrivalTime\t\tBurst time\t\tCT\t\t\tTAT\t\t\tWT\t\t\t\tRT\n");
    processes.forEach((p, i) => {
        console.log(p.pid + "\t\t\t" +
            p.arrivalTime + "\t\t\t" +
            p.burstTime + "\t\t\t" +
            data["compilationTimeOfEach"][i] + "\t\t\t" +
            data["turnaroundTimes"][i] + "\t\t\t" +
            data["waitingTime"][i] + "\t\t\t\t" +
            data["responseTime"][i]
        );
    });
}

