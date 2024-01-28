import logo from "../logo.svg";
import "../App.css";
import RecordRTC from "recordrtc";

function App() {
  const backendAddress = "localhost";
  let socket = new WebSocket(`ws://${backendAddress}:8765`);

  // socket.onopen = () => {

  // };

  // Handle connection open
  socket.addEventListener("open", (event) => {
    console.log("WebSocket connection opened");

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log("stream", stream.active, stream.getAudioTracks().length);
        let recorder = new RecordRTC(stream, {
          type: "audio",
          mimeType: "audio/webm;codecs=pcm", // endpoint requires 16bit PCM audio
          recorderType: RecordRTC.StereoAudioRecorder,
          timeSlice: 250, // set 250 ms intervals of data
          desiredSampRate: 16000,
          numberOfAudioChannels: 1, // real-time requires only one channel
          bufferSize: 4096,
          audioBitsPerSecond: 128000,
          ondataavailable: (blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              const base64data = reader.result;

              // audio data must be sent as a base64 encoded string
              if (socket) {
                console.log("Sending to backend");
                socket.send(
                  JSON.stringify({ audio_data: base64data.split("base64,")[1] })
                );
              }
            };
            reader.readAsDataURL(blob);
          },
        });

        recorder.startRecording();
      })
      .catch((err) => console.error(err));

    // Now that the connection is open, you can start sending audio data if needed
    // For example, you might want to initiate audio recording here
    // ...

    // Send a test audio data after the connection is open (replace this with actual audio data)
    sendAudioData("Test audio data");
  });

  // Handle incoming messages (audio data or response data)
  socket.addEventListener("message", (event) => {
    console.log("Received data:", event.data);
  });

  // Handle connection close
  socket.addEventListener("close", (event) => {
    console.log(event);
    socket = null;
  });

  // Send audio data to the backend
  function sendAudioData(audioData) {
    // Check if the WebSocket connection is open before sending data
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(audioData);
    } else {
      console.error("WebSocket connection is not open.");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div class="real-time-interface">
        <p id="real-time-title" class="real-time-interface__title">
          Click start to begin recording!
        </p>
        <button id="button" class="real-time-interface__button">
          Start
        </button>
        <p id="message" class="real-time-interface__message"></p>
      </div>
    </div>
  );
}

export default App;
