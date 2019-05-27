const Printer = require("./Printer");
const Process = require('./Process');
const findTAT = require('./Utils').findTAT;

function run(processes) {
    compilationTime = 0,
        t = 0, // will present the time consumption
        completedProcesses = 0, // number of completed processes
        totalProcessCount = processes.length,
        minBT = 9999999999, // since we want to choose the process with minimum burst time we need to find minBT
        isAnyArrived = false, // to check if any processes arrived to the ready queue
        minIndex = -1, // will hold the process with minBT
        waitingTime = [],  // return value of the function
        burstTime = [], // will hold current burst times of processes
        compilationTimeOfEach = [],  // will hold compilation time of each process
        isFirstTime = [];  // we'll use that array to figure out current dispatch is the first dispatch of the processs. Then will be used to calc. response time.

    // copy the burst times to an array
    burstTime = processes.map(p => p.burstTime);

    // initialize the isFirstTime array with default true values
    processes.forEach((p, i) => isFirstTime[i] = true);

    while (completedProcesses < totalProcessCount) {

        // find the process with minimum burst time and its index.
        // Greedy Approach
        burstTime.forEach((bt, i) => {
            if (processes[i].arrivalTime <= t && bt < minBT && bt > 0) {
                isAnyArrived = true;
                minIndex = i;
                minBT = bt
            }
        });

        // if there is no process arrived, increase the time and continue to the next step of loop.
        if (!isAnyArrived) {
            t++;
            continue;
        }

        // increase t by the burst time and consume the process in CPU
        t += burstTime[minIndex];

        // since the CPU finished the process, clean the bust time value
        burstTime[minIndex] = 0;

        // since the alg. is non-preemtive, a process cannot be switched. so compilation time = t
        waitingTime[minIndex] = t - (processes[minIndex].burstTime + processes[minIndex].arrivalTime);


        // if the process didn't wait at all, it will be calculated as minus value. So we fix that.
        if (waitingTime[minIndex] < 0) waitingTime[minIndex] = 0;


        // set the compilation time
        compilationTimeOfEach[minIndex] = t;

        // we finished the arrived one so for the rest arrivals clean the value.
        isAnyArrived = false;

        // reset the value to find minimum again
        minBT = 9999999999;

        // incrase the completed process number
        completedProcesses++;

    }
    return {
        processes,
        waitingTime,
        responseTime: waitingTime, // since it's non-preemtive, wt = rt
        compilationTimeOfEach,
        turnaroundTimes: findTAT(processes.map(p => p.burstTime), waitingTime)
    };
}

const res = run(
    [new Process(0, 7),
    new Process(2, 4),
    new Process(4, 1),
    new Process(5, 4)
    ]
);
Printer(res.processes, res);

