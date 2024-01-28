import logo from "../logo.svg";
import "../App.css";
import RecordRTC from "recordrtc";
import { useRef, useState } from "react";

function sendOverSocket(blob) {
  const socket = new WebSocket("ws://localhost:8000/ws");

  socket.onopen = async (event) => {
    socket.send(await blob);
  };
  socket.onmessage = (event) => {
    console.log("Message from server ", event.data);
  };
}

async function captureAndSendAudio(e, setRes) {
  const constraints = (window.constraints = {
    audio: true,
    video: false,
  });

  let blobs = [];

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    let recorder = RecordRTC(stream, {
      type: "audio",
      mimeType: "audio/wav",
      timeSlice: 1000,
      ondataavailable: (blob) => {
        sendOverSocket(blob);
        blobs.push(blob);
      },
    });
    recorder.startRecording();

    const sleep = (m) => new Promise((r) => setTimeout(r, m));
    await sleep(3000);

    recorder.stopRecording();

    // const audio = ref.current
    // console.log(audio)
    // window.stream = stream
    // audio.srcObject = stream
    // audio.play()
  } catch (e) {
    console.log("no permission :(");
  }
  // const audio = ref.current
  // audio.src = URL.createObjectURL(blobs[0])
  // audio.play()
  setRes(blobs);
}

function App() {
  // const audioRef = useRef(null)
  const [audioRes, setAudioRes] = useState([]);
  const [recording, setRecording] = useState(false);
  console.log(audioRes);

  return (
    <div>
      <h1>Supppp</h1>
      <button
        onClick={async (e) => {
          setRecording((r) => !r);
          if (!recording) {
            await captureAndSendAudio(e, setAudioRes);
          }
        }}
      >
        {recording ? "Stop recording" : "Start Discussion!"}
      </button>
      {/* <audio controls ref={audioRef}></audio> */}
    </div>
  );
}

export default App;
