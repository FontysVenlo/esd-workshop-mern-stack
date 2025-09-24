import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
// In your main App.tsx or wherever you want to use it
import TRexGame from './components/TRexGame';

function App() {
  const [name, setName] = useState("");
  const api = import.meta.env.VITE_BACKEND_URL;

  const handleClick = async (e) => {
    // e.preventDefault();

    const userInput = window.prompt("Please enter your name:");


    // Show browser prompt with default value

    if (userInput !== null) {

      const username = { rNumber: 1, name: userInput, score: 1 }

      const response = await fetch(`${api}/api/routes/set-user`,
        {
          method: 'POST',
          body: JSON.stringify(username),
          credentials: 'include', // Include JWT cookies
          headers: { 'Content-Type': 'application/json' }
        }
      )
      const json = await response.json();

      if (!response.ok) {
        console.log(json.error)
      } else {
        setName(userInput);

      }





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