playerStats = window.playerStats;
if (!playerStats == 0) {
    // Class play-time chart
    let playtimeChartCanvas = document.getElementById("playtimeChart").getContext("2d");
    let playtimeChart = new Chart(playtimeChartCanvas, {
        type: "bar",
        data: {
            labels: window.CLASSES,
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
                    'rgb(230,230,230)',
                    'rgb(88,133,162)',
                    'rgb(184,56,59)',
                    'rgb(184, 128, 53)',
                    'rgb(125, 64, 113)',
                    'rgb(231, 181, 59)',
                    'rgb(255, 105, 180)',
                    'rgb(114, 158, 66)',
                    'rgb(101, 71, 64)'
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


    // Collective stats
    document.getElementById("numericalStat_Kills").innerHTML = playerStats['Scout.accum.iNumberOfKills'] + playerStats['Soldier.accum.iNumberOfKills'] + playerStats['Pyro.accum.iNumberOfKills'] + playerStats['Demoman.accum.iNumberOfKills'] + playerStats['Heavy.accum.iNumberOfKills'] + playerStats['Engineer.accum.iNumberOfKills'] + playerStats['Medic.accum.iNumberOfKills'] + playerStats['Sniper.accum.iNumberOfKills'] + playerStats['Spy.accum.iNumberOfKills'];
    document.getElementById("numericalStat_KillAssists").innerHTML = playerStats['Scout.accum.iKillAssists'] + playerStats['Soldier.accum.iKillAssists'] + playerStats['Pyro.accum.iKillAssists'] + playerStats['Demoman.accum.iKillAssists'] + playerStats['Heavy.accum.iKillAssists'] + playerStats['Engineer.accum.iKillAssists'] + playerStats['Medic.accum.iKillAssists'] + playerStats['Sniper.accum.iKillAssists'] + playerStats['Spy.accum.iKillAssists'];
    document.getElementById("numericalStat_DamageDealt").innerHTML = playerStats['Scout.accum.iDamageDealt'] + playerStats['Soldier.accum.iDamageDealt'] + playerStats['Pyro.accum.iDamageDealt'] + playerStats['Demoman.accum.iDamageDealt'] + playerStats['Heavy.accum.iDamageDealt'] + playerStats['Engineer.accum.iDamageDealt'] + playerStats['Medic.accum.iDamageDealt'] + playerStats['Sniper.accum.iDamageDealt'] + playerStats['Spy.accum.iDamageDealt'];
    document.getElementById("numericalStat_Dominations").innerHTML = playerStats['Scout.accum.iDominations'] + playerStats['Soldier.accum.iDominations'] + playerStats['Pyro.accum.iDominations'] + playerStats['Demoman.accum.iDominations'] + playerStats['Heavy.accum.iDominations'] + playerStats['Engineer.accum.iDominations'] + playerStats['Medic.accum.iDominations'] + playerStats['Sniper.accum.iDominations'] + playerStats['Spy.accum.iDominations'];
    document.getElementById("numericalStat_Revenges").innerHTML = playerStats['Scout.accum.iRevenge'] + playerStats['Soldier.accum.iRevenge'] + playerStats['Pyro.accum.iRevenge'] + playerStats['Demoman.accum.iRevenge'] + playerStats['Heavy.accum.iRevenge'] + playerStats['Engineer.accum.iRevenge'] + playerStats['Medic.accum.iRevenge'] + playerStats['Sniper.accum.iRevenge'] + playerStats['Spy.accum.iRevenge'];
    document.getElementById("numericalStat_PointsScored").innerHTML = playerStats['Scout.accum.iPointsScored'] + playerStats['Soldier.accum.iPointsScored'] + playerStats['Pyro.accum.iPointsScored'] + playerStats['Demoman.accum.iPointsScored'] + playerStats['Heavy.accum.iPointsScored'] + playerStats['Engineer.accum.iPointsScored'] + playerStats['Medic.accum.iPointsScored'] + playerStats['Sniper.accum.iPointsScored'] + playerStats['Spy.accum.iPointsScored'];
}
