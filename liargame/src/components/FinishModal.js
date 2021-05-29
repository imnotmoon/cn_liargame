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

function FinishModal({ liar, win, picked, liarName }) {
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
					<div>{liarName}</div>
				</div>
			) : (
				<div>
					<p>나를 라이어로 지목한 사람</p>
					<div>
						{picked.map((player, index) => (
							<div key={index}>{player}</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default FinishModal;
