import React, { useState, useEffect, useRef } from 'react';
import Tasks from "./Tasks.json";

function TaskModal() {
    const randomTaskId = Math.floor(Math.random() * (Tasks.length));
    const taskJson = Tasks[randomTaskId];
    const videoRef = useRef(null);

    useEffect(() => {
        
        navigator.mediaDevices.getUserMedia({ video: {width: 200, height: 200} })
        .then(stream => {
            videoRef.current.srcObject = stream;
        });
    }, []);
    return (
      <div>
        <p>{taskJson.task_description}</p>
        <video style={{borderRadius: 120, borderStyle: 'solid', borderColor: 'purple'}} ref={videoRef} autoPlay />
      </div>
    );
  }
export default TaskModal;