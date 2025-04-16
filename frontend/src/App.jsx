import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Counter from './components/counter/counter.jsx';
import SplashScreen from './pages/splashScreen/SplashScreen.jsx';
import LoginPage from './pages/loginPage/LoginPage.jsx';
import SignupPage from './pages/signupPage/SignupPage.jsx';

function App() {
  return (

    <Routes>
      <Route path="/" element={<SplashScreen />}></Route>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/signup' element={<SignupPage />}></Route>
    </Routes>
  );
}

export default App;
