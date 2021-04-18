import React, { useState } from 'react'
import { NicknameContext } from '../App'
import PropTypes from 'prop-types'


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
        setNickname(currentNickname)
    }

    return (
        <NicknameContext.Consumer>
            {() => (
                <div className="nicknameModal frame">
                    <div>
                        대충 안밋밋하게 할만한거
                    </div>
                    <div>
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
