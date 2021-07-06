playerStats = window.playerStats;
//--- CLASS STATS ---//

showNewClassStats("Scout");
window.CLASSES.forEach((element) => document.getElementById(`class_stat_${element}`).addEventListener("click", function () { showNewClassStats(element) }));

let classMaxChartCanvas = document.getElementById("classMaxChart").getContext("2d");
var classMaxChart = new Chart(classMaxChartCanvas, {
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
var classAccumChart = new Chart(classAccumChartCanvas, {
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