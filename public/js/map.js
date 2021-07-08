var mapPlayTimeStats = {}
vals = []
names = []
for (var key in window.playerStats) {
    if (key.endsWith(".accum.iPlayTime") && !window.CLASSES.some(substring => key.includes(substring)) && !key.endsWith(".mvm.accum.iPlayTime") && window.playerStats[key] != 0) {
        mapPlayTimeStats[key.substring(0, key.length - 16)] = window.playerStats[key];
    }
}

var items = Object.keys(mapPlayTimeStats).map(function (key) {
    return [key, mapPlayTimeStats[key]];
});

items.sort(function (first, second) {
    return second[1] - first[1];
});
mapPlayTimeStats = items;

Object.entries(mapPlayTimeStats).forEach((element) => {
    vals.push((element[1][1] / 3600).toFixed(2));
    names.push((element[1][0]));
});

let mapChartCanvas = document.getElementById("mapChart").getContext("2d");
let mapChart = new Chart(mapChartCanvas, {
    type: "bar",
    data: {
        labels: names,
        datasets: [{
            data: vals,
            backgroundColor: [
                'rgb(184,56,59)',
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
                text: "Hours Played"
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
                        size: 14
                    }
                }
            }
        }
    }
});