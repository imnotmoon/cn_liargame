import React from 'react'

function Header() {

    const onExitClick = () => {
        // connection 제거

        // 윈도우 닫기
    }

    return (
        <div className="header">
            <p>라이어게임</p>
            <div className="header__exitBtn" onClick={onExitClick}>
                퇴장
            </div>
        </div>
    )
}

export default Header
