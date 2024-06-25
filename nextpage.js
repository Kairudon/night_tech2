document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('scoreChart').getContext('2d');

    const data = {
        labels: ['音程', '安定', '表現力', 'リズム', 'ビブラート&ロングトーン'],
        datasets: [{
            label: '得点',
            data: [70, 80, 85, 75, 90],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    const config = {
        type: 'radar',
        data: data,
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    };

    new Chart(ctx, config);
});
