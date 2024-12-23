
import React, { useEffect, useRef, useState } from "react";
import './../styles/App.css';

const App = () => {
  const [elapsedTime,setElapsedTime] = useState(0);
  const [lapTimearr,setLapTimearr]=useState([]);
  const timerRef=useRef(null);

  function padStart(num){
    return num.toString().padStart(2,'0')
  }

  const formatTime=(time)=>{
    const minutes = padStart(Math.floor(time / 6000)); // Each minute is 6000 ms
    const seconds = padStart(Math.floor((time % 6000) / 100));
    const milliseconds = padStart(time % 100);
    return `${minutes}:${seconds}:${milliseconds}`;
  }

  const startTimer=()=>{
    timerRef.current=setInterval(()=>{
      setElapsedTime((prev)=>prev+1);
    },10);
  }

  const stopTimer=()=>{
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  const resetTimer=()=>{
    stopTimer();
    setElapsedTime(0);
    setLapTimearr([]);
  }

  const lapTimer=()=>{
    setLapTimearr((prev)=>[...prev,formatTime(elapsedTime)])
  }

  useEffect(()=>{
    return ()=>stopTimer();
  },[])
   
  return (
    <div className='container'>
        {/* Do not remove the main div */}

        <div id='timerDisplay'>
          {formatTime(elapsedTime)}
        </div>
        <div className="buttonContainer">
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={lapTimer}>Lap</button>
        <button onClick={resetTimer}>Reset</button>
        </div>
        <div className="laptimerArray">
        <ul>
          {
            lapTimearr.map((item)=>(
              <li>
                {item}
              </li>
            ))
          }
          </ul>
        </div>
    </div>
  )
}

export default App
