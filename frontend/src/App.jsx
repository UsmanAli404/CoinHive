import React from 'react';
import {Routes, Route} from 'react-router-dom'
import SplashScreen from './pages/splashScreen/SplashScreen.jsx';
import LoginPage from './pages/loginPage/LoginPage.jsx';
import SignupPage from './pages/signupPage/SignupPage.jsx';
import OtpPage from './pages/otpPage/OtpPage.jsx';
import DashboardPage from './pages/dashboardPage/DashboardPage.jsx';

function App() {
  return (

    <Routes>
      <Route path="/" element={<SplashScreen />}></Route>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/signup' element={<SignupPage />}></Route>
      <Route path='/otpPage' element={<OtpPage />}></Route>
      <Route path='/dashboard' element={<DashboardPage />}></Route>
    </Routes>
  );
}

export default App;
