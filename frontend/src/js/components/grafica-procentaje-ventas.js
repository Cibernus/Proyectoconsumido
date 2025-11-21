document.addEventListener("DOMContentLoaded", function () {

    let micanvas = document.getElementById("migrafica2").getContext("2d");

    let chart = new Chart(micanvas, {
        type: 'doughnut',
        data: {
            labels: ["Azucar", "Arroz", "Aceite", "harina"],
            datasets: [
                {
                    label: "Productos más vendidos",
                    backgroundColor: [
                        'rgba(200, 162, 200, 1)',
                        'rgba(0, 0, 0, 1)',
                        'rgba(135, 206, 250, 1)',
                        'rgba(0, 255, 127, 1)'
                    ],
                    data: [6, 39, 20, 10]

                }
            ]
        },
        options: {
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