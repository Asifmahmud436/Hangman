import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const [life,setLife] = useState(5)
  const [word ,setWord] = useState(generateRandomWord)

  function generateRandomWord(){
    const characters = 'AQWERTYUIOPSDFGHJKLMNBVCXZ';
    let randomWord = '';
    for(let i=0;i<5;i++){
      const randomIndex = Math.floor(Math.random()*characters.length)
      randomWord += characters[randomIndex]
    }
    return randomWord;
  }
  return (
    <>
      <div>
        <h1>Life remaining: {life}</h1>
        <h3>Word to guess: {word}</h3>
        
      </div>
    </>
  )
}

export default App
