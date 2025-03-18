import React from 'react';
import Webcam from 'react-webcam';
import '../styles/components/WebcamCapture.css';

const WebcamCapture = ({ webcamRef }) => {
  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user"
  };

  return (
    <div className="webcam-container">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        mirrored={true}
      />
    </div>
  );
};

export default WebcamCapture;