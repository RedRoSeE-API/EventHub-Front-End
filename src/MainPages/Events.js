import React, { useState, useEffect } from 'react';
import Header from "../HeaderAndFooter/Header";
import Footer from '../HeaderAndFooter/Footer';

import TrendingEventComponent from './MainPageComponents/trendingEventComponent'

import "../style/Events.css"

import axios from 'axios';

export default function Events() {

  const [info, setInfo] = useState();


  useEffect(() => {
    getDataFromDB()

  }, [])

  const getDataFromDB = async () => {

    const res = await axios.get('http://localhost:3002/getAllApprovedPosts')

    setInfo(res.data)

    console.log(res.data)

  }



  return (
    <>

      <Header></Header>

      
      <section className='main-content'>


        <div className='trending-div'>

          <div className='trending-h2-div'>
            <h2 className='trending-h2'>Events</h2>
          </div>

          <div className='trending-events-div'>

          {info?.map((post) => 
          
          <TrendingEventComponent props={post} key={post.id}/>
          )}
          
          </div>
        </div>
      </section>

      <Footer></Footer>

    </>


  )
}