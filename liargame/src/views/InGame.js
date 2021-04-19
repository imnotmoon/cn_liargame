import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { NicknameContext } from '../App'
import Chat from '../components/Chat'
import Vote from '../components/Vote'
import FinishModal from '../components/FinishModal'
import './InGame.css'

InGame.propTypes = {
    // 정상인은 1, 라이어는 2
    liar: PropTypes.number
}

export default function InGame({ liar }) {

    const [gameTime, setGameTime] = useState(120)
    const [didMount, setDidMount] = useState(false)
    const [players, setPlayers] = useState([])
    const [finishModal, setFinishModal] = useState(false)
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
        startTimer()
        // mount
        setDidMount(true)
    }, [])

    // 120초 타이머 -> 끝나면 finish modal을 띄운다.
    const startTimer = () => {
        let i = 120
        let timer = setInterval(() => {
            setGameTime(gameTime => gameTime - 1, i -= 1)
            if (i === 0) {
                //! 서버로 투표결과 전송
                setFinishModal(true)
                clearInterval(timer)
            }
        }, 1000)
    }

    return (
        <>
            <NicknameContext.Consumer>
                {() => (
                    didMount &&
                    <>
                        <div>{gameTime}</div>
                        <div className="inGame">
                            <PlayerContext.Provider value={[players, setPlayers]} >
                                {liar === 1
                                    ? <Vote liar={false} title="누가 라이어입니까?" />
                                    : <Vote liar={true} title="나를 지목한 사람" />
                                }
                            </PlayerContext.Provider>
                            <Chat title={liar === 1 ? "단어를 설명해주세요" : "단어에 대해 아는척 해주세요"} />
                        </div>
                    </>
                )
                }
            </NicknameContext.Consumer>
            { finishModal &&
                <>
                    <FinishModal liar={liar} />
                    <div className="modal-background"></div>
                </>}
        </>
    )
}

// vote context
export const PlayerContext = React.createContext()
