"use strict";

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        floatchart();
        loadPieChart();
    }, 500);
});

function floatchart() {
    (function () {
        const today = new Date();
        const days = [];
        const applicationData = [];
        const issueData = [];

        for (let i = 0; i < 7; i++) {
            const currentDay = new Date(today);
            currentDay.setDate(today.getDate() - i);

            const dayName = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short' }).format(currentDay);
            days.unshift(dayName);

            const startDate = new Date(currentDay.setHours(0, 0, 0, 0));
            const endDate = new Date(currentDay.setHours(23, 59, 59, 999));

            // const fetchDataPromise = fetch(`/admin/application-data/${startDate.toISOString()}/${endDate.toISOString()}`)
            //     .then(response => response.json())
            //     .then(result => {
            //         return { count: result.count, issueCount: result.issue_count };
            //     });
            const fetchDataPromise = fetch(`/admin/application-data/${startDate.toISOString()}/${endDate.toISOString()}`, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            })
                .then(response => response.json())
                .then(result => {
                    return { count: result.count, issueCount: result.issue_count };
                });

            applicationData.unshift(fetchDataPromise);
        }

        const options = {
            chart: { type: "line", height: 350, toolbar: { show: false } },
            colors: ["#0d6efd", "#28a745"],
            dataLabels: { enabled: false },
            markers: {
                size: 7,
                colors: ["#0d6efd", "#28a745"],
                strokeColors: "#fff",
                strokeWidth: 3,
                hover: { size: 4 },
            },
            stroke: { width: 1, curve: "smooth" },
            plotOptions: { bar: { columnWidth: "45%", borderRadius: 4 } },
            grid: { strokeDashArray: 4 },
            series: [
                { name: "à¦…à§à¦¯à¦¾à¦ªà§à¦²à¦¿à¦•à§‡à¦¶à¦¨", data: [] },
                { name: "à¦‡à¦¸à§à¦¯à§ à¦¹à§Ÿà§‡à¦›à§‡", data: [] },
            ],
            yaxis: { show: true },
            xaxis: {
                categories: days,
                labels: { hideOverlappingLabels: true },
                axisBorder: { show: false },
                axisTicks: { show: false },
            },
        };

        const chart = new ApexCharts(document.querySelector("#application-chart"), options);
        chart.render();

        Promise.all(applicationData)
            .then(resolvedData => {
                const applicationCounts = resolvedData.map(data => data.count);
                const issueCounts = resolvedData.map(data => data.issueCount);

                chart.updateSeries([
                    { name: "à¦…à§à¦¯à¦¾à¦ªà§à¦²à¦¿à¦•à§‡à¦¶à¦¨", data: applicationCounts },
                    { name: "à¦‡à¦¸à§à¦¯à§ à¦¹à§Ÿà§‡à¦›à§‡", data: issueCounts },
                ]);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    })();
}

// Pie Chart Function
function loadPieChart() {
    fetch("/admin/holding-pie-chart-data", {
        headers: { "X-Requested-With": "XMLHttpRequest" },
    })
        .then(response => response.json())
        .then(data => {
            function convertToBanglaNumber(num) {
                const banglaDigits = ["à§¦", "à§§", "à§¨", "à§©", "à§ª", "à§«", "à§¬", "à§­", "à§®", "à§¯"];
                return num.toString().split("").map(digit => banglaDigits[digit] || digit).join("");
            }

            const fullLabels = data.labels.map(label => `à¦“à§Ÿà¦¾à¦°à§à¦¡ ${label}`);

            const options = {
                chart: { type: "pie", height: 500 },
                labels: fullLabels,
                series: data.values,
                colors: [
                    "#DE4034",
                    "#017DC7",
                    "#00A65E",
                    "#F0A30A",
                    "#7F3E76",
                    "#167879",
                    "#FF6347",
                    "#6A5ACD",
                    "#C6BE42"
                ],
                legend: {
                    position: "bottom",
                    // formatter: function (seriesName, opts) {
                    //     const value = opts.w.config.series[opts.seriesIndex];
                    //     return `${seriesName}: ${convertToBanglaNumber(value)}`;
                    // },
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val, opts) {
                        const value = opts.w.config.series[opts.seriesIndex];
                        return convertToBanglaNumber(value);
                    },
                    style: {
                        fontSize: "12px",
                        fontWeight: "bold",
                        colors: ["#fff"],
                    },
                },
            };

            const chart = new ApexCharts(document.querySelector("#pie-chart"), options);
            chart.render();
        })
        .catch(error => console.error("Error fetching pie chart data:", error));
}