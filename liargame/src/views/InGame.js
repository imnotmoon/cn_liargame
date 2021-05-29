import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { socket } from "../App";
import Chat from "../components/ChatInGame";
import Vote from "../components/Vote";
import FinishModal from "../components/FinishModal";
import "./InGame.css";
import axios from "axios";

InGame.propTypes = {
	// 정상인은 1, 라이어는 2
	liar: PropTypes.number,
};

export default function InGame({ liar, players, nickname }) {
	const [finishModal, setFinishModal] = useState(false);
	const [modalObj, setModalObj] = useState({
		win: false,
		picked: [],
		liar: "",
	});

	socket.on("result", ({ state, liar, picked }) => {
		console.log("result !!!! ", liar, picked);
		setFinishModal(true);
		if (state === "result" && players.length === 4) {
			players.forEach((p) => {
				if (p.vote === 1) {
					sendVoteResult(nickname, p);
				}
			});
		}
	});

	socket.on("end", (data) => {
		console.log("end : ", data);
		let pickToLiar = [];
		let liarCnt = data.picked.reduce((prev, cur) => {
			if (data.liar === cur.vote) {
				pickToLiar.push(cur.nickname);
				return prev + 1;
			} else return prev;
		}, 0);
		let win = false;
		if (liar === 2) {
			if (liarCnt >= 2) {
				console.log("패배 - 라이어");
				win = false;
			} else {
				console.log("승리 - 라이어");
				win = true;
			}
		} else {
			if (pickToLiar.includes(nickname)) {
				console.log(nickname, "승리");
				win = true;
			} else {
				console.log(nickname, "패배");
				win = false;
			}
		}
		setModalObj({
			win: win,
			picked: pickToLiar,
			liar: data.liar,
		});
	});

	useEffect(() => {
		return () => {
			socket.off("result");
			socket.off("end");
		};
	}, []);

	return (
		<>
			{/* <div>{gameTime}</div> */}
			<div className="inGame">
				{liar === 1 ? (
					<Vote
						liar={false}
						title="누가 라이어입니까?"
						players={players}
					/>
				) : (
					""
				)}
				<Chat
					title={
						liar === 1
							? `단어를 설명해주세요`
							: "단어에 대해 아는척 해주세요"
					}
				/>
			</div>
			{finishModal && (
				<>
					<FinishModal
						liar={modalObj.liar === nickname ? 2 : 1}
						win={modalObj.win}
						picked={modalObj.picked}
						liarName={modalObj.liar}
					/>
					<div className="modal-background"></div>
				</>
			)}
		</>
	);
}

const sendVoteResult = (whoami, player) => {
	console.log(whoami, player);
	axios
		.post("http://13.125.236.234:3001/", {
			nickname: whoami, // my nickname
			vote: player.nickname,
		})
		.then((data) => {
			console.log(data);
		});
};

// vote context
export const PlayerContext = React.createContext();
