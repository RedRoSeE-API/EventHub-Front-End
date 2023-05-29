import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import "../style/Login.css"
import Header from "../HeaderAndFooter/Header"
import Footer from '../HeaderAndFooter/Footer';


import { useAuth } from "../AuthContext";

export default function Login() {


    const { setUseEffectRefreshOnLoginAndLogout, setISThereAUser } = useAuth();

    const navigate = useNavigate();

    const [email_login, setEmail_login] = useState("");
    const [password_login, setPassword_login] = useState("");
    const [save_user_login, setSave_user_login] = useState(false);




    const login = async () => {
        if(ValidateEmail(email_login) === false){
            return;
        }
        try{
            const res = await Axios.post('http://localhost:3001/login', {
                password_login: password_login,
                email_login: email_login
            })

            if(res.data.auth){
                if(save_user_login){
                    localStorage.setItem("accessToken", res.data.accessToken);
                    localStorage.setItem("refreshToken", res.data.refreshToken);
                    localStorage.setItem("userEmail", res.data.email);
                    localStorage.setItem("userName", res.data.username);
                    localStorage.setItem("saveUser", true);
                }
                else{
                    sessionStorage.setItem("accessToken", res.data.accessToken);
                    sessionStorage.setItem("refreshToken", res.data.refreshToken);
                    sessionStorage.setItem("userEmail", res.data.email);
                    console.log(res.data.username)
                    sessionStorage.setItem("userName", res.data.username); 
                    localStorage.setItem("saveUser", false);
                }
                userAuthenticated();
            }else{
                alert(res.data.message)
            }



        }catch(err){
            alert(err.response.data)
            console.log(err);
        }
    }
  

    const userAuthenticated = async() => {
        console.log(localStorage.getItem("accessToken"))
        console.log(sessionStorage.getItem("accessToken"))

        try{
            const res = await Axios.get('http://localhost:3001/authenticationJWT', {
                headers: {
                    'x-access-token': save_user_login === true ? localStorage.getItem("accessToken") : sessionStorage.getItem("accessToken")
                }
            })
            setUseEffectRefreshOnLoginAndLogout(current => !current)

            setISThereAUser(true);

            if(res.data.isThereAUser === true){
                setUseEffectRefreshOnLoginAndLogout(current => !current)
                navigate('/', { replace: true})
            }
        }catch(err){
            console.log(err);
        }
    }






    function ValidateEmail(input) {

        if(input === ""){
            alert("Please enter email")
            return false ;
        }

        var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
        if (validRegex.test(input)) {
            return true;
        } else {
            alert("Please enter a valid email address");
            return false;
        }
    }
  
    const handleEmailLogInChange = (element) => {
        setEmail_login(element.target.value);
    }
    const handlePassLogInChange = (element) => {
        setPassword_login(element.target.value);
    }
    const handleCheckBoxChange = (element) => {
        setSave_user_login(element.target.checked);
    }
  
    return (
    <>

        <Header></Header>

        <div className='main-Login-div'>

            <div className='content-div'>
                <h1 className='login-h1'>L o g I n</h1>
                <div className='secondary-div-no-title'>
                    <div className='email-div'>    
                        <label>Email:</label>
                        <input className='login-page-input' type="email" value={email_login} onChange={(e) => {
                            handleEmailLogInChange(e);
                        }}></input>
                    </div>

                    <div className='password-div'> 
                        <label>Password:</label>
                        <input className='login-page-input' type="password" value={password_login} onChange={(e) => {
                            handlePassLogInChange(e);
                        }}></input>
                    </div>

                    <div className='save-user-div'>
                        <label className='label-checkbox-login-page' >Save User?</label>
                        <input className='checkbox-login-page' type="checkbox" onChange={(e) => {
                            handleCheckBoxChange(e)
                        }}></input>
                    </div>

                    <div className='button-div-login-page'>
                        <button className='button-login-page' type='button' onClick={login}><h1>LogIn</h1></button>
                    </div>
                </div>
            </div>

        </div>

        <Footer></Footer>
    </>
  )
}
