import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import ChatMessage from "./ChatMessage";
import "./Chat.css";
import { NicknameContext, socket } from "../App";

Chat.propTypes = {
	// 채팅방의 제목
	title: PropTypes.string.isRequired,
};

function Chat({ title, mount }) {
	const [inputMessage, setInputMessage] = useState(""); // 지금 입력하고 있는 메시지 내용
	const [messages, setMessages] = useState([]); // 대화내용
	const [nickname, setNickname] = useContext(NicknameContext);

	const onInputChange = (e) => {
		setInputMessage(e.currentTarget.value);
	};

	const onSubmitClick = (e) => {
		e.preventDefault();

		// socekt : 소켓 통신을 통해 서버로 메시지 전송
		socket.emit("chat", {
			state: "chat",
			name: nickname,
			text: inputMessage,
		});

		// messages 배열에 내가 입력한 메시지로 추가
		// from이 'self'면 내가 보낸 메시지
		// socket : 테스트용!!!!! 통신 제대로 되면 이거 안쓸예정
		setMessages((messages) => [
			...messages,
			{
				content: inputMessage,
				from: "self",
			},
		]);
		setInputMessage("");
	};

	const inputEnterEvent = (e) => {
		if (e.key === "Enter" || e.key === "Return") {
			inputMessage &&
				setMessages((messages) => [
					...messages,
					{
						content: inputMessage,
						from: "self",
					},
				]);
			setInputMessage("");
		}
	};

	useEffect(() => {
		if (mount) {
			document
				.getElementById("input-text")
				.addEventListener("keypress", inputEnterEvent);
			return () => {
				try {
					document
						.getElementById("input-text")
						.removeEventListener("keypress", inputEnterEvent);
				} catch {
					console.log("아직..");
				}
			};
		}
	});

	useEffect(() => {
		// socket : 채팅 메시지 수신
		socket.on("chat", async ({ state, player, text }) => {
			console.log("chat", player, text);

			// 채팅 보낸사람이 나면 self로 바꾸고 아니면 그대로 냅둔다.
			player = player === nickname ? "self" : player;

			// pseudo code - 채팅내용을 받아와서 messages 배열에 추가
			// 지금 유저 닉네임 받아와서 비교해야하는데 일단은 그냥 때려박음
			state === "chat" &&
				setMessages((messages) => [
					...messages,
					{
						content: text,
						from: player,
					},
				]);
		});

		// socket : 컴포넌트 죽을때 리스너 제거
		return socket.offAny();
	}, []);

	return (
		<NicknameContext.Consumer>
			{() => (
				<div className="chat frame">
					<div className="chat__title">
						<p>{title}</p>
					</div>
					<div className="chat__content">
						{messages.map((chat, index) => (
							<ChatMessage
								key={index}
								chat={chat}
								className="chat__messages"
							/>
						))}
					</div>
					<div className="chat__sender">
						<input
							type="text"
							onChange={onInputChange}
							value={inputMessage}
							id="input-text"
						/>
						<button onClick={onSubmitClick}>전송</button>
					</div>
				</div>
			)}
		</NicknameContext.Consumer>
	);
}

export default Chat;
