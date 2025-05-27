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

interface DiseasePredictionChartProps {
  disease?: string;
}

const diseaseForecastData: { [key: string]: number[] } = {
  'Malaria': [42.34, 38.16, 31.98, 35.99, 38.59, 31.28, 36.41, 35.43, 34.88, 35.47],
  'Ebola': [53.76, 60.68, 66.65, 63.92, 59.11, 55.93, 59.98, 61.05, 61.14, 60.21],
  'COVID-19': [62.57, 69.04, 65.63, 63.85, 58.51, 62.09, 63.64, 63.79, 62.87, 62.45],
  "Parkinson's Disease": [40.08, 34.91, 29.06, 24.97, 28.43, 30.11, 31.23, 29.73, 28.89, 28.92],
  'Tuberculosis': [54.15, 60.99, 57.53, 60.80, 55.69, 61.66, 58.45, 59.19, 58.89, 59.11],
  'Dengue': [54.10, 51.35, 50.47, 51.36, 44.00, 43.85, 49.24, 48.44, 47.94, 47.45],
  'Rabies': [32.83, 31.30, 32.19, 24.08, 27.32, 29.28, 29.51, 29.00, 28.54, 27.94],
  'Cholera': [42.41, 43.36, 47.14, 43.73, 40.87, 36.32, 42.31, 42.34, 42.17, 41.30],
  'Leprosy': [57.15, 61.88, 64.49, 66.68, 62.38, 59.38, 62.03, 62.87, 62.96, 62.66],
  'Cancer': [51.22, 55.64, 56.98, 57.11, 59.18, 59.90, 56.63, 57.56, 57.89, 58.06],
  'Diabetes': [49.38, 53.71, 54.64, 51.14, 59.25, 56.50, 54.08, 54.89, 55.11, 55.16],
  'Measles': [57.39, 59.38, 62.90, 69.24, 69.82, 65.07, 63.85, 64.99, 66.00, 66.54],
  'Zika': [60.09, 58.92, 59.94, 56.20, 63.60, 60.94, 59.96, 59.93, 60.09, 60.15],
  "Alzheimer's Disease": [56.98, 51.54, 49.37, 50.03, 41.87, 47.92, 49.69, 48.38, 47.88, 47.62],
  'Polio': [20.34, 15.26, 14.12, 15.75, 12.39, 13.90, 15.30, 14.46, 14.30, 14.37],
  'Hypertension': [28.38, 26.57, 28.53, 30.06, 22.91, 26.31, 27.18, 26.88, 26.97, 26.72],
  'Asthma': [48.16, 46.27, 38.18, 40.69, 43.25, 49.19, 44.36, 43.72, 43.20, 44.00],
  'HIV/AIDS': [32.80, 30.16, 30.25, 24.55, 27.14, 29.16, 28.98, 28.34, 28.12, 27.72],
  'Influenza': [44.84, 46.78, 43.67, 35.98, 31.56, 33.90, 39.43, 38.61, 37.25, 36.12],
  'Hepatitis': [36.44, 38.46, 37.24, 36.86, 36.89, 33.94, 36.60, 36.64, 36.37, 36.24]
};

const DiseasePredictionChart: React.FC<DiseasePredictionChartProps> = ({ disease = 'General' }) => {
  const years = ['2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034'];
  const predictionData = diseaseForecastData[disease] || [];
  
  if (predictionData.length === 0) {
    return <div className="h-72 md:h-96 flex items-center justify-center text-neutral-500">
      No forecast data available for {disease}
    </div>;
  }

  // const minVal = Math.min(...predictionData);
  // const maxVal = Math.max(...predictionData);
  // const buffer = (maxVal - minVal) * 0.15;

  const data = {
    labels: years,
    datasets: [
      {
        label: `${disease} Incidence Rate (%)`,
        data: predictionData,
        borderColor: 'rgb(76, 175, 80)',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.3,
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(76, 175, 80)',
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
            return `Rate: ${context.raw.toFixed(2)}%`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        // min: Math.max(0, minVal - buffer),
        // max: maxVal + buffer,
        title: {
          display: true,
          text: 'Incidence Rate (%)',
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

export default DiseasePredictionChart;