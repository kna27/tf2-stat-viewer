playerStats = window.playerStats;

//--- MAP STATS ---//

var mapPlayTimeStats = {}
vals = []
for (var key in playerStats) {
    if (key.endsWith(".accum.iPlayTime") && !window.CLASSES.some(substring => key.includes(substring)) && !key.endsWith(".mvm.accum.iPlayTime")) {
        mapPlayTimeStats[key.substring(0, key.length - 16)] = playerStats[key];
    }
}


Object.entries(mapPlayTimeStats).forEach(([key, value]) => {
    vals.push((value / 3600).toFixed(2));
});

let mapChartCanvas = document.getElementById("mapChart").getContext("2d");
let mapChart = new Chart(mapChartCanvas, {
    type: "bar",
    data: {
        labels: Object.keys(mapPlayTimeStats),
        datasets: [{
            data: vals,
            backgroundColor: 'rgb(184, 56, 59)'
        }],
        options: {
            indexAxis: 'y',
            responsive: false,
            title: {
                display: true,
                text: "Map Playtime"
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
    }
});