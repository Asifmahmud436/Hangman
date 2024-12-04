import { useState } from 'react'
import Letter from './Letter'
import Word from './Word'
import { nanoid } from 'nanoid'
import './App.css'

function App() {
  const [life,setLife] = useState(3)
  const [word ,setWord] = useState(generateRandomWord())
  const [letters,setLetters] = useState(generateButtons())
  
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

    let foundMatch = false

    setWord(x => x.map(items =>
      // items.val==val ? {...items,isFound:!items.isFound} : items
      
      {
        
        if(items.val==val){
          foundMatch = true
          return {...items,isFound:!items.isFound}
          
        }
        else{
          return items
        }
        
      }
    ))
    if(!foundMatch){
      setLife(prev=>prev-1)
    }
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
      <div>
        <h3>Life remaining: {life}</h3>
        
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
