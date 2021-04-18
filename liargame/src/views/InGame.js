import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { NicknameContext } from '../App'
import Chat from '../components/Chat'
import Vote from '../components/Vote'

InGame.propTypes = {
    // 정상인은 1, 라이어는 2
    liar: PropTypes.number
}

export default function InGame({ liar }) {

    const [gameTime, setGameTime] = useState(120)
    const [didMount, setDidMount] = useState(false)
    const [players, setPlayers] = useState([])
    const [nickname, setNickname] = useContext(NicknameContext)

    useEffect(() => {
        // 플레이어 리스트 받아오기
        //! 테스트용 데이터
        setPlayers([
            { nickname: "조세희", vote: 0 },
            { nickname: "문상혁", vote: 0 },
            { nickname: "윤두현", vote: 0 },
            { nickname: "이하은", vote: 0 }
        ])

        // 타이머 시작

        // mount
        setDidMount(true)
    }, [])

    return (
        <NicknameContext.Consumer>
            {() => (
                didMount &&
                <div className="inGame">
                    <PlayerContext.Provider value={[players, setPlayers]} >
                        {liar === 1
                            ? <Vote liar={false} title="누가 라이어입니까?" />
                            : <Vote liar={true} title="나를 지목한 사람" />
                        }
                    </PlayerContext.Provider>
                    <Chat title={liar === 1 ? "단어를 설명해주세요" : "단어에 대해 아는척 해주세요"} />
                </div>
            )
            }
        </NicknameContext.Consumer>
    )
}

// vote context
export const PlayerContext = React.createContext()
