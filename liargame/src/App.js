import "./App.css";
import React, { useState, useEffect } from "react";
// import { BrowserRouter, Route, Switch } from 'react-router-dom'
import InGame from "./views/InGame";
import Waiting from "./views/Waiting";
import Header from "./components/Header";
import NicknameModal from "./components/NicknameModal";
import io from "socket.io-client";
// import { IP_ADDRESS, PORT } from "./networking/constants";

const endPoint = "http://13.125.236.234:3001/";
export var socket = io.connect(`${endPoint}`);

export default function App() {
	const [nickname, setNickname] = useState("");
	const [nowPlaying, setNowPlaying] = useState(0);
	const [players, setGamePlayers] = useState([]);

	console.log("APP RENDERED : ", nickname);

	useEffect(() => {
		socket.on(
			"connection",
			(data) => {
				console.log(data);
			},
			[]
		);
	});

	useEffect(() => {
		setNickname(nickname);
	}, [nickname]);

	return (
		<NicknameContext.Provider value={[nickname, setNickname]}>
			<div className="App">
				<Header />
				<NowPlayingContext.Provider
					value={{ setNowPlaying, setGamePlayers }}
				>
					{nowPlaying !== 0 ? (
						<InGame
							liar={nowPlaying}
							players={players}
							nickname={nickname}
						/>
					) : (
						<Waiting nickname={nickname} />
					)}
				</NowPlayingContext.Provider>
				{!nickname && (
					<>
						<NicknameModal setNickname={setNickname} />
						<div className="modal-background"></div>
					</>
				)}
			</div>
		</NicknameContext.Provider>
	);
}

// NicknameContext
export const NicknameContext = React.createContext();
export const NowPlayingContext = React.createContext();
