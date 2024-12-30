import { useState, useEffect } from 'react';
import backImg from "./assets/back.jpg";
import fireImg from "./assets/fire.jpg";
import darknessImg from "./assets/darkness.jpg";
import doubleImg from "./assets/double.jpg";
import fairyImg from "./assets/fairy.jpg";
import fightingImg from "./assets/fighting.jpg";
import grassImg from "./assets/grass.jpg";
import lightningImg from "./assets/lightning.jpg";
import metalImg from "./assets/metal.jpg";
import psychicImg from "./assets/psychic.jpg";
import waterImg from "./assets/water.jpg";
import MouseTrail from './assets/components/MouseTrail';
import Confetti from 'react-confetti';

const GamePage = () => {
      const cardImages = {
            fire: fireImg,
            darkness: darknessImg,
            double: doubleImg,
            fairy: fairyImg,
            fighting: fightingImg,
            grass: grassImg,
            lightning: lightningImg,
            metal: metalImg,
            psychic: psychicImg,
            water: waterImg,
      }
      const cardList = Object.keys(cardImages);
      const [board, setBoard] = useState([]);
      const [shuffledCards, setShuffledCards] = useState([]);
      const [card1, setCard1] = useState(null);
      const [card2, setCard2] = useState(null);
      const [tryCard, setTryCard] = useState(0);
      const [gameWon, setGameWon] = useState(false);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const rows = 4;
      const columns = 5

      // Shuffle the cards when the game starts
      useEffect(() => {
            shuffleCards();
      }, []);

      useEffect(() => {
            if (shuffledCards.length > 0) {
                  initializeBoard();
            }
      }, [shuffledCards]);

      // Shuffle cards function
      const shuffleCards = () => {
            let cardSet = cardList.concat(cardList); // duplicate cards
            for (let i = cardSet.length - 1; i > 0; i--) {
                  let j = Math.floor(Math.random() * (i + 1));
                  [cardSet[i], cardSet[j]] = [cardSet[j], cardSet[i]]; // swap elements
            }
            setShuffledCards(cardSet);
      };

      // Initialize board
      const initializeBoard = () => {
            const tempBoard = [];
            let tempCards = [...shuffledCards];
            for (let r = 0; r < rows; r++) {
                  let row = [];
                  for (let c = 0; c < columns; c++) {
                        row.push({
                              id: `${r}-${c}`,
                              img: tempCards.pop(),
                              flipped: false,
                              matched: false,
                        });
                  }
                  tempBoard.push(row);
            }
            setBoard(tempBoard);
            setGameWon(false); // Reset status kemenangan
            setIsModalOpen(false); // Tutup modal
            setTryCard(0); // Reset jumlah percobaan
      };

      // Handle card click
      const selectCard = (card) => {
            if (!card.flipped && !card.matched) {
                  const updatedBoard = board.map((row) =>
                        row.map((item) =>
                              item.id === card.id ? { ...item, flipped: true } : item
                        )
                  );

                  if (!card1) {
                        setCard1(card);
                  } else if (!card2 && card.id !== card1.id) {
                        setCard2(card);
                  }

                  setBoard(updatedBoard);
            }
      };

      // Check for a match
      useEffect(() => {
            if (card1 && card2) {
                  setTimeout(() => {
                        if (card1.img !== card2.img) {
                              setTryCard(tryCard + 1);
                              resetCards();
                        } else {
                              setBoard((prevBoard) =>
                                    prevBoard.map((row) =>
                                          row.map((item) =>
                                                item.id === card1.id || item.id === card2.id
                                                      ? { ...item, matched: true }
                                                      : item
                                          )
                                    )
                              );
                              setCard1(null);
                              setCard2(null);
                        }
                  }, 1000);
            }
      }, [card1, card2]);

      // Check if all cards are matched
      useEffect(() => {
            const allMatched = board.flat().every((card) => card.matched);
            if (allMatched && board.length > 0) {
                  setGameWon(true);
                  setIsModalOpen(true); // Tampilkan modal jika game selesai
            }
      }, [board]);

      const resetCards = () => {
            setBoard((prevBoard) =>
                  prevBoard.map((row) =>
                        row.map((item) =>
                              item.id === card1.id || item.id === card2.id
                                    ? { ...item, flipped: false }
                                    : item
                        )
                  )
            );
            setCard1(null);
            setCard2(null);
      };

      return (
            <div className="flex flex-col justify-center bg-cover bg-pokemon bg-center bg-fixed md:bg-center sm:bg-top min-h-screen">
                  <MouseTrail />

                  <div className="flex flex-col h-40 justify-center items-center">
                        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-pokemon font-bold'>
                              PokeMatch
                        </h1>
                        <h3 className='text-lg sm:text-xl lg:text-3xl font-poppins font-bold mt-8'>
                              Percobaan: {tryCard}
                        </h3>
                  </div>

                  {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center">
                                    <h2 className="text-2xl font-bold mb-4">Selamat!</h2>
                                    <p className="mb-6">Anda berhasil menyelesaikan game, Main lagi?</p>
                                    <button
                                          onClick={initializeBoard}
                                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                          Main Lagi
                                    </button>
                              </div>
                        </div>
                  )}

                  <div className="flex justify-center items-center relative">
                        {gameWon && (
                              <Confetti
                                    width={window.innerWidth}
                                    height={window.innerHeight}
                                    recycle={false} // Confetti berhenti setelah beberapa saat
                                    numberOfPieces={300}
                              />
                        )}

                        <div id="board" className="h-[330px] sm:h-[532px] w-[300px] sm:w-[475px] flex flex-wrap bg-[whitesmoke] border-[10px] border-gray-300 mx-auto">
                              {board.map((row) =>
                                    row.map((card) => (
                                          <div key={card.id} className="card h-[70px] sm:h-[120px] w-[50px] sm:w-[86px] m-[2.5px] perspective-[1000px] hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out">
                                                {/* Wrapper for flip animation */}
                                                <div className={`card-flip relative w-full h-full ${card.flipped || card.matched ? "flipped" : ""}`} onClick={() => selectCard(card)} >

                                                      {/* Front of the card */}
                                                      <div className="card-front absolute w-full h-full bg-gray-200 flex items-center justify-center">
                                                            <img src={backImg} alt="back" className="w-full h-full object-cover cursor-pointer" />
                                                      </div>

                                                      {/* Back of the card */}
                                                      <div className="card-back absolute w-full h-full">
                                                            <img src={cardImages[card.img]} alt="front" className="w-full h-full object-cover cursor-pointer" />
                                                      </div>
                                                </div>
                                          </div>
                                    ))
                              )}
                        </div>
                  </div>
            </div >
      );

}

export default GamePage;
