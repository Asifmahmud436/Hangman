import { useState } from 'react'
import Letter from './Letter'
import './App.css'

function App() {
  const [life,setLife] = useState(5)
  const [word ,setWord] = useState(generateRandomWord)
  const letters = []
  for(let i = 65; i <= 90; i++){
    letters.push(String.fromCharCode(i))
  }
  const letterList = letters.map(x => <Letter value={x}/>)
  function generateRandomWord(){
    const characters = 'QWERTYUIOPASDFGHJKLMNBVCXZ';
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
        <h3>Life remaining: {life}</h3>
        <h1>Word to guess: {word}</h1>
        {letterList}
      </div>
    </>
  )
}

export default App
