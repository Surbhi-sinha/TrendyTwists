// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/> 
          {/* we want here the category to be dynamic and connected to the navigation which needs a react router set up */}
        
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<News pageSize = {6} country="in" category="health"/>}/>
              <Route path="/business" element={<News pageSize = {6} country="in" category="business"/>}/>
              <Route path="/entertainment" element={<News pageSize = {6} country="in" category="entertainment"/>}/>
              <Route path="/general" element={<News pageSize = {6} country="in" category="general"/>}/>
              <Route path="/health" element={<News pageSize = {6} country="in" category="health"/>}/>
              <Route path="/science" element={<News pageSize = {6} country="in" category="science"/>}/>
              <Route path="/sports" element={<News pageSize = {6} country="in" category="sports"/>}/>
              <Route path="/technology" element={<News pageSize = {6} country="in" category="technology"/>}/>

            </Routes>
          </BrowserRouter>

      </div>
    )
  }
}



