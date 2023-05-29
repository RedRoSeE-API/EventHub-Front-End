import React, { useState, useEffect } from 'react'

import { useNavigate, Link } from 'react-router-dom'

import axios from 'axios';

import "../style/MyPosts.css"
import Header from "../HeaderAndFooter/Header"
import Footer from '../HeaderAndFooter/Footer';
import MyEventsComponent from './MainPageComponents/myEventsComponent'

export default function MyPosts() {

    const [userInfo, setUserInfo] = useState();
    const [userInfoPosts, setUserInfoPosts] = useState(false);



    useEffect(() => {
      getUserinfo()
  
    }, [])
  
    const getUserinfo = async () => {
        
        const email = localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') : sessionStorage.getItem('userEmail');

        const res = await axios.post('http://localhost:3002/getUserPosts', { email })
        console.log(res.data)
        console.log(res.data.length)
        if(res.data.length > 0){
          setUserInfoPosts(true)
        }
        setUserInfo(res.data)
    }
  
  
  
    return (
      <>
  
        <Header></Header>
  
        
        <section className='main-content'>
  
  
          <div className='trending-div'>
  
            <div className='trending-h2-div'>
              <h2 className='trending-h2'>My Events</h2>
            </div>
  
            <div className='trending-events-div'>
  
            {userInfoPosts === true ?
            
            
            userInfo?.map((post) => 
            
            <MyEventsComponent props={post} key={post.id}/>
            )

           :

            <div className='my-posts-no-items-div'>
              <h1>No Posts yet?</h1>
              <Link reloadDocument className='my-posts-no-items-link' to='/postAnEvent'><h1>Let's Make A New One</h1></Link>
            </div>
            
            }
            
          
            
            
            </div>
          </div>
        </section>
  
        <Footer></Footer>
  
      </>
  
  
    )
}
