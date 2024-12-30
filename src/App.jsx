import React, { useEffect, useState } from 'react'
import Routers from './Routers'


const App = () => {
  useEffect(() => {
    const audio = new Audio("../pokemonBacksound.mp3"); // Path ke backsound
    audio.loop = true; // Ulangi backsound terus menerus
    audio.volume = 0.5;

    // Play audio setelah interaksi pengguna
    const playAudio = () => {
      audio.play().catch((error) => {
        console.error("Audio playback failed: ", error);
      });
      // Hapus event listener setelah audio diputar
      document.removeEventListener("click", playAudio);
    };

    // Tambahkan event listener pada dokumen
    document.addEventListener("click", playAudio);

    return () => {
      audio.pause(); // Hentikan audio saat komponen dilepas
      document.removeEventListener("click", playAudio);
    };
  }, []);


  return (
    <>
      <Routers />
    </>
  )
}

export default App