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

	socket.on("result", ({ state, liar, picked }) => {
		setFinishModal(true);
		axios
			.post("http://13.125.236.234:3001/", {
				vote: "heheheheheheheh",
			})
			.then((data) => {
				console.log(data);
			});
	});

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
					<Vote
						liar={true}
						title="나를 지목한 사람"
						players={players}
					/>
				)}
				<Chat
					title={
						liar === 1
							? "단어를 설명해주세요"
							: "단어에 대해 아는척 해주세요"
					}
				/>
			</div>
			{finishModal && (
				<>
					<FinishModal liar={liar} nickname={nickname} />
					<div className="modal-background"></div>
				</>
			)}
		</>
	);
}

// vote context
export const PlayerContext = React.createContext();
