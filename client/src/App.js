import io from "socket.io-client";

import './App.css';
import ElectionPage from "./components/election page/ElectionPage";

const socket = io.connect("http://localhost:4200/", {
  reconnection: true
});

function App() {
  return (
    <div className="App">
      <ElectionPage socket={socket} />
    </div>
  );
}

export default App;
