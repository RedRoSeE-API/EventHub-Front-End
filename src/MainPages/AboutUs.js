import React from 'react'

import "../style/AboutUs.css"
import Header from "../HeaderAndFooter/Header"
import Footer from '../HeaderAndFooter/Footer';
import pich from '../images/pich.jpeg'
import raketa from '../images/raketa.jpeg'
import stolove from '../images/stolove.jpeg'

export default function AboutUs() {
  return (
    <>

      <Header/>

        <div className='main-AboutUs-div'>
          
          <p className='welcome-text welcome-text-animation'>
            <span>Welcome </span>
            <span>to </span>
            <span>our </span>
            <span>event </span>
            <span>announcement </span>
            <span>website!</span>
          </p>

          <div className='about-us-div-1'>
            <p className='p-1'> We are dedicated to promoting and advertising events in the area, providing a streamlined and convenient platform for event organizers to share their upcoming <span className='purple-text'>EVENTS</span> and for attendees to find all the relevant information they need.</p>
            <img src={pich} alt="pich" className='image-1'/>
          </div>

          <div className='about-us-div-2'>
            <p className='p-2'>Our website is designed to make it <span className='purple-text'>EASY</span> for visitors to browse through the calendar of events, select the events they're interested in attending, and access all the necessary information related to the event.</p>
            <img src={stolove} alt="stolove" className='image-2'/>
          </div>

          <div className='about-us-div-3'>
            <p className='p-3'>We are committed to delivering a high-quality event announcement service and promoting events that appeal to a wide variety of <span className='purple-text'>INTERESTS</span>. Our website is constantly updated with new and exciting events, so be sure to check back frequently to stay up-to-date on what's happening in the area.</p>
          </div>

          <div className='about-us-div-4'>
            <img src={raketa} alt="raketa" className='image-3'/>
            <p className='p-4'>Thank you for choosing our event announcement website as your go-to resource for all things events. We look forward to helping you plan your next event <span className='purple-text'>EXPERIENCE!</span></p>
          </div>



        
        </div>

      <Footer/>
    </>
  )
}
