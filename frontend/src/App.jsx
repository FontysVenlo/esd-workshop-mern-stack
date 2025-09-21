import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// In your main App.tsx or wherever you want to use it
import TRexGame from './components/TRexGame';

function App() {
  return (
    <div className="App">
      <TRexGame />
    </div>
  );
}

export default App;