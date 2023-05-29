import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import Header from "../HeaderAndFooter/Header";
import Footer from '../HeaderAndFooter/Footer';

import "../style/SingleEvent.css"

import axios from 'axios';

export default function SingleEvent() {


    const [info, setInfo] = useState();
    const [formattedContent, setFormattedContent] = useState();


    useEffect(() => {
      getDataFromDB()
  
    }, [])
  
    const getDataFromDB = async () => {

        const postID  =  Number(sessionStorage.getItem("itemIdForSingleEvent"));
  
        const res = await axios.get('http://localhost:3002/getAllPosts')

        res.data.map((post) => {

            if(post.id === postID) {
                setInfo([post])
            }

        }) 

        setFormattedContent(res.data[1].text.replace(/(\r\n|\n|\r)/gm, '<br>'))
  
    }



  return (


    <>
        <Header></Header>

        <section className='main-SingleEvent-section'>

            {info?.map((post) => 
            
        
                <div className='event-div' key={post.id}>
                    <div className='event-image-width-div'>
                            

                            <div className="picture-box">
                                <img src={require(`../uploads/${post.image_name}`)} alt="Your image"/>
                                <div className="image-overlay"></div>
                            </div>
                      

                    </div>

                    <div className='event-text-div'>
                        <h3 className='event-name'>{post.title}</h3>
                        <h4 className='when-where-h4'>When and where</h4>
                        <div className='when-where-div'>
                            <p className='event-when-where-label'>Date and time</p>
                            <p className='event-when-where'>{post.date_time.slice(0, -8).toLocaleString().replace('T', ' ')}</p>
                            <p className='event-when-where-label'>Location</p>
                            <p className='event-when-where'>{post.place}</p>
                        </div>
                        <h4 className='about-this-event-h4'>About this event</h4>
                        <p dangerouslySetInnerHTML={{__html: formattedContent}} className='event-description'></p>

                    </div>
                        
                </div>
        
            )}

        </section>
        <Footer></Footer>

    </>

    
    


  )
}
