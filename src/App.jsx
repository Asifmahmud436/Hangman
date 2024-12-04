import { useState } from 'react'
import Letter from './Letter'
import Word from './Word'
import Ans from './Ans'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import './App.css'

function App() {
  const [life,setLife] = useState(3)
  const [word ,setWord] = useState(generateRandomWord())
  const [letters,setLetters] = useState(generateButtons())
  const gameWon = word.every(wordPiece => wordPiece.isFound)
  const [ans,setAns] = useState(false)
  
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
    setWord(generateRandomWord())
    setLetters(generateButtons())
    setAns(false)
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

  function toggleAns(){
    setAns(prev => !prev)
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
  const ansList = word.map(x => <Ans 
    key={x.id} 
    value={x.val} 
    />)

  return (
    <>
      {gameWon && <Confetti/>}
      {!gameWon ? <div>
        <h1>Hangman</h1>
        <h3 className='lifeHeader'>Life remaining: <span className='lifeColor'>{life}</span></h3>
        
        <div className='word-list'>
          {wordList}
        </div>
        {life>0 && 
        <div>
          <div className='letter-list'>
          {letterList}
          
        </div>
        <button onClick={handleReset} className='nextGame'>New One</button>
        </div>
         
        }
        {life<=0 && 
        <div>
          <p className='lostGame'>You lost the Game!</p>
          <button onClick={handleReset}>New Game</button>
        </div> 
        }
        <div className='showAns'>
          {ans==true ? <button>{ansList}</button> : <button onClick={toggleAns}>Show Answer</button>}
        </div>
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
