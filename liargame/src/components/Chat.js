import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ChatMessage from './ChatMessage'

Chat.propTypes = {
    // 채팅방의 제목
    title: PropTypes.string.isRequired
}

function Chat({ title }) {

    const [inputMessage, setInputMessage] = useState('')    // 지금 입력하고 있는 메시지 내용
    const [messages, setMessages] = useState([])        // 대화내용

    const onInputChange = (e) => {
        setInputMessage(e.currentTarget.value)
    }

    const onSubmitClick = (e) => {
        e.preventDefault()

        // 소켓 통신을 통해 서버로 메시지 전송


        // messages 배열에 내가 입력한 메시지로 추가
        // from이 'self'면 내가 보낸 메시지
        setMessages(messages => [...messages, {
            content: inputMessage, from: 'self'
        }])
    }

    return (
        <div className="chat frame">
            <div className="chat__title">
                <p>{title}</p>
            </div>
            <div className="chat__content">
                {messages.map((chat, index) => (
                    <ChatMessage key={index} chat={chat} />
                ))}
            </div>
            <div className="chat__sender">
                <input type="text" onChange={onInputChange} />
                <button onClick={onSubmitClick}>전송</button>
            </div>
        </div>
    )
}

export default Chat
