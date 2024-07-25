// visualization.js

document.addEventListener("DOMContentLoaded", function() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            visualizeData(data);
        });

    function visualizeData(data) {
        const clusters = Array.from(new Set(data.map(d => d.cluster)));
        const traces = clusters.map(cluster => {
            const clusterData = data.filter(d => d.cluster === cluster);
            return {
                x: clusterData.map(d => d.x),
                y: clusterData.map(d => d.y),
                text: clusterData.map(d => d.word),
                mode: 'markers+text',
                type: 'scatter',
                name: `Cluster ${cluster}`,
                textposition: 'top center'
            };
        });

        const layout = {
            title: 'Word Solar System',
            xaxis: { title: 'Dimension 1' },
            yaxis: { title: 'Dimension 2' },
            showlegend: true
        };

        Plotly.newPlot('chart', traces, layout);
    }
});
