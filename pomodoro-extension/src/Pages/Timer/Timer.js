/*global chrome*/
import React, { useState, useEffect } from 'react';
import TaskModal from '../TaskModal/TaskModal.js';
import {
    ButtonGroup,
    Button
} from '@mui/material'

function Timer() {
    const [time, setTime] = useState(1500);  // Initial time is 25 minutes (in seconds)
    const [isRunning, setIsRunning] = useState(false);  // Timer is initially paused
    const [breakLength, setBreakLength] = useState(300);  // Break length is 5 minutes (in seconds)
    const [sessionLength, setSessionLength] = useState(1500);  // Session length is 25 minutes (in seconds)
    const [isBreak, setIsBreak] = useState(false);  // Timer is initially in a work session
    const [taskCompleted, setTaskCompleted] = useState(true); // keep track if Task was completed or not
    
    function setStorage() {
      chrome.storage.sync.set({ time: time, taskCompleted, setTaskCompleted });
    }

    function getStorage() {
      chrome.storage.sync.get(null, (results) => {
        // TODO: need some way to keep track of timer when extension is closed
        // maybe look into background scripts
      })
    }

    useEffect(() => {
      setStorage();
      getStorage();
    }, [time, isBreak])

    // Decrements timer 
    useEffect(() => {
      let interval = null;
      if (isRunning && taskCompleted) {
        interval = setInterval(() => {
          setTime(time => time - 1);
        }, 1000);
      } else if (!isRunning && time !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isRunning, time, taskCompleted]);
  
    // Resets timer from session length to break length and vice versa
    useEffect(() => {
      if (time === 0) {
            if (isBreak && taskCompleted) {
                setTime(sessionLength);
                setIsBreak(false);
            } else {
                setTaskCompleted(false);
                setTime(breakLength);
                setIsBreak(true);
            }
      }
    }, [time, breakLength, sessionLength, isBreak, taskCompleted]);
  
    const handleStartStopClick = () => {
      setIsRunning(!isRunning);
    };
  
    const handleResetClick = () => {
      setTime(sessionLength);
      setIsRunning(false);
      setIsBreak(false);
    };
  
    const handleSessionLengthChange = (event) => {
      setSessionLength(event.target.value * 60);
      setTime(event.target.value * 60);
    };
  
    const handleBreakLengthChange = (event) => {
      setBreakLength(event.target.value * 60);
    };
  
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
  
    return (
      <div>
        <p>Session length: {sessionLength / 60} minutes</p>
        <input type="range" min="1" max="60" value={sessionLength / 60} onChange={handleSessionLengthChange} />
        <p>Break length: {breakLength / 60} minutes</p>
        <input type="range" min="1" max="15" value={breakLength / 60} onChange={handleBreakLengthChange} />
        <p>{minutes}:{seconds}</p>
        
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={handleStartStopClick}>{isRunning ? 'Pause' : 'Start'}</Button>
            <Button onClick={handleResetClick}>Reset</Button>
        </ButtonGroup>
        {isBreak && <TaskModal />}
      </div>
    );
  }
export default Timer;