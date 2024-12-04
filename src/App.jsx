import { useState } from 'react'
import Letter from './Letter'
import Word from './Word'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import './App.css'

function App() {
  const [life,setLife] = useState(3)
  const [word ,setWord] = useState(generateRandomWord())
  const [letters,setLetters] = useState(generateButtons())
  const gameWon = word.every(w => w.isFound)
  
  function generateButtons(){
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

  function generateRandomWord(){
    const characters = 'QWERTYUIOPASDFGHJKLMNBVCXZ';
    const wordArray = []
    for(let i=0;i<5;i++){
      const randomIndex = Math.floor(Math.random()*characters.length)
      let wordElement = {
                        val: characters[randomIndex],
                        isFound:false,
                        id:nanoid()
      }
      wordArray.push(wordElement)
      
    }
    return wordArray;
  }

  function togglePressed(id,val){
    setLetters(x => x.map(items =>
      items.id==id ? {...items,isPressed:!items.isPressed} : items
    ))

    setWord(x => x.map(items =>
      {
        if(items.val==val){
          return {...items,isFound:!items.isFound}
          
        }
        else{
          return items
        }
      }
    ))
  }

  function handleReset(){
    setLife(3)
    setWord(generateRandomWord)
    setLetters(generateButtons)
  }

  

  const letterList = letters.map(x => <Letter 
    key={x.id} 
    value={x.val} 
    pressed={x.isPressed}
    uniqueVal={x.id}
    handleClick={togglePressed}
    />)
  const wordList = word.map(x => <Word 
    key={x.id} 
    value={x.val} 
    found={x.isFound}
    uniqueVal={x.id}
    />)
  
  console.log(word)
  return (
    <>
      {gameWon && <Confetti/>}
      <div>
        <h3>Life remaining: {life}</h3>
        
        <div className='word-list'>
          {wordList}
        </div>
        {life>0 && 
        <div className='letter-list'>
          {letterList}
        </div> 
        }
        {life<=0 && 
        <div>
          <p>You lost the Game!</p>
          <button onClick={handleReset}>Restart</button>
        </div> 
        }
        

      </div>
    </>
  )
}

export default App
