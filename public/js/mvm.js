let mvmClassMaxChart;
let mvmClassAccumChart;

document.getElementById("numericalStat_RobotsKills").innerHTML = window.playerStats['TF_MVM_KILL_ROBOT_MEGA_GRIND_STAT']
document.getElementById("numericalStat_Money").innerHTML = window.playerStats['TF_MVM_COLLECT_MONEY_GRIND_STAT']

function initMvmCharts() {
    let mvmClassMaxChartCanvas = document.getElementById("mvmClassMaxChart").getContext("2d");
    mvmClassMaxChart = new Chart(mvmClassMaxChartCanvas, {
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

    var mvmClassAccumChartCanvas = document.getElementById("mvmClassAccumChart").getContext("2d");
    mvmClassAccumChart = new Chart(mvmClassAccumChartCanvas, {
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

initMvmCharts();

window.CLASSES.forEach((element) => document.getElementById(`mvm_class_stat_${element}`).addEventListener("click", function () { showNewMvmClassStats(element) }));
showNewMvmClassStats("Scout");

function showNewMvmClassStats(className) {
    window.CLASSES.forEach(function (item) {
        document.getElementById(`mvm_class_stat_${item}`).src = item == className ? `/img/class_icons_blu/${item}.png` : `/img/class_icons/${item}.png`;
    });

    maxMvmData = {}
    maxMvmVals = []
    accumMvmData = {}
    accumMvmVals = []

    for (var key in window.playerStats) {
        if (key.startsWith(`${className}.mvm.max.i`) && window.playerStats[key] != 0) {
            maxMvmData[key.substr(`${className}.mvm.max.i`.length).replace(/([A-Z]+)/g, " $1")] = window.playerStats[key];
        }
        if (key.startsWith(`${className}.mvm.accum.i`) && window.playerStats[key] != 0) {
            accumMvmData[key.substr(`${className}.mvm.accum.i`.length).replace(/([A-Z]+)/g, " $1")] = window.playerStats[key];
        }
    }

    Object.entries(maxMvmData).forEach(([key, value]) => {
        maxMvmVals.push(value);
    });

    Object.entries(accumMvmData).forEach(([key, value]) => {
        accumMvmVals.push(value);
    });

    mvmClassMaxChart.data.datasets[0]["data"] = maxMvmVals;
    mvmClassMaxChart.data.labels = Object.keys(maxMvmData);
    mvmClassAccumChart.data.datasets[0]["data"] = accumMvmVals;
    mvmClassAccumChart.data.labels = Object.keys(accumMvmData);

    mvmClassMaxChart.update()
    mvmClassAccumChart.update()
}
