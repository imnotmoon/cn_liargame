import './App.css';
import React, { useState, useEffect } from 'react'
// import { BrowserRouter, Route, Switch } from 'react-router-dom'
import InGame from './views/InGame'
import Waiting from './views/Waiting'
import Header from './components/Header'
import NicknameModal from './components/NicknameModal'


export default function App() {

  const [nickname, setNickname] = useState('')
  const [nowPlaying, setNowPlaying] = useState(0)

  return (
    <NicknameContext.Provider value={[nickname, setNickname]} >
      <div className="App">
        <Header />
        <NowPlayingContext.Provider value={setNowPlaying} >
          {
            nowPlaying !== 0 ? <InGame liar={nowPlaying} /> : <Waiting />
          }
        </NowPlayingContext.Provider>
        {!nickname &&
          <>
            <NicknameModal setNickname={setNickname} />
            <div className="modal-background"></div>
          </>}
      </div>
    </NicknameContext.Provider>
  );
}


// NicknameContext
export const NicknameContext = React.createContext()
export const NowPlayingContext = React.createContext()
