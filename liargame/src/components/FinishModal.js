import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NicknameContext from "../App";
import "./FinishModal.css";
import { socket } from "../App";

FinishModal.propTypes = {
	// 1이면 정상인, 2면 라이어
	liar: PropTypes.number.isRequired,

	// 내 닉네임
	nickname: PropTypes.string.isRequired,
};

//! 가상의 결과데이터
let result = {
	liar: "조세희",
	picked: {
		문상혁: "조세희",
		이하은: "조세희",
		정세은: "문상혁",
	},
};

function FinishModal({ liar, nickname }) {
	const [picked, setPicked] = useState([]);
	const [win, setWin] = useState(false);

	// socket : 동기 안맞을수도 있음 -> result를 state로 바꿔주면됨
	useEffect(() => {
		console.log(result);

		// socket : 게임 결과를 전달받음
		socket.on("result", ({ state, liar, picked }) => {
			console.log("result message received : ", liar, picked);

			if (state === "result") {
				result.liar = liar;
				result.picked = picked;
			}
		});

		// 결과(result) 데이터 처리
		if (liar === 2) {
			// 내가 라이어인 경우
			let pickedCnt = 0;
			Object.keys(result.picked).forEach((player) => {
				const vote = result.picked[player];
				console.log(player, vote);
				if (vote === result.liar) {
					pickedCnt += 1;
					setPicked((picked) => [...picked, player]);
					console.log(picked);
				}
			});
			if (pickedCnt >= 2) setWin(false);
			else setWin(true);
		} else {
			// 내가 정상인인 경우
			Object.keys(result.picked).forEach((player) => {
				const vote = result.picked[player];
				if (player === nickname && vote === result.liar) {
					console.log(nickname, player, result.liar, vote);
					console.log("이겼구만");
					setWin((win) => !win);
				}
			});
		}
	}, []);

	return (
		<div className="finishModal frame modal">
			<div className="title">
				{win === true
					? "게임에서 승리했습니다"
					: "게임에서 패배했습니다"}
			</div>
			{win === true ? (
				""
			) : liar === 1 ? (
				<div>
					<p>라이어는</p>
					<div>{result.liar}</div>
				</div>
			) : (
				<div>
					<p>나를 라이어로 지목한 사람</p>
					<div>
						{picked.map((player, index) => (
							<span key={index}>{player}</span>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default FinishModal;
