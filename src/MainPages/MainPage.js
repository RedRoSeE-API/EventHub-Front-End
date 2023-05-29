import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../HeaderAndFooter/Header';
import Footer from '../HeaderAndFooter/Footer';
import { useAuth } from "../AuthContext";
import "../style/MainPage.css"
import imageSrc from "../images/cover1.jpeg"
import imageSrcCroped from "../images/cover-1-small.jpeg"
import imgText from "../images/bg-text.png"
import imgTrending from "../images/69.png"

import TrendingEventComponent from './MainPageComponents/trendingEventComponent'

export default function MainPage() {

  const navigate = useNavigate();

  const { isThereAUser, setUseEffectRefreshOnLoginAndLogout } = useAuth();


  const [info, setInfo] = useState();
  

  useEffect(() => {
    getDataFromDB()

  }, [])

  const getDataFromDB = async () => {

    const res = await axios.get('http://localhost:3002/getAllApprovedPosts')

    const randomItems = res.data.sort(() => 0.5 - Math.random()).slice(0, 4);

    setInfo(randomItems)

  }

  const goToEventsPage = () => {
    navigate('/events')
    window.scrollTo(0, 0);
  }




  return (
    <>
    
    <Header/>
      <div className='main-MainPage-div'>

        <section className='fullblead-header'>
          <div className='fullblead-header-bg'>
            <picture>
              <source media="(max-width:660px)" srcSet={imageSrcCroped} className='img-darker'/>
              <source media="(min-width:661px)" srcSet={imageSrc} className='img-darker'/>
              <img src={imageSrc} width="100%" alt="just a stolen photo!" className='img-darker'/>
            </picture>
          </div>
          <div className='fullblead-header-text-image'>
            <img className='fullblead-header-text-image-src' src={imgText}></img>
            <button className='go-to-events-button' onClick={goToEventsPage}>Find your next event</button>
          </div>

        </section>

        <section className='main-content'>


          <div className='trending-div'>

            <div className='trending-h2-div'>

              <h2 className='trending-h2'>Trending{<img className='trending-img' src={imgTrending}/>}</h2>
            </div>

           
            <div className='trending-events-div'>

              
            {info?.map((post, index) => 
            
              <TrendingEventComponent props={post} key={index}/>
            )}

            </div>



          </div>


        </section>
        
        
      </div>

    <Footer/>
    </>
  )
}
