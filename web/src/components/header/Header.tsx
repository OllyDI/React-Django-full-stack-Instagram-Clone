// React
import { useState } from 'react';

import './Header.css';

const Header = () => {
    const [ menu, setMenu ] = useState(false);

    const showMenu = () => {
        setMenu(true);
    }

    const hideMenu = (event: any) => {
        console.log(event);
        if (event.target.id === 'menu-background') {
            setMenu(false);
        }
    }

    return (
        <nav>
            <div className="nav-container">
                <div className="nav-left">
                    <a href="/">
                        <img className='logo' src="https://raw.githubusercontent.com/comeduschool/instaclone/main/web/public/logo2.png" alt="logo.png"></img>
                    </a>
                </div>
                <div className="nav-center"></div>
                <div className="nav-right">
                    <span className="nav-item">
                        <a>
                            <img src="https://raw.githubusercontent.com/comeduschool/instagram/django/reactjs/web/public/assets/icons/home-outlined.svg" alt="home.svg" />
                        </a>
                    </span>
                    <span className="nav-item">
                        <a>
                            <img src="https://raw.githubusercontent.com/comeduschool/instagram/django/reactjs/web/public/assets/icons/add-outlined.svg" alt="addIcon.svg" />
                        </a>
                    </span>
                    <span className="nav-item" onClick={showMenu}>
                        <img className="nav-item-profile" src="https://raw.githubusercontent.com/comeduschool/instagram/django/reactjs/web/public/assets/test-profile.jpeg" alt="profile" />
                        <div className="nav-menu">
                            <div className={menu ? "nav-menu-container nav-menu-container-show" : "nav-menu-container nav-menu-container-hide"}>
                                <div className="nav-menu-container-tail"></div>
                                <div className="nav-menu-item-list">
                                    <a className="icon-label-container">
                                        <img className="nav-menu-icon" src="https://raw.githubusercontent.com/comeduschool/instagram/django/reactjs/web/public/assets/icons/profile.svg" alt="profile.svg" />
                                        <span className="icon-label">프로필</span>
                                    </a>
                                    <a className="icon-label-container">
                                        <img className="nav-menu-icon" src="https://raw.githubusercontent.com/comeduschool/instagram/django/reactjs/web/public/assets/icons/setting.svg" alt="profile.svg" />
                                        <span className="icon-label">설정</span>
                                    </a>
                                    <div className="icon-label-container nav-menu-logout">
                                        <span className="icon-label">로그아웃</span>
                                    </div>
                                </div>
                            </div>
                            <div id="menu-background" className={menu ? "nav-menu-background-show" : "nav-menu-background-hide"} onClick={hideMenu}></div>
                        </div>
                    </span>
                </div>

            </div>
        </nav>
    )
}

export default Header;