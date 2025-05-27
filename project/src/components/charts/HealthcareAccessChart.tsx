import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface HealthcareAccessChartProps {
  disease?: string;
}

// Actual healthcare access data converted to percentages
const healthcareAccessData = [
  44.7246,  // 2025
  49.8616,  // 2026
  45.2261,  // 2027
  41.9606,  // 2028
  41.8636,  // 2029
  46.4656,  // 2030
  45.0271,  // 2031
  45.0678,  // 2032
  44.2648,  // 2033
  44.1032   // 2034
];

const HealthcareAccessChart: React.FC<HealthcareAccessChartProps> = ({ disease = 'General' }) => {
  const years = ['2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034'];
  
  // Calculate dynamic y-axis range
  const minVal = Math.min(...healthcareAccessData);
  const maxVal = Math.max(...healthcareAccessData);
  const rangeBuffer = (maxVal - minVal) * 0.15; // 15% buffer

  const data = {
    labels: years,
    datasets: [
      {
        label: `Healthcare Access % (${disease})`,
        data: healthcareAccessData,
        borderColor: 'rgb(42, 92, 170)',
        backgroundColor: 'rgba(42, 92, 170, 0.1)',
        tension: 0.3,
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(42, 92, 170)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            return `Access: ${context.raw.toFixed(2)}%`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: Math.max(0, minVal - rangeBuffer),
        max: Math.min(100, maxVal + rangeBuffer),
        title: {
          display: true,
          text: 'Access Percentage (%)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  return (
    <div className="h-72 md:h-96">
      <Line data={data} options={options} />
    </div>
  );
};

export default HealthcareAccessChart;