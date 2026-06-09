{
    const playtimeChartCanvas = document
        .getElementById("playtimeChart")
        .getContext("2d");
    new Chart(playtimeChartCanvas, {
        type: "bar",
        data: {
            labels: window.CLASSES,
            datasets: [
                {
                    data: [
                        window.playerStats["Scout.accum.iPlayTime"] || 0,
                        window.playerStats["Soldier.accum.iPlayTime"] || 0,
                        window.playerStats["Pyro.accum.iPlayTime"] || 0,
                        window.playerStats["Demoman.accum.iPlayTime"] || 0,
                        window.playerStats["Heavy.accum.iPlayTime"] || 0,
                        window.playerStats["Engineer.accum.iPlayTime"] || 0,
                        window.playerStats["Medic.accum.iPlayTime"] || 0,
                        window.playerStats["Sniper.accum.iPlayTime"] || 0,
                        window.playerStats["Spy.accum.iPlayTime"] || 0,
                    ],
                    backgroundColor: [
                        "rgb(230,230,230)",
                        "rgb(88,133,162)",
                        "rgb(184,56,59)",
                        "rgb(184, 128, 53)",
                        "rgb(125, 64, 113)",
                        "rgb(231, 181, 59)",
                        "rgb(255, 105, 180)",
                        "rgb(114, 158, 66)",
                        "rgb(101, 71, 64)",
                    ],
                },
            ],
        },
        options: {
            responsive: false,
            title: {
                display: true,
                text: "Playtime by Class",
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 15,
                        },
                    },
                },
                y: {
                    ticks: {
                        font: {
                            size: 24,
                        },
                    },
                },
            },
        },
    });

    // Collective stats
    function sumStats(statSuffix) {
        return window.CLASSES.reduce((sum, className) => {
            const val = window.playerStats[`${className}.${statSuffix}`];
            return sum + (val === undefined ? 0 : val);
        }, 0);
    }

    document.getElementById("numericalStat_Kills").innerHTML = sumStats("accum.iNumberOfKills");
    document.getElementById("numericalStat_KillAssists").innerHTML = sumStats("accum.iKillAssists");
    document.getElementById("numericalStat_DamageDealt").innerHTML = sumStats("accum.iDamageDealt");
    document.getElementById("numericalStat_Dominations").innerHTML = sumStats("accum.iDominations");
    document.getElementById("numericalStat_Revenges").innerHTML = sumStats("accum.iRevenge");
    document.getElementById("numericalStat_PointsScored").innerHTML = sumStats("accum.iPointsScored");
}
