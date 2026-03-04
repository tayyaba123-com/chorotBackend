
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
      <div className="text-center " >
        <div className="text-[100px]" style={{  transition: 'all 0.2s' }}>{output.emoji}</div>
        <h1 className="text-3xl font-bold color-[rgb(227, 222, 222)]" >{output.label}</h1>
      </div>
      
      <div  >
        <Webcam className="webcame"
          ref={webcamRef}
          mirrored
        />
       
      </div>

       <button className="button_start_check" onClick={()=>{detectFrame({webcamRef,landmarker,setOutput})}}>check gesture</button>
    </div>
    
  );
}