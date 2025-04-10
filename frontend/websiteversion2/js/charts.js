document.addEventListener('DOMContentLoaded', () => {
    // Simple chart drawing function
    function drawChart(canvasId, type, data, options = {}) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width = canvas.parentElement.offsetWidth;
        const height = canvas.height = canvas.parentElement.offsetHeight;
        
        // Default options
        const defaultOptions = {
            padding: 40,
            gridLines: 5,
            animate: true,
            legend: true,
            legendPosition: 'bottom',
            colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']
        };
        
        // Merge options
        const chartOptions = { ...defaultOptions, ...options };
        
        // Chart dimensions
        const chartWidth = width - chartOptions.padding * 2;
        const chartHeight = height - chartOptions.padding * 2 - (chartOptions.legend ? 40 : 0);
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw based on chart type
        switch (type) {
            case 'line':
                drawLineChart(ctx, data, chartWidth, chartHeight, chartOptions);
                break;
            case 'bar':
                drawBarChart(ctx, data, chartWidth, chartHeight, chartOptions);
                break;
            case 'pie':
                drawPieChart(ctx, data, chartWidth, chartHeight, chartOptions);
                break;
        }
    }
    
    // Line Chart
    function drawLineChart(ctx, data, chartWidth, chartHeight, options) {
        const { padding, gridLines, animate, colors } = options;
        
        // Find min and max values
        let minValue = Number.POSITIVE_INFINITY;
        let maxValue = Number.NEGATIVE_INFINITY;
        
        data.datasets.forEach(dataset => {
            const values = dataset.data;
            const dataMin = Math.min(...values);
            const dataMax = Math.max(...values);
            
            if (dataMin < minValue) minValue = dataMin;
            if (dataMax > maxValue) maxValue = dataMax;
        });
        
        // Adjust min and max for better visualization
        minValue = Math.max(0, minValue - (maxValue - minValue) * 0.1);
        maxValue = maxValue + (maxValue - minValue) * 0.1;
        
        // Draw axes
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, padding + chartHeight);
        ctx.lineTo(padding + chartWidth, padding + chartHeight);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw horizontal grid lines
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.font = '10px Arial';
        ctx.fillStyle = '#64748b';
        
        for (let i = 0; i <= gridLines; i++) {
            const y = padding + (chartHeight / gridLines) * i;
            const value = Math.round(maxValue - (maxValue - minValue) / gridLines * i);
            
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(padding + chartWidth, y);
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            ctx.fillText(value, padding - 5, y);
        }
        
        // Draw x-axis labels
        const labels = data.labels;
        const xStep = chartWidth / (labels.length - 1);
        
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        
        labels.forEach((label, i) => {
            const x = padding + i * xStep;
            ctx.fillText(label, x, padding + chartHeight + 10);
        });
        
        // Draw lines
        data.datasets.forEach((dataset, datasetIndex) => {
            const values = dataset.data;
            
            ctx.beginPath();
            
            values.forEach((value, i) => {
                const x = padding + i * xStep;
                const y = padding + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.strokeStyle = colors[datasetIndex % colors.length];
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw points
            values.forEach((value, i) => {
                const x = padding + i * xStep;
                const y = padding + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
                
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = colors[datasetIndex % colors.length];
                ctx.fill();
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 1;
                ctx.stroke();
            });
        });
        
        // Draw legend
        if (options.legend) {
            const legendY = padding + chartHeight + 30;
            const legendItemWidth = chartWidth / data.datasets.length;
            
            data.datasets.forEach((dataset, i) => {
                const x = padding + i * legendItemWidth;
                
                // Draw color box
                ctx.fillStyle = colors[i % colors.length];
                ctx.fillRect(x, legendY, 10, 10);
                
                // Draw label
                ctx.fillStyle = '#64748b';
                ctx.textAlign = 'left';
                ctx.fillText(dataset.label, x + 15, legendY + 5);
            });
        }
    }
    
    // Bar Chart
    function drawBarChart(ctx, data, chartWidth, chartHeight, options) {
        const { padding, gridLines, animate, colors } = options;
        
        // Find max value
        let maxValue = Number.NEGATIVE_INFINITY;
        
        data.datasets.forEach(dataset => {
            const values = dataset.data;
            const dataMax = Math.max(...values);
            
            if (dataMax > maxValue) maxValue = dataMax;
        });
        
        // Adjust max for better visualization
        maxValue = maxValue + maxValue * 0.1;
        
        // Draw axes
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, padding + chartHeight);
        ctx.lineTo(padding + chartWidth, padding + chartHeight);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw horizontal grid lines
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.font = '10px Arial';
        ctx.fillStyle = '#64748b';
        
        for (let i = 0; i <= gridLines; i++) {
            const y = padding + (chartHeight / gridLines) * i;
            const value = Math.round(maxValue - (maxValue / gridLines) * i);
            
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(padding + chartWidth, y);
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            ctx.fillText(value, padding - 5, y);
        }
        
        // Draw bars
        const labels = data.labels;
        const datasets = data.datasets;
        const barGroupWidth = chartWidth / labels.length;
        const barWidth = barGroupWidth / datasets.length * 0.8;
        const barGroupPadding = barGroupWidth * 0.1;
        
        // Draw x-axis labels
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        
        labels.forEach((label, i) => {
            const x = padding + i * barGroupWidth + barGroupWidth / 2;
            ctx.fillText(label, x, padding + chartHeight + 10);
        });
        
        // Draw bars
        datasets.forEach((dataset, datasetIndex) => {
            const values = dataset.data;
            
            values.forEach((value, i) => {
                const x = padding + i * barGroupWidth + barGroupPadding + datasetIndex * barWidth;
                const barHeight = (value / maxValue) * chartHeight;
                const y = padding + chartHeight - barHeight;
                
                ctx.fillStyle = colors[datasetIndex % colors.length];
                ctx.fillRect(x, y, barWidth, barHeight);
            });
        });
        
        // Draw legend
        if (options.legend) {
            const legendY = padding + chartHeight + 30;
            const legendItemWidth = chartWidth / datasets.length;
            
            datasets.forEach((dataset, i) => {
                const x = padding + i * legendItemWidth;
                
                // Draw color box
                ctx.fillStyle = colors[i % colors.length];
                ctx.fillRect(x, legendY, 10, 10);
                
                // Draw label
                ctx.fillStyle = '#64748b';
                ctx.textAlign = 'left';
                ctx.fillText(dataset.label, x + 15, legendY + 5);
            }

        );
    }
}

// Pie Chart
function drawPieChart(ctx, data, chartWidth, chartHeight, options) {
    const { padding, colors } = options;
    const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0);
    const centerX = padding + chartWidth / 2;
    const centerY = padding + chartHeight / 2;
    const radius = Math.min(chartWidth, chartHeight) / 2 - 10;
    
    let startAngle = 0;
    const values = data.datasets[0].data;
    
    values.forEach((value, i) => {
        const sliceAngle = (value / total) * Math.PI * 2;
        const endAngle = startAngle + sliceAngle;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        
        startAngle = endAngle;
    });

    // Draw legend
    if (options.legend) {
        const legendY = padding + chartHeight + 30;
        const legendItemWidth = chartWidth / values.length;

        values.forEach((_, i) => {
            const x = padding + i * legendItemWidth;

            // Draw color box
            ctx.fillStyle = colors[i % colors.length];
            ctx.fillRect(x, legendY, 10, 10);

            // Draw label
            ctx.fillStyle = '#64748b';
            ctx.textAlign = 'left';
            ctx.fillText(data.labels[i], x + 15, legendY + 5);
        });
    }
}

// Example usage
const exampleData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
        {
            label: 'Requests',
            data: [30, 45, 25, 60]
        },
        {
            label: 'Deliveries',
            data: [20, 35, 30, 55]
        }
    ]
};

drawChart('myCanvas', 'bar', exampleData);
});