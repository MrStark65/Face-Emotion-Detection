import React from 'react';
import EmotionDetector from './components/EmotionDetector';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Face Emotion Detection</h1>
      </header>
      <main>
        <EmotionDetector />
      </main>
    </div>
  );
}

export default App;