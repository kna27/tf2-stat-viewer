{
    let mvmClassMaxChart;
    let mvmClassAccumChart;
    document.getElementById("numericalStat_RobotsKills").innerHTML = window.CLASSES.reduce((sum, className) => {
        const val = window.playerStats[`${className}.mvm.accum.iNumberOfKills`];
        return sum + (val === undefined ? 0 : val);
    }, 0);
    document.getElementById("numericalStat_Money").innerHTML =
        window.playerStats["TF_MVM_COLLECT_MONEY_GRIND_STAT"] || 0;

    function initMvmCharts() {
        let mvmClassMaxChartCanvas = document
            .getElementById("mvmClassMaxChart")
            .getContext("2d");
        mvmClassMaxChart = new Chart(mvmClassMaxChartCanvas, {
            type: "bar",
            data: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        backgroundColor: ["rgb(88,133,162)"],
                    },
                ],
            },
            options: {
                indexAxis: "y",
                responsive: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        font: {
                            size: 22,
                        },
                        text: "Maximum Stats",
                    },
                },
                scales: {
                    x: {
                        type: "logarithmic",
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

        var mvmClassAccumChartCanvas = document
            .getElementById("mvmClassAccumChart")
            .getContext("2d");
        mvmClassAccumChart = new Chart(mvmClassAccumChartCanvas, {
            type: "bar",
            data: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        backgroundColor: ["rgb(88,133,162)"],
                    },
                ],
            },
            options: {
                indexAxis: "y",
                responsive: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        font: {
                            size: 22,
                        },
                        text: "Total Stats",
                    },
                },
                scales: {
                    x: {
                        type: "logarithmic",
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
    }

    initMvmCharts();

    window.CLASSES.forEach((element) =>
        document
            .getElementById(`mvm_class_stat_${element}`)
            .addEventListener("click", function () {
                showNewMvmClassStats(element);
            }),
    );

    const mvmClassPlayTime = {};
    window.CLASSES.forEach(
        (element) =>
        (mvmClassPlayTime[element] = parseFloat(
            window.playerStats[element + ".mvm.accum.iPlayTime"] || 0,
        )),
    );

    let showClass = "Scout";
    for (const key in mvmClassPlayTime) {
        showClass =
            mvmClassPlayTime[showClass] < parseFloat(mvmClassPlayTime[key])
                ? key
                : showClass;
    }
    showNewMvmClassStats(showClass);

    function showNewMvmClassStats(className) {
        window.CLASSES.forEach(function (item) {
            document.getElementById(`mvm_class_stat_${item}`).src =
                item == className
                    ? `/img/class_icons_blu/${item}.png`
                    : `/img/class_icons/${item}.png`;
        });

        const maxMvmData = {};
        const maxMvmVals = [];
        const accumMvmData = {};
        const accumMvmVals = [];

        for (const key in window.playerStats) {
            if (
                key.startsWith(`${className}.mvm.max.i`) &&
                window.playerStats[key] != 0
            ) {
                maxMvmData[
                    key
                        .substr(`${className}.mvm.max.i`.length)
                        .replace(/([A-Z]+)/g, " $1")
                ] = window.playerStats[key];
            }
            if (
                key.startsWith(`${className}.mvm.accum.i`) &&
                window.playerStats[key] != 0
            ) {
                accumMvmData[
                    key
                        .substr(`${className}.mvm.accum.i`.length)
                        .replace(/([A-Z]+)/g, " $1")
                ] = window.playerStats[key];
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

        mvmClassMaxChart.update();
        mvmClassAccumChart.update();
    }
}
