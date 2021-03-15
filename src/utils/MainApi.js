class MainApi {
    constructor(optionsUrl) {
        this._url = optionsUrl;
    }

    _handleResponse(res) {
        return new Promise((resolve, reject) => {
            const func = res.status < 400 ? resolve : reject;
            res.json().then(data => func(data))
          });
      }

    getInitialCards(token) {
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(this._handleResponse);

    }

    tokenCheck = (token) => {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then(this._handleResponse);
    };

    register = (data) => {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                name: data.name,
                password: data.password
            }),
        }).then(this._handleResponse);
    };

    login = (data) => {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: data.id,
                email: data.email,
                password: data.password
            }),
        }).then(this._handleResponse);
    };

    update = (data, jwt) => {
        return fetch(`${this._url}/users/me`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        }).then(this._handleResponse);
    }

    delMovie = (movieId, jwt) => {
        return fetch(`${this._url}/movies/${movieId}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        }).then(this._handleResponse);
    }

    addMovie = (data, jwt) => {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: +data.duration,
                year: +data.year,
                description: data.description,
                image: `https://api.nomoreparties.co${data.image.url}`,
                trailer: data.trailerLink,
                thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN
            })
        }).then(this._handleResponse);
    }
}

const mainApi = new MainApi(
    // url: "https://api.movies-kolenhen.students.nomoredomains.icu",
    'http://localhost:3001',

);

export default mainApi;