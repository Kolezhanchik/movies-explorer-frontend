import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Api from '../../utils/Api';
import * as auth from '../../utils/auth';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import ErrorsModal from '../ErrorsModal/ErrorsModal';


function App() {

  const apiBM = new Api({
    url: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const apiMy = new Api({
    // url: "https://api.movies-kolenhen.students.nomoredomains.icu",
    url: 'http://localhost:3001',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
});

  const [token, setToken] = useState('');
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: null,
    name: '',
    email: '',
    id: '',
    savedMoviesCards: [],
  });


  const history = useHistory();
  const location = useLocation();
  const [scrollPage, setScrollPage] = useState(0);
  // const [cardsData, setCardsData] = useState([]);
  // const [savedCardsData, setSavedCardsData] = useState([]);

  // get movies from beatfilm-movies api
  // useEffect(() => {
  //   apiBM.getInitialCards()
  //   .then((res) => {
  //     setCardsData(res);
  //   })
  //   .catch((error) => { alert(error)})
  //   .finally(() =>{
  //     // history.push('/movies')
  //   });

  // }, [history])

  // get saved movies from own api

  // useEffect(() => {
  //   apiMy.getInitialCards('movies')
  //   .then((res) => {
  //     console.log(res);
  //     setSavedCardsData(res);
  //   })
  //   .catch((error) => { alert(error)})
  //   .finally(() =>{
  //     history.push('/saved-movies')
  //   });

  // }, [history])

  // scroll up button
  useEffect(() => {
    function handleScroll() {
      setScrollPage(window.pageYOffset);
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPage]);

  // register handler 

  function handleRegister(values) {
    auth.register(values)
      .then((res) => {
        if (res) {
          history.push('/sign-in');
        }
        else {
          alert('error registration happen');
        }
      })
  }

  // login handler 

  function handleLogin(values) {
    auth.login(values)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setToken(data.token);
          setCurrentUser({
            ...currentUser,
            name: data.name,
            email: data.email,
            id: data._id,
            isLoggedIn: true,
          });
          history.push('/movies');
        }
        else {
          alert('error authorization happen');
        }
      })
  }

  function handleLogout(values) {
    console.log('logout');
    auth.logout()
      .then((res) => {
        if (res.ok) {
          localStorage.removeItem('jwt');
          setCurrentUser({
            ...currentUser,
            isLoggedIn: false,
          });
          history.push('/');
        }
        else {
          alert('error logout happen');
        }
      })
  }


  // edit user data handler 
  function handleUpdate(values) {
    const jwt = localStorage.getItem('jwt');
    auth.update(values, jwt)
      .then((res) => {
        console.log(res);
      })
  }

  //handle like movie click 
  function likeMovieHandler(data) {
    const jwt = localStorage.getItem('jwt');
    // getUserData(jwt);
    auth.addMovie(data, jwt)
      .then((res) => {
        // console.log(res);
      })
  }

  function dislikeMovieHandler(data) {
    const jwt = localStorage.getItem('jwt');
    auth.delMovie(data._id, jwt)
      .then((res) => {
        // console.log(res);
      })
  }

  //handle search movies form
  function handleSearch(cards, keyWord, isShort) {
    const tmpCards = [];
    isShort ? cards.forEach((item) => {
      item.nameRU.toLowerCase().includes(keyWord) && item.duration < 60 && tmpCards.push(item);
    }) :
      cards.forEach((item) => {
        item.nameRU.toLowerCase().includes(keyWord) && tmpCards.push(item);
      })
    return tmpCards;
  }

  const handleTokenCheck = useCallback(() => {
    const token = localStorage.getItem('jwt');
    setToken(token);
    if (token) {
      getUserData(token);
    } else {
      setCurrentUser({
        isLoggedIn: false,
          name: '',
          email: '',
          savedMoviesCards: [],
      });
    }
  },
    [setCurrentUser]
  )

  const getUserData = (tokenParam) => {
    auth.tokenCheck(tokenParam)
      .then((userData) => {
        if (!!userData) {
          setCurrentUser({
            isLoggedIn: true,
            name: userData.name,
            email: userData.email,
            id: userData._id,
            savedMoviesCards: [],
          });
        }
      })
      .catch((err) => {
        setCurrentUser({
          isLoggedIn: false,
          name: '',
          email: '',
          savedMoviesCards: [],
        });
        console.error(err);
      });
  };
  
  useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);

  // useEffect(() => {    
  //   console.log(currentUser.isLoggedIn);
  //   if (currentUser.isLoggedIn ) getUserData(token);
  // }, [currentUser.isLoggedIn, token]);

  // useEffect(() => {
  //   function handleRefresh() {
  //     getUserData();
  //   }
  //   console.log(currentUser.isLoggedIn)
  //   window.addEventListener("DOMContentLoaded", handleRefresh);
  //   return () => window.removeEventListener("DOMContentLoaded", handleRefresh);
  // }, [currentUser.isLoggedIn]);


  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          location={location.pathname}
          isLoggedIn={currentUser.isLoggedIn}
        />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/movies">
            <Movies
              handleSearch={handleSearch}
              likeMovieHandler={likeMovieHandler}
              dislikeMovieHandler={dislikeMovieHandler}
              api={apiBM}
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies
            token = {token}
              handleSearch={handleSearch}
              dislikeMovieHandler={dislikeMovieHandler}
              api={apiMy}
            />
          </Route>
          <Route path="/profile">
            <Profile
              handleUpdate={handleUpdate}
              handleLogout={handleLogout}
            />
          </Route>
`       <Route path="/sign-up">
            <Register
              handleRegister={handleRegister}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              handleLogin={handleLogin}
            />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        {(location.pathname === '/'
          || location.pathname === '/movies'
          || location.pathname === '/saved-movies')
          && <Footer />}
        {scrollPage > 200 && <button className="app__up-btn" onClick={() => { window.scrollTo({ top: 0 }) }}>&#8593;</button>}
        <ErrorsModal />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
