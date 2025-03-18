import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WebcamCapture from './WebcamCapture';
import EmotionDisplay from './EmotionDisplay';
import LoadingSpinner from './LoadingSpinner';
import { analyzeFace } from '../utils/faceApiHelper';
import '../styles/components/EmotionDetector.css';

const EmotionDetector = () => {
  const webcamRef = useRef(null);
  const [emotions, setEmotions] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [captureHistory, setCaptureHistory] = useState([]);

  const captureAndAnalyze = useCallback(async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      setError(null);

      const imageSrc = webcamRef.current.getScreenshot();
      const result = await analyzeFace(imageSrc);

      if (result.faces && result.faces.length > 0) {
        const newEmotions = result.faces[0].attributes.emotion;
        setEmotions(newEmotions);
        setCaptureHistory(prev => [...prev, {
          timestamp: new Date(),
          emotions: newEmotions
        }]);
        toast.success('Emotion detected successfully!');
      } else {
        setError('No face detected. Please try again.');
        toast.error('No face detected. Please try again.');
      }
    } catch (err) {
      setError('Error processing image. Please try again.');
      toast.error('Error processing image. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing]);

  const clearHistory = () => {
    setCaptureHistory([]);
    toast.info('History cleared');
  };

  return (
    <motion.div 
      className="emotion-detector"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <WebcamCapture webcamRef={webcamRef} />
      
      <div className="controls">
        <motion.button 
          className="capture-button"
          onClick={captureAndAnalyze}
          disabled={isProcessing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isProcessing ? 'Processing...' : 'Detect Emotion'}
        </motion.button>

        {captureHistory.length > 0 && (
          <motion.button 
            className="clear-button"
            onClick={clearHistory}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear History
          </motion.button>
        )}
      </div>

      {isProcessing && <LoadingSpinner />}
      
      <EmotionDisplay 
        emotions={emotions} 
        error={error} 
        history={captureHistory}
      />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </motion.div>
  );
};

export default EmotionDetector;