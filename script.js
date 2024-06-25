document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('scoreChart').getContext('2d');

    const scores = {
        voice: 80,
        gesture: 85,
        posture: 85,
        vibrato: 70,
        expression: 85,
        kobushi: 85,
        longTone: 85
    };

    const labels = ['声量', '身振り', '姿勢', 'ビブラート', '抑揚', 'こぶし', 'ロングトーン'];

    const scoreChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'スコア',
                data: Object.values(scores),
                backgroundColor: 'rgba(255, 87, 34, 0.2)',
                borderColor: 'rgba(255, 87, 34, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 87, 34, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        backdropColor: 'transparent'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    let currentIndex = 0;
    const scoreDetails = document.querySelectorAll('.score-details p');
    const scoreNumber = document.getElementById('score-number');
    const scoreMainRight = document.querySelector('.score-main-right');

    document.getElementById('nextButton').addEventListener('click', () => {
        if (currentIndex < scoreDetails.length) {
            scoreDetails[currentIndex].style.display = 'block';
            currentIndex++;
        } else if (currentIndex === scoreDetails.length) {
            scoreMainRight.style.display = 'flex';
            document.getElementById('scoreChart').style.display = 'block';
            animateChart();
            currentIndex++;
        } else if (currentIndex === scoreDetails.length + 1) {
            scoreNumber.style.display = 'block';
        }
    });

    // Animate the chart data
    let currentStep = 0;
    const steps = 20; // Number of animation steps
    const stepDuration = 500; // Duration of each step in milliseconds
    const initialData = new Array(labels.length).fill(0);
    const finalData = Object.values(scores);

    function animateChart() {
        if (currentStep <= steps) {
            scoreChart.data.datasets[0].data = initialData.map((initial, index) => {
                const final = finalData[index];
                return initial + ((final - initial) * currentStep) / steps;
            });
            scoreChart.update();
            currentStep++;
            requestAnimationFrame(animateChart);
        }
    }
});
