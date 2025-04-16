import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Counter from './components/counter/counter.jsx';
import SplashScreen from './pages/SplashScreen.jsx';

function App() {
  return (

    <Routes>
      <Route path="/" element={<SplashScreen></SplashScreen>}></Route>
    </Routes>
  );
}

export default App;
