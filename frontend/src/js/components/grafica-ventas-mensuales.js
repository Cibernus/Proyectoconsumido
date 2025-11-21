document.addEventListener("DOMContentLoaded", function () {

    let micanvas = document.getElementById("migrafica3").getContext("2d");

    let chart = new Chart(micanvas, {
        type: "bar",
        data: {
            labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            datasets: [
                {
                    backgroundColor: [
                        '#87CEED',
                        '#0000FF',
                        '#87CEED',
                        '#0000FF',
                        '#87CEED',
                        '#0000FF',
                        '#87CEED'
                    ],

                    data: [40, 70, 20, 50, 45, 10, 43],
                    barThickness: 13
                }
            ]
        },
        options: {
            scales: {
                x: {
                    grid: {
                        display: false,
                        color: 'rgba(0, 0, 0, 0.3)',
                        lineWidth: 0.3
                    }
                }
            },
            plugins: {
                legend: {

                    display: true,
                    labels: {
                        boxWidth: 0,
                        color: "#ffffff"
                    }
                }
            }
        }
    })

})
