import React from 'react'
import PropTypes from 'prop-types'

WaitingRoom.propTypes = {
    // 각 플레이어의 이름이 담긴 배열
    players: PropTypes.array.isRequired
}

function WaitingRoom({ players }) {
    return (
        <div className="waitingRoom frame">
            <div className="waitingRoom__title">
                <p>대기실</p>
                <p>참여인원 : {players.length}/4명</p>
            </div>
            <div>
                {players.map(((player, index) => (
                    <div key={index}>
                        <p>{player}</p>
                    </div>
                )))}
            </div>
        </div>
    )
}

export default WaitingRoom
