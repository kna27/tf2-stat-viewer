
let playtimeChartCanvas = document.getElementById("playtimeChart").getContext("2d");
let playtimeChart = new Chart(playtimeChartCanvas, {
    type: "bar",
    data: {
        labels: window.CLASSES,
        datasets: [{
            data: [
                window.playerStats['Scout.accum.iPlayTime'],
                window.playerStats['Soldier.accum.iPlayTime'],
                window.playerStats['Pyro.accum.iPlayTime'],
                window.playerStats['Demoman.accum.iPlayTime'],
                window.playerStats['Heavy.accum.iPlayTime'],
                window.playerStats['Engineer.accum.iPlayTime'],
                window.playerStats['Medic.accum.iPlayTime'],
                window.playerStats['Sniper.accum.iPlayTime'],
                window.playerStats['Spy.accum.iPlayTime']],
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
document.getElementById("numericalStat_Kills").innerHTML = window.playerStats['Scout.accum.iNumberOfKills'] + window.playerStats['Soldier.accum.iNumberOfKills'] + window.playerStats['Pyro.accum.iNumberOfKills'] + window.playerStats['Demoman.accum.iNumberOfKills'] + window.playerStats['Heavy.accum.iNumberOfKills'] + window.playerStats['Engineer.accum.iNumberOfKills'] + window.playerStats['Medic.accum.iNumberOfKills'] + window.playerStats['Sniper.accum.iNumberOfKills'] + window.playerStats['Spy.accum.iNumberOfKills'];
document.getElementById("numericalStat_KillAssists").innerHTML = window.playerStats['Scout.accum.iKillAssists'] + window.playerStats['Soldier.accum.iKillAssists'] + window.playerStats['Pyro.accum.iKillAssists'] + window.playerStats['Demoman.accum.iKillAssists'] + window.playerStats['Heavy.accum.iKillAssists'] + window.playerStats['Engineer.accum.iKillAssists'] + window.playerStats['Medic.accum.iKillAssists'] + window.playerStats['Sniper.accum.iKillAssists'] + window.playerStats['Spy.accum.iKillAssists'];
document.getElementById("numericalStat_DamageDealt").innerHTML = window.playerStats['Scout.accum.iDamageDealt'] + window.playerStats['Soldier.accum.iDamageDealt'] + window.playerStats['Pyro.accum.iDamageDealt'] + window.playerStats['Demoman.accum.iDamageDealt'] + window.playerStats['Heavy.accum.iDamageDealt'] + window.playerStats['Engineer.accum.iDamageDealt'] + window.playerStats['Medic.accum.iDamageDealt'] + window.playerStats['Sniper.accum.iDamageDealt'] + window.playerStats['Spy.accum.iDamageDealt'];
document.getElementById("numericalStat_Dominations").innerHTML = window.playerStats['Scout.accum.iDominations'] + window.playerStats['Soldier.accum.iDominations'] + window.playerStats['Pyro.accum.iDominations'] + window.playerStats['Demoman.accum.iDominations'] + window.playerStats['Heavy.accum.iDominations'] + window.playerStats['Engineer.accum.iDominations'] + window.playerStats['Medic.accum.iDominations'] + window.playerStats['Sniper.accum.iDominations'] + window.playerStats['Spy.accum.iDominations'];
document.getElementById("numericalStat_Revenges").innerHTML = window.playerStats['Scout.accum.iRevenge'] + window.playerStats['Soldier.accum.iRevenge'] + window.playerStats['Pyro.accum.iRevenge'] + window.playerStats['Demoman.accum.iRevenge'] + window.playerStats['Heavy.accum.iRevenge'] + window.playerStats['Engineer.accum.iRevenge'] + window.playerStats['Medic.accum.iRevenge'] + window.playerStats['Sniper.accum.iRevenge'] + window.playerStats['Spy.accum.iRevenge'];
document.getElementById("numericalStat_PointsScored").innerHTML = window.playerStats['Scout.accum.iPointsScored'] + window.playerStats['Soldier.accum.iPointsScored'] + window.playerStats['Pyro.accum.iPointsScored'] + window.playerStats['Demoman.accum.iPointsScored'] + window.playerStats['Heavy.accum.iPointsScored'] + window.playerStats['Engineer.accum.iPointsScored'] + window.playerStats['Medic.accum.iPointsScored'] + window.playerStats['Sniper.accum.iPointsScored'] + window.playerStats['Spy.accum.iPointsScored'];
