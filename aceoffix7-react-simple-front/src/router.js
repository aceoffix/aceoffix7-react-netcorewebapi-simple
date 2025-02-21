import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App'; 
import ShowDoc from './pages/showDoc'; 
import React from 'react';

export default function IRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/showDoc" element={<ShowDoc />} />
                {/* <Route path="*" element={<NoMatch />} /> */}
            </Routes>
        </Router>
    );
}