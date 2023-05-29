import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import Header from "../HeaderAndFooter/Header";
import Footer from '../HeaderAndFooter/Footer';

import "../style/PostAnEvent.css"

import axios from 'axios';

export default function PostAnEvent() {

  const navigate = useNavigate();

  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState();
  const [email, setEmail] = useState('');
  const [date, setDate] = useState();
  const [place, setPlace] = useState('');

  const imageRef = useRef()



  useEffect(() => {
    checkIfUserIsLoggedIn()
    getUserEmail()

  }, [])


  const checkIfUserIsLoggedIn = () => {

    if(localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail")){

      if(localStorage.getItem("userEmail")){
        setEmail(localStorage.getItem("userEmail"))
      }else{
        setEmail(sessionStorage.getItem("userEmail"))
      }
      
    }else{
      navigate('/login');
    }


  }

  const getUserEmail = () => {
    setEmail(localStorage.getItem("userEmail") ? localStorage.getItem("userEmail") : sessionStorage.getItem("userEmail"))

    console.log(localStorage.getItem("userEmail"))
    console.log(sessionStorage.getItem("userEmail"))
  }

  const handleSubmit = async (event) => {
   
    event.preventDefault();

    console.log(email)
    console.log(text)


    var formData = new FormData()
    formData.append("image", image)
    formData.append("title", title)
    formData.append("text", text)
    formData.append("date", `${date}`)
    formData.append("place", place)
    formData.append("email", email)



    const config = {

      headers: {
          "Content-Type": "multipart/form-data"
      }

    }

    try{
      
          const res = await axios.post("http://localhost:3002/postImages", formData, config);
          console.log(res)
          navigate('/', {replace: true})

    }catch(err){
      console.log(err)
      alert("You have to fill all fields in the form!")

    }

  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleChangeText = (e) => {

    setText(e.target.value)
  }

  const handleChangeImage = (e) => {
    console.log(imageRef.current)
    imageRef.current.src = URL.createObjectURL(e.target.files[0]);
    setImage(e.target.files[0])
  }

  const handleChangeDate = (e) => {
    console.log(e.target.value)
    setDate(e.target.value)
  }

  const handleChangePlace = (e) => {
    setPlace(e.target.value)
  }


  return (
    <>

      <Header></Header>
      

      <section className='main-PostAnEvent-section'>
        <div className='post-an-event-h2-div'>
          <h2 className='post-an-event-h2'>Post A New Event</h2>
        </div>
        

        <form className='form' onSubmit={handleSubmit}>

          <div className='title-form-div input'>
            <label className='title-form-input-label'>Title:</label>
            <input type="text" name='title' className='title-form-input' value={title} onChange={handleChangeTitle}></input>
          </div>

          <div className='text-form-div input'>
            <label className='text-form-input-label'>Description:</label>
            <textarea rows={30} name='text' className='text-form-input' onChange={handleChangeText}></textarea>
          </div>

          <div className='image-form-div input'>
            <label className='image-form-input-label'>Cover Photo:</label>
            <input type="file" name='image' className='image-form-input' onChange={handleChangeImage}></input>
            
            <div className='image-form-div-display-image'>
              <h1 className='image-form-h1-unloaded'>No file choosen</h1>
              <img className='image-form-image-display' ref={imageRef}/>
            </div>
          </div>

          <div className='date-form-div input'>
            <label className='date-form-input-label'>When:</label>
            <input type="datetime-local" name='date' className='date-form-input' onChange={handleChangeDate}></input>
          </div>

          <div className='place-form-div input'>
            <label className='place-form-input-label'>Where:</label>
            <input type="text" name='place' className='place-form-input' onChange={handleChangePlace}></input>
          </div>

          <div className='button-form-div'>
            <button type="submit" className='form-button'>Submit</button>
          </div>

        </form>
      </section>

      <Footer></Footer>


    </>





  )

}
