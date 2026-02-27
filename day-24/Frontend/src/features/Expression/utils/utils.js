 
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

// Constants for the AI models
const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm";
const MODEL_URL = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";
 
  
  
  
  
  export async function setupMediaPipe({setLandmarker,setOutput}) {
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks(WASM_URL);
        const instance = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: MODEL_URL,
            delegate: "GPU",
          },
          outputFaceBlendshapes: true, // This enables emotion detection
          runningMode: "VIDEO",
          numFaces: 1,
        });
        setLandmarker(instance);
        setOutput({ emoji: "😐", label: "Ready!" });
      } catch (error) {
        console.error("Failed to load MediaPipe:", error);
        setOutput({ emoji: "❌", label: "Error Loading Model" });
      }
    }


  export const getEmotion = (blendshapes) => {
    if (!blendshapes || blendshapes.length === 0) return { emoji: "😶", label: "No Face" };

    // Create a simple object from the 52 blendshape categories
    const scores = {};
    blendshapes[0].categories.forEach((c) => {
      scores[c.categoryName] = c.score;
    });

    // --- Detection Logic ---
    // Surprised: Jaw is open AND inner brows are up
    if (scores["jawOpen"] > 0.35 && scores["browInnerUp"] > 0.3) {
      return { emoji: "😲", label: "Surprised" };
    }
    
    // Happy: Either left or right smile is active
    if (scores["mouthSmileLeft"] > 0.45 || scores["mouthSmileRight"] > 0.45) {
      return { emoji: "😊", label: "Happy" };
    }

    console.log(scores["mouthSmileLeft"] )

    // Sad: Brows are down and mouth corners are down
    if (scores["browDownLeft"] > 0.01 && (scores["mouthFrownLeft"] > 0.01 || scores["mouthFrownRight"] > 0.01)) {
      return { emoji: "😢", label: "Sad" };
    }

    // Blink/Neutral
    if (scores["eyeBlinkLeft"] > 0.6 && scores["eyeBlinkRight"] > 0.6) {
      return { emoji: "😑", label: "Blink" };
    }

    return { emoji: "😐", label: "Neutral" };
  };

  // 3. The Real-time Detection Loop
  export const detectFrame = ({webcamRef,landmarker,setOutput}) => {
      if (
        landmarker &&
        webcamRef.current &&
        webcamRef.current.video &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const result = landmarker.detectForVideo(video, performance.now());

        if (result.faceBlendshapes && result.faceBlendshapes.length > 0) {
          const currentEmotion = getEmotion(result.faceBlendshapes);
          setOutput(currentEmotion);
        }
      }
    };
  