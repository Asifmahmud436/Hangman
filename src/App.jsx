import { useState } from 'react'
import Letter from './Letter'
import Word from './Word'
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
  
  function togglePressed(id){
    setLetters(x => x.map(items =>
      items.id==id ? {...items,isPressed:!items.isPressed} : items
    ))
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
    pressed={x.isFound}
    uniqueVal={x.id}
    />)
  
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
  console.log(generateRandomWord())
  return (
    <>
      <div>
        <h3>Life remaining: {life}</h3>
        {/* <h1>{word}</h1> */}
        <div className='word-list'>
          {wordList}
        </div>
        <div className='letter-list'>
          {letterList}
        </div>
      </div>
    </>
  )
}

export default App
