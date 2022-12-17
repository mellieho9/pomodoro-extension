/*global chrome*/
import React, { useEffect, useRef } from 'react';
import Tasks from "./Tasks.json";
import { Backdrop } from '@mui/material';

function TaskModal() {
    const randomTaskId = Math.floor(Math.random() * (Tasks.length));
    const taskJson = Tasks[randomTaskId];
    const videoRef = useRef(null);

    useEffect(() => {
        // NOTE: can't get user permission for webcam with chrome:// 
        // chrome only allows access from secure sources such as HTTP or localhost
        navigator.mediaDevices.getUserMedia({ audio: false, video: {width: 200, height: 200} })
        .then((stream) => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        }).catch ((err) => {
            alert(`Error with loading webcam (${err})`);
        });
    }, []);
    return (
        <Backdrop 
            open
            sx={{ color: '#fff', background: 'rgba(59,39,99,0.9)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            style={{display: 'block', padding: '4em'}}
        >
            <p>Task: {taskJson.task_description}</p>
            <video style={{borderRadius: 120, borderStyle: 'solid', borderColor: 'purple'}} ref={videoRef} autoPlay />
        </Backdrop>
    );
  }
export default TaskModal;