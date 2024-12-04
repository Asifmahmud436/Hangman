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
  const gameWon = word.every(wordPiece => wordPiece.isFound)
  
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
      items.val==val ? {...items,isFound:!items.isFound} : items
    ))
    if (!word.find(item => item.val === val && item.isFound)) {
      handleLives(val);
    }
  }

  function handleReset(){
    setLife(3)
    setWord(generateRandomWord)
    setLetters(generateButtons)
  }

  function handleLives(val){
    let flag = false;
    for(let i = 0; i < word.length; i++){
      if(word[i].val==val){
        flag = true;
        break;
      }
    }
    if(!flag){
      setLife(prev => prev-1)
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

  return (
    <>
      {gameWon && <Confetti/>}
      {!gameWon ? <div>
        <h1>HangMan</h1>
        <h3 className='lifeHeader'>Life remaining: <span className='lifeColor'>{life}</span></h3>
        
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
      :
      <div className='winBanner'>
        <h1>Congratulations!</h1>  
        <h3>You won the game</h3>
        <button onClick={handleReset}>Play again</button>
      </div>
      }
      
    </>
  )
}

export default App
