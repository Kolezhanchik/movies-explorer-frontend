import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();
  return (
    <div className="App">
      <Header
        location={location.pathname}
        isLoggedIn={isLoggedIn}
      />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile
            name='Виталий'
            email='pochta@yandex.ru'
            setIsLoggedIn={setIsLoggedIn}
          />
        </Route>
`       <Route path="/sign-up">
          <Register />
        </Route>
        <Route path="/sign-in">
          <Login />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      {(location.pathname === '/'
        || location.pathname === '/movies'
        || location.pathname === '/saved-movies')
        && <Footer />}
    </div>
  );
}

export default App;
