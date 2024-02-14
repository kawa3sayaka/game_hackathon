import './App.css';
import React, {useState} from "react";

const cardImages = [
  {"src": "/img/eating.jpg"},
  {"src": "/img/kitsune.jpg"},
  {"src": "/img/nekogyo.jpg"},
  {"src": "/img/rakuda.jpg"},
  {"src": "/img/saboten.jpg"},
  {"src": "/img/snake.jpg"}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  // カードをシャッフル
  const shuffleCards = () =>{
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(()=> Math.random() - 0.5)
      .map((card)=>({ ...card, id: Math.random() }))

      setCards(shuffledCards)
      setTurns(0)
  }

  console.log(cards, turns)

  return (
    <div className="App">
      <h1>おもちモチモチ</h1>
      <button onClick = {shuffleCards}>START</button>

      <div className = "card-grid">
        {cards.map(card => (
          <div className = "card" key = {card.id}>
              <div>
                <img className = "front" src = {card.src} alt="card front" />
                <img className = "back" src="/img/background.png" alt="card back" />
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
