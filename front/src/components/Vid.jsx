import React from 'react';
import videoBg from '../assets/videoBg.mp4';
import image from '../assets/image2.png';
import './Vid.css';

const Vid = () => {
  return (
    <div className="Vid">
      <video 
        src={videoBg} 
        autoPlay 
        loop 
        muted 
        className="video-bg"
      />
      <div className="content">
        <img
          src={image}
          alt="Overlay Image"
        />
      </div>
    </div>
  );
}

export default Vid;