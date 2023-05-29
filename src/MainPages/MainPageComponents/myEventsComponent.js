import React from 'react'
import { useNavigate } from 'react-router-dom'

import "../../style/trendingEventComponent.css"

export default function MyEventsComponent({ props }) {

  const navigate = useNavigate()

  const goToSinglePage = () => {
    sessionStorage.setItem("itemIdForChange", props.id)
    navigate("/myPostsChange")
    window.scrollTo(0, 0)
  }

  return (
    <div className='trending-events-div-1' onClick={goToSinglePage}>

        <img className='trending-events-div-1-image' src={require(`../../uploads/${props.image_name}`)}></img>

        <div className='trending-events-div-1-text-div'>
            <h3 className='trending-events-div-1-name'>{props.title}</h3>
            <p className='trending-events-div-1-when'>{props.date_time.slice(0, -8).toLocaleString().replace('T', ' ')}</p>
            <p className='trending-events-div-1-where'>{props.place}</p>
        </div>
        <div className='trending-events-approved-div'>{props.approved === 1 ? <h3 className='trending-events-approved'>Approved</h3> : <h3>Not Approved</h3>}</div>
                
    </div>
  )


}
