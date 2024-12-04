import { useState } from 'react'
import Letter from './Letter'
import { nanoid } from 'nanoid'
import './App.css'

function App() {
  const [life,setLife] = useState(5)
  const [word ,setWord] = useState(generateRandomWord())
  const [letters,setLetters] = useState(createButtons())
  
  function createButtons(){
    let letterArray = []
    for(let i = 65; i <= 90; i++){
      let letterElement = {val:String.fromCharCode(i),
                          isPressed:false,
                          id:nanoid()
                        }
      letterArray.push(letterElement)
    }
    return letterArray
  }
  
  const letterList = letters.map(x => <Letter 
    key={x.id} 
    value={x.val} 
    pressed={x.isPressed}/>)

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
        <h1>{word}</h1>
        <div className='letter-list'>
          {letterList}
        </div>
      </div>
    </>
  )
}

export default App
