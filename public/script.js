playerStats = window.playerStats;
if (!playerStats == 0) {
    let playtimeChartCanvas = document.getElementById("playtimeChart").getContext("2d");
    let playtimeChart = new Chart(playtimeChartCanvas, {
        type: "bar",
        data: {
            labels: [
                "Scout", "Soldier", "Pyro", "Demoman", "Heavy", "Engineer", "Medic", "Sniper", "Spy"
            ],
            datasets: [{
                data: [
                    playerStats['Scout.accum.iPlayTime'],
                    playerStats['Soldier.accum.iPlayTime'],
                    playerStats['Pyro.accum.iPlayTime'],
                    playerStats['Demoman.accum.iPlayTime'],
                    playerStats['Heavy.accum.iPlayTime'],
                    playerStats['Engineer.accum.iPlayTime'],
                    playerStats['Medic.accum.iPlayTime'],
                    playerStats['Sniper.accum.iPlayTime'],
                    playerStats['Spy.accum.iPlayTime']],
                backgroundColor: [
                    'rgb(192,192,192)',
                    'rgb(0,0,255)',
                    'rgb(255,0,0)',
                    'rgb(255, 145, 0)',
                    'rgb(100, 0, 200)',
                    'rgb(255, 215, 0)',
                    'rgb(255, 0, 171)',
                    'rgb(0, 100, 0)',
                    'rgb(181, 100, 29)'
                ],
            }],

        },
        options: {
            responsive: false,
            title: {
                display: true,
                text: "Playtime by Class"
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}
