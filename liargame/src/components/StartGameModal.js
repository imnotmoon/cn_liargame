import React from 'react'
import PropTypes from 'prop-types'

StartGameModal.propTypes = {
    // 라이어라면 true, 아니면 false
    // liar 값에 따라 모달 내용이 달라짐
    liar: PropTypes.bool.isRequired,

    // 서버에서 보내준 word값.
    // 라이어라면 빈칸이 올 것이고 라이어가 아니라면 단어가 올 것.
    word: PropTypes.string
}

function StartGameModal({ liar, word }) {
    return (
        <div className="startGameModal frame">
            <div>
                {liar
                    ? <p>당신은 라이어입니다.</p>
                    : <p>당신은 라이어가 아닙니다.</p>
                }
            </div>

            {!liar &&
                <div>
                    <div>
                        <p>{word}</p>
                    </div>
                </div>
            }
            <div className="startGameModal__timer">
                5초 뒤 게임이 시작됩니다
            </div>
        </div>
    )
}

export default StartGameModal
