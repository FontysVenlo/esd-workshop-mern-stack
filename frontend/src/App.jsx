import { useState } from 'react'
import './App.css'
// In your main App.tsx or wherever you want to use it
import TRexGame from './components/TRexGame';
import { saveToCookies } from './utils/gameUtils';

function App() {
  const [name, setName] = useState("");

  const api = import.meta.env.VITE_BACKEND_URL;

  const handleClick = async (e) => {
    e.preventDefault();

    const userInput = window.prompt("Please enter your name:");

    if (userInput !== null) {
      saveToCookies('player-name',userInput )
      setName(userInput);
    }
  };
  return (
    <div className="App">

      <button onClick={handleClick}>Ask for name</button>
      {name && <p>You entered: {name}</p>}
      <TRexGame />
    </div>
  );
}

export default App;