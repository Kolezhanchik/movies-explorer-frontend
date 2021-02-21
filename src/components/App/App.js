import React from 'react';
import Header from '../Header/Header';
// import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import './App.css';

function App() {
const isLoggedIn = true;
  return (
    <div className="App">
      <Header      
      isLoggedIn = {isLoggedIn}
      />
       {/* <Main/> */}
      <Movies/>
       <Footer/>
    </div>
  );
}

export default App;
