import React from 'react'
import PropTypes from 'prop-types'
import './WaitingRoom.css'

WaitingRoom.propTypes = {
    // 각 플레이어의 이름이 담긴 배열
    players: PropTypes.array.isRequired
}

function WaitingRoom({ players }) {
    return (
        <div className="waitingRoom frame">
            <div className="waitingRoom__title">
                <p>대기실</p>
            </div>
            <div>
                <p>참여인원 : {players.length}/4명</p>
                {players.map(((player, index) => (
                    <div key={index} className="waitingRoom__player">
                        <p>{player}</p>
                    </div>
                )))}
            </div>
        </div>
    )
}

export default WaitingRoom
