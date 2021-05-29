import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import ChatMessage from "./ChatMessage";
import "./Chat.css";
import { socket, NicknameContext } from "../App";

Chat.propTypes = {
	// 채팅방의 제목
	title: PropTypes.string.isRequired,
};

let msg = [];

function Chat({ title }) {
	const [inputMessage, setInputMessage] = useState(""); // 지금 입력하고 있는 메시지 내용
	const [messages, setMessages] = useState([]); // 대화내용
	const [nickname, setNickname] = useContext(NicknameContext);
	const chatLogs = useRef();
	const onInputChange = (e) => {
		setInputMessage(e.currentTarget.value);
	};

	const onSubmitClick = (e) => {
		e.preventDefault();

		// socekt : 소켓 통신을 통해 서버로 메시지 전송
		socket.emit("chat", {
			state: "chat",
			player: nickname,
			text: inputMessage,
		});
		setInputMessage("");
	};

	const inputEnterEvent = (e) => {
		if (e.key === "Enter" || e.key === "Return") {
			onSubmitClick(e);
		}
	};

	useEffect(() => {
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
	});

	// socket : 채팅 메시지 수신
	useEffect(() => {
		socket.on("chat", ({ state, player, text }) => {
			if (state === "chat" && nickname) {
				// 채팅 보낸사람이 나면 self로 바꾸고 아니면 그대로 냅둔다.
				player = player === nickname ? "self" : player;

				msg.push({ content: text, from: player });
				console.log(msg);
				setMessages([...msg]);
				// chatLogs.current.scrollTop = chatLogs.current.scrollHeight;
			}
		});
	}, [nickname]);

	useEffect(() => {
		return () => {
			msg = [];
			socket.offAny("chat");
		};
	}, []);

	return (
		<NicknameContext.Consumer>
			{() => (
				<div className="chat frame">
					<div className="chat__title">
						<p>{title}</p>
					</div>
					<div className="chat__content" ref={chatLogs}>
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
