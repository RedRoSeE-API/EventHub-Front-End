import React, {createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';


import Axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {

    const navigate = useNavigate()

    
    const [saveUser, setSaveUser] = useState(localStorage.getItem("saveUser"));
    const [isThereAUser, setISThereAUser] = useState(false);
    const [useEffectRefreshOnLoginAndLogout, setUseEffectRefreshOnLoginAndLogout] = useState(false);


    useEffect(() => {
        // console.log("REFRESHING!");
        getSaveUserBoolean();
        userAuthenticated(); 
        // console.log("REFRESHING END!");
    },[useEffectRefreshOnLoginAndLogout])



    const getSaveUserBoolean = async() => {
        setSaveUser(localStorage.getItem("saveUser"));
        // console.log(sessionStorage.getItem("accessToken"));
        // console.log(localStorage.getItem("saveUser"))
        // console.log(typeof(localStorage.getItem("saveUser")))
    }

    const userAuthenticated = async() => {
        
        // saveUser == "true" ? console.log("local") : console.log("session")

        try{
            const res = await Axios.get('http://localhost:3001/authenticationJWT', {
                headers: {
                    'x-access-token': saveUser === "true" ? localStorage.getItem("accessToken") : sessionStorage.getItem("accessToken")
                }
            });

            // console.log(res.data);
            setISThereAUser(res.data.isThereAUser);
            if(res.data.refreshTokenNeeded !== true){
                // console.log(res.data.isThereAUser)
                setISThereAUser(true);
            }else{
                console.log("GIVE ME THE KEY!");
                        try{
                            const res = await Axios.get('http://localhost:3001/getNewAccessToken', {
                                headers: {
                                    'x-refresh-token': saveUser === "true" ? localStorage.getItem("refreshToken") : sessionStorage.getItem("refreshToken"),
                                    'x-user-email': saveUser === "true" ? localStorage.getItem("userEmail") : sessionStorage.getItem("userEmail")
                                }
                            })

                                // console.log(`new access token!!!!!!!!! ${res.data.accessToken}`)
                            if(res.data.auth){
                                saveUser === "true" ? localStorage.setItem("accessToken", res.data.accessToken) : sessionStorage.setItem("accessToken", res.data.accessToken)
                                // console.log("Successfully refreshed in!");
                                // saveUser === "true" ? console.log("LOCal!") : console.log("SEssIon!")
                                // console.log("Successfully refreshed in!");
                            }else{
                                alert(res.data.message)
                            }


                        }catch(err){
                            setISThereAUser(false);
                            console.log(err.response.data.message)
                        }

            }

        }catch(err){

            // console.log(err)

            if(err.response.data.isThereAUser !== true){
                setISThereAUser(false);
            }
        }
    }
    


const value = {
    isThereAUser,
    setISThereAUser,
    setUseEffectRefreshOnLoginAndLogout,
    useEffectRefreshOnLoginAndLogout
}

  return (
    <AuthContext.Provider value={value}>
        { children }
    </AuthContext.Provider>
    
  )
}

