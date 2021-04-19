import React from 'react'
import './Header.css'

function Header() {

    const onExitClick = () => {
        // connection 제거

        // 나가기
        window.open("about:blank", "_self");
        window.close()
    }

    return (
        <div className="header">
            <p>라이어게임</p>
            <div className="header__exitBtn" onClick={onExitClick}>
                <p>나가기</p>
            </div>
        </div>
    )
}

export default Header
