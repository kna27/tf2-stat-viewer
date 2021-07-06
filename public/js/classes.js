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
    alert(classAccumChart.data.datasets[0]["data"])
}

initCharts();

window.CLASSES.forEach((element) => document.getElementById(`class_stat_${element}`).addEventListener("click", function () { showNewClassStats(element) }));
alert(classAccumChart.data.datasets[0]["data"])
showNewClassStats("Scout");

function showNewClassStats(className) {
    classAccumChart.data.datasets[0]["data"] = [5, 10, 11]
    classAccumChart.update()
}