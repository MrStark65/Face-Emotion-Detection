import React from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import '../styles/components/EmotionDisplay.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EmotionDisplay = ({ emotions, error, history }) => {
  if (error) {
    return (
      <motion.div 
        className="emotion-error"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {error}
      </motion.div>
    );
  }

  if (!emotions) {
    return (
      <motion.div 
        className="emotion-waiting"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Waiting for detection...
      </motion.div>
    );
  }

  const dominantEmotion = Object.entries(emotions)
    .reduce((a, b) => (a[1] > b[1] ? a : b))[0];

  const chartData = {
    labels: history.map((_, index) => `Capture ${index + 1}`),
    datasets: Object.keys(emotions).map((emotion) => ({
      label: emotion,
      data: history.map(h => h.emotions[emotion]),
      borderColor: getEmotionColor(emotion),
      tension: 0.1
    }))
  };

  return (
    <motion.div 
      className="emotion-display"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>Detected Emotion</h2>
      <motion.div 
        className="emotion-result"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        {dominantEmotion}
      </motion.div>

      <div className="emotion-details">
        {Object.entries(emotions).map(([emotion, value]) => (
          <motion.div 
            key={emotion} 
            className="emotion-bar"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
          >
            <span className="emotion-label">{emotion}</span>
            <div className="emotion-progress">
              <motion.div 
                className="emotion-progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                style={{ backgroundColor: getEmotionColor(emotion) }}
              />
            </div>
            <span className="emotion-value">{value.toFixed(1)}%</span>
          </motion.div>
        ))}
      </div>

      {history.length > 1 && (
        <div className="emotion-history">
          <h3>Emotion History</h3>
          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </motion.div>
  );
};

const getEmotionColor = (emotion) => {
  const colors = {
    happiness: '#FFD700',
    sadness: '#4169E1',
    anger: '#FF4500',
    surprise: '#32CD32',
    fear: '#800080',
    disgust: '#8B4513',
    neutral: '#808080'
  };
  return colors[emotion.toLowerCase()] || '#000000';
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Emotion Trends'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100
    }
  }
};

export default EmotionDisplay;