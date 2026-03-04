import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";


export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [ expression, setExpression ] = useState("Detecting...");

    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
        const expression = detect({ landmarkerRef, videoRef, setExpression })
        onClick(expression)
    }


    return (
        <div className="webcame-container">
            <video
                ref={videoRef}
                 className="webcame"
                playsInline
            />
            <h2 style={{ color: "rgb(227, 222, 222)" }}>
                {expression}
            </h2>
             <button 
                className="button_start_check"
                onClick={handleClick}
            >
                 Detect Expression
            </button>
        </div>
    );
}














