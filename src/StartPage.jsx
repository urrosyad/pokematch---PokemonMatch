import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MouseTrail from './assets/components/MouseTrail';

import './index.css'

const StartPage = () => {
  const navigate = useNavigate()
  const text = "Welcome  to PokeMatch"

  return (
    <div className="grid grid-rows-2 items-center justify-center bg-cover bg-pokemon bg-center bg-fixed 
      md:bg-center sm:bg-top min-h-screen">
      <MouseTrail />
      {/* Bagian Header */}
      <div className="p-6 flex flex-col items-center justify-center text-center z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-pokemon font-bold text-center">
          {text.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-2">
              {word.split('').map((char, charIndex) => (
                <span key={charIndex} className="text-hover-lightning">
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-poppins text-gray-600 tracking-wide mt-8">
          Mulai Petualanganmu dengan Mengasah Ingatanmu
        </h2>
      </div>

      {/* Bagian Button */}
      <div className="flex items-center justify-center mb-10 sm:mb-20 lg:mb-20 z-10">
        <button
          className="bg-yellow-500 text-black text-sm sm:text-lg font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-lg shadow-lg hover:scale-105 transition-all hover:bg-yellow-300"
          onClick={() => navigate("/gameplay")}
        >
          MULAI SEKARANG
        </button>
      </div>
    </div>
  );
};

export default StartPage;
