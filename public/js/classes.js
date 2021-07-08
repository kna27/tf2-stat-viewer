let classMaxChart;
let classAccumChart;

function initCharts() {
    let classMaxChartCanvas = document.getElementById("classMaxChart").getContext("2d");
    classMaxChart = new Chart(classMaxChartCanvas, {
        type: "bar",
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    'rgb(88,133,162)',
                ],
            }],

        },
        options: {
            indexAxis: 'y',
            responsive: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    font: {
                        size: 22
                    },
                    text: "Maximum Stats",
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
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    'rgb(88,133,162)',
                ]
            }],

        },
        options: {
            indexAxis: 'y',
            responsive: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    font: {
                        size: 22
                    },
                    text: "Total Stats"
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

    window.CLASSES.forEach(function (item) {
        document.getElementById(`class_stat_${item}`).src = item == className ? `/img/class_icons_blu/${item}.png` : `/img/class_icons/${item}.png`;
    });

    maxData = {}
    maxVals = []
    accumData = {}
    accumVals = []

    for (var key in window.playerStats) {
        if (key.startsWith(`${className}.max.i`) && window.playerStats[key] != 0) {
            maxData[key.substr(`${className}.max.i`.length).replace(/([A-Z]+)/g, " $1")] = window.playerStats[key];
        }
        if (key.startsWith(`${className}.accum.i`) && window.playerStats[key] != 0) {
            accumData[key.substr(`${className}.accum.i`.length).replace(/([A-Z]+)/g, " $1")] = window.playerStats[key];
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