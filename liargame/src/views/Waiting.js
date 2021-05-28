import React, { useState, useContext, useEffect } from "react";
import Chat from "../components/Chat";
import { NicknameContext, NowPlayingContext, socket } from "../App";
import WaitingRoom from "../components/WaitingRoom";
import StartGameModal from "../components/StartGameModal";
import "./Waiting.css";

export default function Waiting() {
	const [nickname, setNickname] = useContext(NicknameContext);
	const setNowPlaying = useContext(NowPlayingContext);
	const [players, setPlayers] = useState([]);
	const [activeModal, setActiveModal] = useState(false);

	//! 서버에서 보내준 값으로 set
	const [liar, setLiar] = useState(false);
	const [word, setWord] = useState("컴네");

	// useEffect(() => {
	// 	setPlayers([nickname]);
	// }, [nickname]);

	useEffect(() => {
		// socket : 서버로부터 받은 입장 메시지 처리. players 배열에 추가
		socket.on("enter", async ({ state, player }) => {
			console.log("enter", player);

			// pseudo code
			state === "enter" && setPlayers((players) => player);
		});

		// socket : 서버로부터 받은 게임시작 메시지 처리.
		// setLiar : 내가 라이어인지 아닌지
		// setword : 라이어가 아니라면 설명해야 할 단어
		socket.on("gameset", ({ state, player, liar, word }) => {
			console.log("gameset", player, liar, word);

			if (state === "gameset") {
				liar ? setLiar(true) : setLiar(false);
				liar && setWord(word);
			}
		});

		// socket : 컴포넌트 죽을때 리스너 제거
		return socket.offAny();
	}, []);

	//! Test -> 지금은 버튼이지만 나중에는 서버에서 받은 값으로부터 트리거될것
	const addPlayer = () => {
		setPlayers([...players, "John Doe"]);
		if (players.length === 3) {
			/*
                0. confirm that i'm a liar or not
                1. pop modal
                2. setTimeout
                3. to game
            */
			setActiveModal(true);
			setTimeout(() => {
				setActiveModal(false);
				if (liar) {
					setNowPlaying(2); // not liar
				} else {
					setNowPlaying(1); // liar
				}
			}, 5000);
		}
	};

	return (
		<>
			<button onClick={addPlayer}>테스트</button>
			<NowPlayingContext.Consumer>
				{() => (
					<div className="waiting">
						<WaitingRoom players={players} />
						<Chat title={"채팅"} mount={true} />
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
