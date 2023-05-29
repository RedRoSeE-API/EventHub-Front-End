import React from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./MainPages/MainPage";
import Events from "./MainPages/Events";
import PostAnEvent from "./MainPages/PostAnEvent";
import Login from "./MainPages/Login";
import Register from "./MainPages/Register";
import AboutUs from "./MainPages/AboutUs";
import AuthProvider from './AuthContext';
import SingleEvent from './MainPages/SingleEvent';
import SingleEventModified from './MainPages/SingleEventModified';
import MyPosts from './MainPages/MyPosts';
import MyPostsChange from './MainPages/MyPostsChange';
import ApprovePosts from './MainPages/ApprovePosts';


export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path = "/" element={<MainPage />}></Route>
          <Route path = "/events" element={<Events />}></Route>
          <Route path = "/postAnEvent" element={<PostAnEvent />}></Route>
          <Route path = "/login" element={<Login />}></Route>
          <Route path = "/register" element={<Register />}></Route>
          <Route path = "/aboutUs" element={<AboutUs />}></Route>
          <Route path = "/singleEvent" element={<SingleEvent />}></Route>
          <Route path = "/singleEventModified" element={<SingleEventModified />}></Route>
          <Route path = "/myPosts" element={<MyPosts />}></Route>
          <Route path = "/myPostsChange" element={<MyPostsChange />}></Route>
          <Route path = "/approvePosts" element={<ApprovePosts />}></Route>
        </Routes>
        </AuthProvider>
    </BrowserRouter>
  )
}
