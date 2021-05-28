import React, { useState, useRef, useEffect } from "react";
import { NicknameContext, socket } from "../App";
import PropTypes from "prop-types";
import "./NicknameModal.css";

NicknameModal.propTypes = {
	// nickname의 setter
	setNickname: PropTypes.func.isRequired,
};

export default function NicknameModal({ setNickname }) {
	const [currentNickname, setCurrentNickname] = useState("");
	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	});

	const onInputChange = (e) => {
		setCurrentNickname(e.currentTarget.value);
	};

	const onButtonClick = (e) => {
		console.log(currentNickname);
		setNickname(currentNickname);

		(() => {
			socket.emit("enter", {
				state: "enter",
				player: currentNickname,
			});
			console.log("emit 'enter' message : ");
		})();
	};

	return (
		<NicknameContext.Consumer>
			{() => (
				<div className="nicknameModal frame modal">
					<div className="title">안녕하세요!</div>
					<div className="content">
						<p>사용할 닉네임을 입력해주세요.</p>
					</div>
					<input
						type="text"
						placeholder="닉네임"
						onChange={onInputChange}
						ref={inputRef}
					/>
					<br />
					<div className="submitBtn" onClick={onButtonClick}>
						확인
					</div>
				</div>
			)}
		</NicknameContext.Consumer>
	);
}
