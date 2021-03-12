import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
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

  const history = useHistory();
  const location = useLocation();
  const [scrollPage, setScrollPage] = useState(0);
  const [token, setToken] = useState('');
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: null,
    name: '',
    email: '',
    id: '',
    savedMoviesCards: [],
  });

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
    mainApi.register(values)
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
    mainApi.login(values)
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
    mainApi.logout()
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
    mainApi.update(values, jwt)
      .then((res) => {
        console.log(res);
      })
  }

  //handle like movie click 
  function likeMovieHandler(data) {
    const jwt = localStorage.getItem('jwt');
    // getUserData(jwt);
    mainApi.addMovie(data, jwt)
      .then((res) => {
        currentUser.savedMoviesCards.push(res);
      })
  }

  function dislikeMovieHandler(data) {
    const id = data._id 
    || currentUser.savedMoviesCards.find(item => item.movieId === data.id)._id;
    const jwt = localStorage.getItem('jwt');
    mainApi.delMovie(id, jwt)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          savedMoviesCards:
            currentUser.savedMoviesCards.filter((item) => item.movieId !== res.movieId),
        });
      })
  }

  //handle search movies form
  function handleSearch(cards, keyWord, isShort) {
    const tmpCards = [];
    isShort ? cards.forEach((item) => {
      item.nameRU.toLowerCase().includes(keyWord) 
      && item.duration < 60 
      && tmpCards.push(item);
    }) :
      cards.forEach((item) => {
        item.nameRU.toLowerCase().includes(keyWord) && tmpCards.push(item);
      })
    return tmpCards;
  }


  const getUserData = useCallback((tokenParam) => {
    Promise.all([mainApi.tokenCheck(tokenParam), mainApi.getInitialCards(tokenParam)])
      .then(([userData, savedMovies]) => {
        if (!!userData && !!savedMovies) {
          setCurrentUser({
            isLoggedIn: true,
            name: userData.name,
            email: userData.email,
            id: userData._id,
            savedMoviesCards: savedMovies.filter((item) => item.owner === currentUser.id),
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
  }, [currentUser.id])

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
  }, [getUserData])

  useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);

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
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies
              token={token}
              handleSearch={handleSearch}
              dislikeMovieHandler={dislikeMovieHandler}
              setCurrentUser={setCurrentUser}
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
