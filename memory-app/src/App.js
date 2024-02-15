import './App.css';
import React, { useEffect, useState} from "react";
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/one.jpg", matched: false },
  {"src": "/img/two.jpg", matched: false },
  {"src": "/img/three.jpg", matched: false },
  {"src": "/img/four.jpg", matched: false },
  {"src": "/img/five.jpg", matched: false },
  {"src": "/img/six.jpg", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //自動的に新しいゲームを始める
  useEffect(()=> {
    shuffleCards()
  }, [])

  // カードをシャッフル
  const shuffleCards = () =>{
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(()=> Math.random() - 0.5)
      .map((card)=>({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  //一枚目に選んだカードかどうか判定して、変数に代入
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //判定
  useEffect(()=>{
    
    if(choiceOne && choiceTwo){
      setDisabled(true)

      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card =>{
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        //1000ミリ秒後に裏返しに戻す
        setTimeout(() => resetTurn(), 1000)
      }
    }
  },[choiceOne, choiceTwo])

  //選んだカードのリセット＆回数制限を追加
  const resetTurn = () =>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>絵あわせ</h1>
      
      <button onClick = {shuffleCards}>START</button>

      <div className = "card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice = {handleChoice}
            flipped = {card === choiceOne || card === choiceTwo || card.matched}
            disabled = {disabled}
            />
        ))}
      </div>
      <h2>ターン： {turns}</h2>
    </div>
  );
}

export default App;
