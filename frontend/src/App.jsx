import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SplashScreen from './pages/splashScreen/SplashScreen.jsx'
import LoginPage from './pages/loginPage/LoginPage.jsx'
import SignupPage from './pages/signupPage/SignupPage.jsx'
import OtpPage from './pages/otpPage/OtpPage.jsx'
import Dashboard from './pages/dashboardPage/DashboardPage.jsx'
import CoinDetailsPage from './pages/coinDetailsPage/CoinDetailsPage.jsx';

function App(){
    return (
        <Routes>
            <Route path='/' element={<SplashScreen />}/>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/signup' element={<SignupPage />}/>
            <Route path='/otpPage' element={<OtpPage />}/>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path="/coin/:id" element={<CoinDetailsPage/>}/>
        </Routes>
    )
}

export default App;