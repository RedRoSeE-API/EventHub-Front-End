import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style/Header.css';
import { Sling as Hamburger } from 'hamburger-react';
import { useAuth } from "../AuthContext";


import usericon from '../images/usericon.png';
import axios from 'axios';

export default function Header() {

    const navigate = useNavigate()

    const { isThereAUser, setUseEffectRefreshOnLoginAndLogout } = useAuth();

    const [hamburgerState, setHamburgerState] = useState(false);
    const [profileState, setProfileState] = useState(false);
    const [userInfo, setUserInfo] = useState();

    const simulateClick = useRef()

    useEffect(() => {
        setUseEffectRefreshOnLoginAndLogout(current => !current);
        getUserinfo()
        console.log(localStorage.getItem('userName'))
        console.log(sessionStorage.getItem('userName'))
    },[])

    const getUserinfo = async () => {
        
        const email = localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') : sessionStorage.getItem('userEmail');

        const res = await axios.post('http://localhost:3002/getUser', { email })
        console.log(res.data)
        setUserInfo(res.data)
    }


    function changeHamburgerState () {
        if(profileState){

        
            setProfileState(false)

            }
        setHamburgerState(current => !current)
    }

    function changeProfileState () {
        if(hamburgerState){
            simulateClick.current.children[0].click();
        }
        setProfileState(current => !current)
    }

    const logout = async () => {

        localStorage.removeItem("accessToken");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("saveUser");
        localStorage.removeItem("userName");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("saveUser");
        sessionStorage.removeItem("userName");
        setUseEffectRefreshOnLoginAndLogout(current => !current)
        navigate('/',  { replace: true})
    }





    function UserDiv() {

        return(
            <>
                <div className='user-info-div' id={profileState ? 'visible-P' : 'hidden-P'}>
                    <h1 className='header-username'>{localStorage.getItem('userName') ? localStorage.getItem('userName') : sessionStorage.getItem('userName')}</h1>
                    {userInfo?.role == 'admin' ? <h1 className='header-my-posts'><Link reloadDocument className='my-posts-link' to="/approvePosts">Manage New Posts</Link></h1> : null}
                    <h1 className='header-my-posts'><Link reloadDocument className='my-posts-link' to="/myPosts">My Postst</Link></h1>
                    <div className='button-div'>
                        <button className='header-logout' onClick={logout}>Log Out</button>
                    </div>
                </div>

                <img className='user-icon' src={usericon} onClick={changeProfileState}/>
            </>
        )
    }


  return (
    <>
    <div className='main-Header-div'>
        <h1 className='header-title'> <Link reloadDocument className='header-title-link' to="/">Eventhub</Link></h1>
        <div className='list-div'>
    
            <ul className='header-ul' id={hamburgerState ? 'visible-H' : 'hidden-H'}>
                <li className='header-li'>
                    <Link reloadDocument className='header-link' to="/events">Events</Link>
                </li>
                <li className='header-li'>
                    <Link reloadDocument className='header-link' to="/postAnEvent">Post An Event</Link>
                </li>

                {!isThereAUser && 
                <>
                    <li className='header-li'>
                        <Link reloadDocument className='header-link' to="/login">LogIn</Link>
                    </li>
                    <li className='header-li'>
                        <Link reloadDocument className='header-link' to="/register">Register</Link>
                    </li>
                </>
                }
                <li className='header-li header-li-last-no-border'>
                    <Link reloadDocument className='header-link' to="/aboutUs">About Us</Link>
                </li>
            </ul>

            <div className='hamburger-div' ref={simulateClick} onClick={changeHamburgerState}>
                <Hamburger />
            </div>

            {isThereAUser ? <UserDiv/> : null}

        </div>
    </div>
    </>
  )
}
