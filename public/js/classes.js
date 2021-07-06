playerStats = window.playerStats;
//--- CLASS STATS ---//

let classMaxChart;
let classAccumChart;

function initCharts() {
    let classMaxChartCanvas = document.getElementById("classMaxChart").getContext("2d");
    classMaxChart = new Chart(classMaxChartCanvas, {
        type: "bar",
        data: {
            labels: ["a", "b", "c"],
            datasets: [{
                data: [2, 6, 1],
                backgroundColor: [
                    'rgb(88,133,162)',
                ],
            }],

        },
        options: {
            indexAxis: 'y',
            responsive: false,
            title: {
                display: true,
                text: "Class Maximum Stats"
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    type: 'logarithmic',
                    ticks: {
                        font: {
                            size: 15
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: 24
                        }
                    }
                }
            }
        }
    });

    var classAccumChartCanvas = document.getElementById("classAccumChart").getContext("2d");
    classAccumChart = new Chart(classAccumChartCanvas, {
        type: "bar",
        data: {
            labels: ["a", "b", "c"],
            datasets: [{
                data: [1, 5, 2],
                backgroundColor: [
                    'rgb(88,133,162)',
                ],
            }],

        },
        options: {
            indexAxis: 'y',
            responsive: false,
            title: {
                display: true,
                text: "Class Total Stats"
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    type: 'logarithmic',
                    ticks: {
                        font: {
                            size: 15
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: 24
                        }
                    }
                }
            }
        }
    });
}

initCharts();

window.CLASSES.forEach((element) => document.getElementById(`class_stat_${element}`).addEventListener("click", function () { showNewClassStats(element) }));
showNewClassStats("Scout");

function showNewClassStats(className) {
    maxData = {}
    maxVals = []
    accumData = {}
    accumVals = []

    for (var key in playerStats) {
        if (key.startsWith(`${className}.max.i`)) {
            maxData[key.substr(`${className}.max.i`.length).replace(/([A-Z]+)/g, " $1")] = playerStats[key];
        }
        if (key.startsWith(`${className}.accum.i`)) {
            accumData[key.substr(`${className}.accum.i`.length).replace(/([A-Z]+)/g, " $1")] = playerStats[key];
        }
    }

    Object.entries(maxData).forEach(([key, value]) => {
        maxVals.push(value);
    });

    Object.entries(accumData).forEach(([key, value]) => {
        accumVals.push(value);
    });

    classMaxChart.data.datasets[0]["data"] = maxVals;
    classMaxChart.data.labels = Object.keys(maxData);
    classAccumChart.data.datasets[0]["data"] = accumVals;
    classAccumChart.data.labels = Object.keys(accumData);

    classMaxChart.update()
    classAccumChart.update()
}