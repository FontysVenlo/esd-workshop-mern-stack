import { useState, useEffect, useRef } from 'react'
import './App.css' 
import TRexGame from './components/TRexGame';
import { saveToCookies, getCookieData } from './utils/gameUtils';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashBoard from './components/TRexGame/DashBoard';


function App() {
  const [name, setName] = useState("");
  const dataFromCookiesForScore = getCookieData('trex-high-score');
  const dataFromCookiesForName = getCookieData('player-name');

  const rawScore = dataFromCookiesForScore.get("trex-high-score");
  const highScore = Number(rawScore) || 0;

  const rawName = dataFromCookiesForName.get("player-name") ?? "No Name - Enter A name to Play";





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
      if (!rawName.trim()) {

        if (e.code === "Space" || e.code === "Enter") {
          handleClick(e);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [rawName, name]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TRexGame score={highScore} playerName={rawName} />} />
          <Route path="/dashboard" element={<DashBoard players={[{ name: "Alice", score: 10 }, { name: "Bob", score: 8 }]} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;