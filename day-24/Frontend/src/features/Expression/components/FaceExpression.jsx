
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import  {detectFrame,setupMediaPipe} from "../utils/utils"

export default function EmotionDetector() {
  const webcamRef = useRef(null);
  const [landmarker, setLandmarker] = useState(null);
  const [output, setOutput] = useState({ emoji: "😶", label: "Loading AI..." });

  // 1. Initialize the MediaPipe Face Landmarker
  useEffect(() => {
    
    setupMediaPipe({setLandmarker,setOutput});

     let requestID;

   

    if (landmarker) {
      requestID = requestAnimationFrame(detectFrame);
    }

    return () => cancelAnimationFrame(requestID);
  

  }, []);

  
  return (
    <div className="webcame-container" >
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '100px', transition: 'all 0.2s' }}>{output.emoji}</div>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' ,color:'rgb(227, 222, 222)'}}>{output.label}</h1>
      </div>
      
      <div  >
        <Webcam
          ref={webcamRef}
          mirrored
          style={{ 
            
            width: '100%', 
            
            borderRadius: '20px', 
            border: '4px solid #1960a7',
            boxShadow: '0 20px 25px -5px rgba(31, 31, 31, 0.1)'
          }}
        />
       
      </div>

       <button className="button_start_check" onClick={()=>{detectFrame({webcamRef,landmarker,setOutput})}}>check gesture</button>
    </div>
    
  );
}