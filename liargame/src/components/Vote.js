import React, { useState, useContext, memo } from "react";
import PropTypes from "prop-types";
import { NicknameContext } from "../App";
import { PlayerContext } from "../views/InGame";
import "./Vote.css";

Vote.propTypes = {
	// 라이어인지 아닌지
	liar: PropTypes.bool.isRequired,

	// 타이틀
	title: PropTypes.string.isRequired,
};

function Vote({ liar, title, players }) {
	const [voteCnt, setVoteCnt] = useState(3);
	const [nickname, setNickname] = useContext(NicknameContext);

	const onCheck = (e) => {
		if (voteCnt > 0) {
			// 클릭된 플레이어의 인덱스 가져오기 + 클릭된 플레이어에게 체크 + 다른 플레이어에게 체크된거 제거
			players.forEach((player) => {
				player.vote =
					player.nickname === e.currentTarget.getAttribute("data")
						? 1
						: 0;
			});

			// voteCnt 하나 내리기
			setVoteCnt((voteCnt) => voteCnt - 1);
		} else {
			alert("더 이상 투표할 수 없습니다");
		}
	};

	return (
		<div className="vote frame">
			<div className="vote__title">
				<p>{title}</p>
			</div>
			{!liar ? (
				<div className="vote__players">
					{players.map(
						(player, index) =>
							player.nickname !== nickname && (
								<div
									key={index}
									onClick={onCheck}
									data={player.nickname}
									className={
										"vote__cell" +
										(player.vote === 1 ? " check" : "")
									}
								>
									<span>{player.nickname}</span>
									<div className="vote__check">O</div>
								</div>
							)
					)}
					<div>
						<p>남은 투표 횟수 : {voteCnt}/3 회</p>
					</div>
				</div>
			) : (
				<div className="vote__status">
					{players.map(
						(player, index) =>
							player.nickname !== nickname && (
								<div key={index}>
									<span>{player.nickname}</span>
									<span>나를 지목</span>
								</div>
							)
					)}
				</div>
			)}
		</div>
	);
}

export default React.memo(Vote);
