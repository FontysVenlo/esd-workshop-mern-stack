import { useState, useEffect } from 'react'
import './App.css'
import TRexGame from './components/TRexGame';
import { saveToCookies } from './utils/gameUtils';

function App() {
  const [name, setName] = useState("");

  const handleClick = async (e) => {
    if (e) e.preventDefault();
    const userInput = window.prompt("Please enter your name!:");
    const trimmed = userInput ? userInput.trim() : "";

    if (trimmed) {
      saveToCookies("player-name", trimmed);
      setName(trimmed);
    } else {
      alert("Name cannot be empty.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!name.trim()) {

        if (e.code === "Space" || e.code === "Enter") {
          handleClick(e);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [name]);

  return (
    <div className="App">
      {name && <p>You entered: {name}</p>}
      <TRexGame />
    </div>
  );
}

export default App;