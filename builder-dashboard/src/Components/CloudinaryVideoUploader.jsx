import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const CloudinaryVideoUploader = ({ onClose }) => {
  const webcamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    const recordedBlob = webcamRef.current?.getScreenshot();
    setVideoBlob(recordedBlob);
  };

  const uploadVideoToCloudinary = async () => {
    if (!videoBlob) {
      console.error('No video to upload');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', videoBlob, 'recorded-video.webm');

      // Replace 'CLOUDINARY_UPLOAD_URL' with your actual Cloudinary upload URL
      const response = await axios.post('CLOUDINARY_UPLOAD_URL', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle Cloudinary response as needed
      console.log('Cloudinary response:', response.data);
    } catch (error) {
      console.error('Error uploading video to Cloudinary:', error);
    }

    // Close the CloudinaryVideoUploader component
    onClose();
  };

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} />
      {!isRecording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}

      {videoBlob && (
        <div>
          <video width="400" height="300" controls>
            <source src={videoBlob} type="video/webm" />
          </video>
          <button onClick={uploadVideoToCloudinary}>Upload Video</button>
        </div>
      )}
    </div>
  );
};

export default CloudinaryVideoUploader;
