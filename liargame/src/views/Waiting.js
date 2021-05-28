import React, { useState, useContext, useEffect } from "react";
import Chat from "../components/ChatWaiting";
import { NicknameContext, NowPlayingContext, socket } from "../App";
import WaitingRoom from "../components/WaitingRoom";
import StartGameModal from "../components/StartGameModal";
import "./Waiting.css";

export default function Waiting({ nickname }) {
	// const [nickname, setNickname] = useContext(NicknameContext);
	const { setNowPlaying, setGamePlayers } = useContext(NowPlayingContext);
	const [players, setPlayers] = useState([]);
	const [activeModal, setActiveModal] = useState(false);
	const [currentNickname, setCurrentNickname] = useState(nickname);

	const [liar, setLiar] = useState(false);
	const [word, setWord] = useState("컴네");

	console.log("Waiting RENDERED : ", nickname);

	useEffect(() => {
		// socket : 서버로부터 받은 입장 메시지 처리. players 배열에 추가
		socket.on("enter", ({ state, player }) => {
			// pseudo code
			state === "enter" && setPlayers((players) => player);
		});

		// socket : 서버로부터 받은 게임시작 메시지 처리.
		// setLiar : 내가 라이어인지 아닌지
		// setword : 라이어가 아니라면 설명해야 할 단어
		socket.on("gameset", ({ state, player, liar, word }) => {
			console.log("gameset", player, liar, word);
			console.log(nickname);

			if (state === "gameset") {
				liar === nickname ? setLiar(true) : setLiar(false);
				liar && setWord(word);
				setActiveModal(true);
				setTimeout(() => {
					setActiveModal(false);
					if (liar === nickname) {
						setNowPlaying(2); // not liar
					} else {
						setNowPlaying(1); // liar
					}
					setGamePlayers(
						player.reduce((prev, cur) => {
							return [...prev, { nickname: cur, vote: 0 }];
						}, [])
					);
				}, 5000);
			}
			return socket.offAny();
		});

		// socket : 컴포넌트 죽을때 리스너 제거
		return socket.offAny();
	}, [nickname]);

	return (
		<>
			<NowPlayingContext.Consumer>
				{() => (
					<div className="waiting">
						<WaitingRoom players={players} />
						<Chat title={"채팅"} />
					</div>
				)}
			</NowPlayingContext.Consumer>
			{activeModal && (
				<>
					<StartGameModal liar={liar} word={word} />
					<div className="modal-background"></div>
				</>
			)}
		</>
	);
}
