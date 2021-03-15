import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, useLocation, useHistory, Redirect } from 'react-router-dom';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {

  const history = useHistory();
  const location = useLocation();
  const [scrollPage, setScrollPage] = useState(0);
  const [isPreloader, setIsPreloader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [type, setType] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState('');
  const [lastKeyWord, setLastKeyWord] = useState('');
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


  const setError = useCallback((status) => {
    setIsOpen(true);
    setType(false);
    setErrorMessage(status.message);
  }, []);

  // register handler 
  function handleRegister(values) {
    mainApi.register(values)
      .then((res) => {
        if (res) {
          history.push('/sign-in');
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
      });
  }

  // login handler 

  function handleLogin(values) {
    mainApi.login(values)
      .then((data) => {
        if (data) {
          history.push('/movies');
        }
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          getUserData(data.token);
          setToken(data.token);
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
      });
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('lastKeyWord');
    setCurrentUser({
      isLoggedIn: null,
      name: '',
      email: '',
      id: '',
      savedMoviesCards: [],
    });
    history.push('/');
  }


  // edit user data handler 
  function handleUpdate(values) {
    const jwt = localStorage.getItem('jwt');
    mainApi.update(values, jwt)
      .then((res) => {
        if (res)
          setCurrentUser({
            ...currentUser,
            name: res.name,
            email: res.email,
          });

      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
      });
  }

  //handle like movie click 
  function likeMovieHandler(data) {
    const jwt = localStorage.getItem('jwt');
    (currentUser.savedMoviesCards.findIndex(item => item.movieId === data.movieId) === -1) &&
      mainApi.addMovie(data, jwt)
        .then((res) => {
          currentUser.savedMoviesCards.push(res);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
        });
  }

  function dislikeMovieHandler(data) {
    const id = data._id
      || currentUser.savedMoviesCards.find(item => item.movieId === data.id)._id;
    const jwt = localStorage.getItem('jwt');
    mainApi.delMovie(id, jwt)
      .then((res) => {
        currentUser.savedMoviesCards = currentUser.savedMoviesCards.filter((item) => item.movieId !== res.movieId);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
      });
  }

  //handle search movies form
  function handleSearch(cards, keyWord, isShort) {
    localStorage.setItem('lastKeyWord', keyWord);
    setLastKeyWord(keyWord);
    const tmpCards = [];
    isShort ? cards.forEach((item) => {
      item.nameRU.toLowerCase().includes(keyWord)
        && item.duration < 40
        && tmpCards.push(item);
    }) :
      cards.forEach((item) => {
        item.nameRU.toLowerCase().includes(keyWord) && tmpCards.push(item);
      })
    return tmpCards;
  }


  const getUserData = useCallback((tokenParam) => {
    setIsPreloader(true);
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
          setLastKeyWord(localStorage.getItem('lastKeyWord'));
        }
      })
      .catch((error) => {
        setCurrentUser({
          isLoggedIn: false,
          name: '',
          email: '',
          savedMoviesCards: [],
        })
        setError(error);
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }, [currentUser.id, setError])

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
    setLastKeyWord(localStorage.getItem('lastKeyWord'));
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
          <ProtectedRoute
            path="/movies"
            component={Movies}
            isLoggedIn={currentUser.isLoggedIn}
            currentUser={currentUser}
            lastKeyWord={lastKeyWord}
            handleSearch={handleSearch}
            likeMovieHandler={likeMovieHandler}
            dislikeMovieHandler={dislikeMovieHandler}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            isLoggedIn={currentUser.isLoggedIn}
            currentUser={currentUser}
            lastKeyWord={lastKeyWord}
            isPreloader={isPreloader}
            isOpen={isOpen}
            errorMessage={errorMessage}
            type={type}
            setIsOpen={setIsOpen}
            token={token}
            handleSearch={handleSearch}
            dislikeMovieHandler={dislikeMovieHandler}
            setCurrentUser={setCurrentUser}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            isLoggedIn={currentUser.isLoggedIn}
            currentUser={currentUser}
            handleUpdate={handleUpdate}
            handleLogout={handleLogout}
          />
`         <Route path="/sign-up">
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
          <Route exact path="/">
            {currentUser.isLoggedIn ? <Redirect to="/movies" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        {(location.pathname === '/'
          || location.pathname === '/movies'
          || location.pathname === '/saved-movies')
          && <Footer />}
        {scrollPage > 200 && <button className="app__up-btn" onClick={() => { window.scrollTo({ top: 0 }) }}>&#8593;</button>}
        {isOpen && <ErrorsModal
          isOpen={isOpen}
          errorMessage={errorMessage}
          type={type}
          setIsOpen={setIsOpen}
        />}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
