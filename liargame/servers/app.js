/* socket\app.js */
const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");
app.use(cors());
const io = require("socket.io")(server, {
	cors: { origin: "*", methods: ["GET", "POST"], credentials: true },
});

const port = process.env.PORT || 3001;

// 아이디 저장
var UserID = [];
// 투표결과 저장
var VoteID = [];
// 단어
var wordArr = [
	"라면",
	"물티슈",
	"노트북",
	"후드티",
	"비닐봉지",
	"시계",
	"마우스",
	"의자",
	"다이어리",
	"가방",
];
// 라이어
var liar;

io.on("connection", (socket) => {
	console.log("a user connected");
	// PORT에 socket id 알려주기
	//io.to(socket.id).emit('my socket id',{socketID, socket.id});

	// 플레이어 들어올 때 마다 배열에 플레이어 이름 추가 되어 전송?
	socket.on("enter", (data) => {
		console.log(socket.id, ":", data.player, "입장");
		UserID.push(data.player);
		io.emit("enter", {
			state: "enter",
			player: UserID,
		});
		if (UserID.length === 4) {
			var randomNumber = Math.floor(Math.random() * 10);
			// 라이어 기록하기.
			liar = UserID[randomNumber % 4];
			console.log("game start. liar is ", liar);
			// game set response
			io.emit("gameset", {
				state: "gameset",
				player: UserID,
				liar: liar,
				word: wordArr[randomNumber],
			});
		}
	});

	// 채팅 관련 송신 및 수신
	socket.on("chat", (data) => {
		console.log(data.player, ": ", data.text);
		io.emit("chat", {
			state: "chat",
			player: data.player,
			text: data.text,
		});
	});

	// vote data // 투표는 2번 하기 근데 이건 언제 하는데?
	socket.on("vote", (data) => {
		console.log(data.name, " vote to : ", data.vote);
		VoteID.push({ name: data.name, vote: data.vote });
		if (VoteID.length === 4) {
			io.emit("result", {
				state: "result",
				liar: UserID[1],
				picked: {
					VoteID,
				},
			});
		}
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
