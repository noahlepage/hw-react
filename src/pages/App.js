import logo from "../logo.svg";
import "../App.css";
import RecordRTC from "recordrtc";
import { useRef } from "react";

async function captureAndSendAudio(e, ref) {
  const constraints = window.constraints = {
    audio: true,
    video: false
  };

  let blobs = []

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints) 
    let recorder = RecordRTC(stream, {
      type: 'audio',
      mimeType: 'audio/wav',
      timeSlice: 1000,
      ondataavailable: (blob) => blobs.push(blob)
    })
    recorder.startRecording()

    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(3000);

    recorder.stopRecording()

    // const audio = ref.current
    // console.log(audio)
    // window.stream = stream
    // audio.srcObject = stream 
    // audio.play()
  } catch (e) {
    console.log("no permission :(")    
  }
    // const audio = ref.current
    // audio.src = URL.createObjectURL(blobs[0])
    // audio.play()
}

function App() {
  const audioRef = useRef(null)

  return(
    <div>

      <h1>Supppp</h1>
      <button onClick={async (e) => captureAndSendAudio(e, audioRef)}>Start Discussion!</button>
      <audio controls ref={audioRef}></audio>
    </div>
  )
}

export default App;
