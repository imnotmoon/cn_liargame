import React, { useState } from 'react'
import { NicknameContext, socket } from '../App'
import PropTypes from 'prop-types'
import './NicknameModal.css'

NicknameModal.propTypes = {
    // nickname의 setter
    setNickname: PropTypes.func.isRequired
}

export default function NicknameModal({ setNickname }) {

    const [currentNickname, setCurrentNickname] = useState('')

    const onInputChange = (e) => {
        setCurrentNickname(e.currentTarget.value)
    }

    const onButtonClick = (e) => {
        setNickname(currentNickname);

        (() => {
            socket.emit('enter', )
            console.log("emit 'enter' message : ")
        })()
    }

    return (
        <NicknameContext.Consumer>
            {() => (
                <div className="nicknameModal frame modal">
                    <div className="title">
                        안녕하세요!
                    </div>
                    <div className="content">
                        <p>사용할 닉네임을 입력해주세요.</p>
                    </div>
                    <input type="text" placeholder="닉네임" onChange={onInputChange} />
                    <br />
                    <div className="submitBtn" onClick={onButtonClick}>확인</div>
                </div>
            )}
        </NicknameContext.Consumer>
    )
}
