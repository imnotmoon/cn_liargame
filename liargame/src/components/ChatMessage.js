import React from 'react'
import PropTypes from 'prop-types'

ChatMessage.propTypes = {

    // chat : { content(채팅내용), from(누가 보낸 채팅인지) }
    chat: PropTypes.object.isRequired
}

function ChatMessage({ chat }) {

    const { content, from } = chat

    return (
        <div className={from === 'self' ? "chatMessage my_message" : "chatMessage"}>
            <span>{from === 'self' ? '' : from}</span>
            <span>{content}</span>
        </div>
    )
}

export default ChatMessage
