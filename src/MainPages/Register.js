import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import "../style/Register.css"
import Header from "../HeaderAndFooter/Header"
import Footer from '../HeaderAndFooter/Footer';

export default function Register() {

    const navigate = useNavigate();

    // const [info, setInfo] = useState([]);
    const [username_register, setUsername_register] = useState("");
    const [email_register, setEmail_register] = useState("");
    const [password_register, setPassword_register] = useState("");
    const [password_register_verification, setPassword_register_verification] = useState("");


    const [useEffectRefreshOnLoginAndLogout, setUseEffectRefreshOnLoginAndLogout] = useState(false);

    
    useEffect(() => {
        // userAuthenticated();
    },[useEffectRefreshOnLoginAndLogout]) 

    const register = async () => {

        if(ValidateEmail(email_register) === false){
            setEmail_register("")
            return;
        }

        const CheckIfEmailExistsVar = await CheckIfEmailExists(email_register, username_register)

        if (CheckIfEmailExistsVar.boolean){
            if(CheckIfEmailExistsVar.emailRefresh === true){
                setEmail_register("")
            }else{
                setUsername_register("")
            }
            return;
        }


        if(ValidatePass(password_register, password_register_verification) === false){
            setPassword_register("")
            setPassword_register_verification("")
            return;
        }
        
        try{
            console.log(username_register);
            await Axios.post('http://localhost:3001/register', {
                password_register: password_register,
                email_register: email_register,
                username_register: username_register
            }).then(() => {
                alert("Successfully registered");
                setUsername_register("")
                setEmail_register("")
                setPassword_register("")
                setPassword_register_verification("")
                navigate('/login')
            });
            
        }catch(err){
            console.log(err);
            
        
        }
    }

    const CheckIfEmailExists = async (email_to_check, username_to_check) => {
        try{
            const res = await Axios.post('http://localhost:3001/check-if-email-is-existing', {
                email_register: email_to_check,
                username_register: username_to_check
            })
            if(res.data.usernameIsExisting){
                alert("Username already exists!")
                return {boolean: true, emailRefresh: false, usernameRefresh: true};
            }else if(res.data.emailIsExisting){
                alert("Email already exists!")
                return {boolean: true, emailRefresh: true, usernameRefresh: false};
            }else{
                return {boolean: false, emailRefresh: false, usernameRefresh: false};
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
    function ValidatePass(input1, input2) {
        
            if(input1.length < 8) {
                alert("Password must be at least 8 characters"); 
                return false;
            } else if(input1.search(/[a-z]/) < 0) { 
                alert("Password must contain at least one lowercase letter"); 
                return false;
            } else if(input1.search(/[A-Z]/) < 0) { 
                alert("Password must contain at least one uppercase letter"); 
                return false;
            } else if(input1.search(/[0-9]/) < 0) { 
                alert("Password must contain at least one number"); 
                return false;
            }
            if(input1 !== input2){
                alert("The two passwprd must mach!");
                return false;
            }
    }


    const handleUsernameRegChange = (element) => {
        setUsername_register(element.target.value);
    }
    const handleEmailRegChange = (element) => {
        setEmail_register(element.target.value);
    }
    const handlePassRegChange = (element) => {
        setPassword_register(element.target.value);
    }
    const handlePassVRegChange = (element) => {
        setPassword_register_verification(element.target.value);
    }
  
  
    return (
        <>
        
        <Header></Header>

            <div className='main-Register-div'>

                <div className='content-div-register'>
                    <h1 className='register-h1'>R e g i s t e r</h1>

                    <div className='secondary-div-no-title-register'>  

                        <div className='email-div-register'>
                            <label>Username:</label>
                            <input className='register-page-input' type="text" value={username_register} onChange={(e) => {
                                handleUsernameRegChange(e);
                            }}></input>
                        </div>

                        <div className='email-div-register'>
                            <label>Email:</label>
                            <input className='register-page-input' type="email" value={email_register} onChange={(e) => {
                                handleEmailRegChange(e);
                            }}></input>
                        </div>

                        <div className='password-div-register'>
                            <label>Password:</label>
                            <input className='register-page-input' type="password" value={password_register} onChange={(e) => {
                                handlePassRegChange(e);
                            }}></input>
                        </div>

                        <div className='password-div-register'>
                            <label>Password 2:</label>
                            <input className='register-page-input' type="password" value={password_register_verification} onChange={(e) => {
                                handlePassVRegChange(e);
                            }}></input>
                        </div>

                        <div className='button-div-register-page'>
                            <button className='button-register-page' type='button' onClick={register}><h1>Register</h1></button>  
                        </div>
                    </div>
                </div>

            </div>

            <Footer></Footer>

        </>
    )
}
