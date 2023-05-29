import React, { useState, useEffect } from 'react'

import axios from 'axios';

import "../style/ApprovePosts.css"
import Header from "../HeaderAndFooter/Header"
import Footer from '../HeaderAndFooter/Footer';
import MyEventsComponentModified from './MainPageComponents/myEventsComponentModified'


export default function ApprovePosts() {


    const [postsInfo, setPostsInfo] = useState([]);
    const [approvedPostsInfo, setApprovedPostsInfo] = useState([]);
    const [waitApprovalePostsInfo, setWaitApprovalePostsInfo] = useState([]);
    const [waitApprovaleChangedPostsInfo, setWaitApprovaleChangedPostsInfo] = useState([]);

    const [postsInfoBoolean, setPostsInfoBoolean] = useState(false);
    const [approvedPostsInfoBoolean, setApprovedPostsInfoBoolean] = useState(false);
    const [waitApprovalePostsInfoBoolean, setWaitApprovalePostsInfoBoolean] = useState(false);
    const [waitApprovaleChangedPostsInfoBoolean, setWaitApprovaleChangedPostsInfoBoolean] = useState(false);



    useEffect(() => {
        getPostsInfo()
  
    }, [])
  
    const getPostsInfo = async () => {
        
        const res = await axios.get('http://localhost:3002/getAllPosts')
        console.log(res.data)
        console.log(res.data.length)
        
        const approved = res.data.filter(post => post.approved === 1)
        const waiting = res.data.filter(post => post.approved === 0 && post.changed !== 1)
        const changed = res.data.filter(post => post.approved === 0 && post.changed === 1)

        console.log(approved)
        console.log(waiting)

        setApprovedPostsInfo(approved)
        setWaitApprovalePostsInfo(waiting)
        setWaitApprovaleChangedPostsInfo(changed)
        setPostsInfo(res.data)

        if(waiting.length > 0){
            setWaitApprovalePostsInfoBoolean(true)
        }
        if(approved.length > 0){
            setApprovedPostsInfoBoolean(true)
        }
        if(changed.length > 0){
            setWaitApprovaleChangedPostsInfoBoolean(true)
        }
    }
  
  
  
    return (
      <>
  
        <Header></Header>
  
        
        <section className='main-content'>
  
  
          <div className='trending-div'>
  
            <div className='trending-h2-div'>
              <h2 className='trending-h2'>Approval Page</h2>
            </div>
  

            <div className='trending-h2-div-modified'>
              <h2 className='trending-h2-modified'>All Posts Waiting For Approval</h2>
            </div>

            <div className='trending-events-div'>
                {waitApprovalePostsInfoBoolean === true ?
                    waitApprovalePostsInfo?.map((post) => 
                        <MyEventsComponentModified props={post} key={post.id}/>
                    )

                    :

                    <div className='approval-no-items-div'><h1>No Posts For Approval yet</h1></div>
                }
            </div>



            <div className='trending-h2-div-modified'>
              <h2 className='trending-h2-modified'>All Approved Posts</h2>
            </div>

            <div className='trending-events-div'>
                {approvedPostsInfoBoolean === true ?
                    approvedPostsInfo?.map((post) => 
                        <MyEventsComponentModified props={post} key={post.id}/>
                    )

                    :

                    <div className='approval-no-items-div'><h1>No Approved Posts Yet</h1></div>
                }

            </div>

            <div className='trending-h2-div-modified'>
              <h2 className='trending-h2-modified'>All Changed Posts</h2>
            </div>

            <div className='trending-events-div'>
                {waitApprovaleChangedPostsInfoBoolean === true ?
                    waitApprovaleChangedPostsInfo?.map((post) => 
                        <MyEventsComponentModified props={post} key={post.id}/>
                    )

                    :

                    <div className='approval-no-items-div'><h1>No Approved Posts Yet</h1></div>
                }

            </div>




          </div>
        </section>
  
        <Footer></Footer>
  
      </>
  
  
    )
}
