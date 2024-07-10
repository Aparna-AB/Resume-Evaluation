import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'
import Footer from './components/Footer/footer.jsx';
import HomePage from './components/HomePage/homePage.jsx';
import { AddResume } from './components/addResume/addResume.jsx';
import { ViewAllResume } from './components/viewResume/viewResume.jsx';
import { UpdateResume } from './components/updateResume/updateResume.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< App />} />
        <Route path="/HomePage" element={< HomePage />} />
        <Route path="/footer" element={< Footer />} />
        <Route path="/resume/addResume" element={< AddResume />} />
        <Route path="/resume/viewAllREsume" element={< ViewAllResume />} />
        <Route path="/resume/updateResume" element={< UpdateResume />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
