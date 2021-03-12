class MainApi {
    constructor(optionsUrl) {
        this._url = optionsUrl;
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
            .then((res) => {
                if (res.ok) { return res.json(); }

                return Promise.reject(`Error happen ${res.status}`)
            })

    }

    tokenCheck = (token) => {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error ${res.status}`);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    register = (data) => {
        console.log(data);
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
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error ${res.status}`);
            })
            .catch((error) => {
                console.log(error);
            })
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
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error ${res.status}`);
            })
            .catch((error) => {
                console.log(error);
            })
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
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error ${res.status}`);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    delMovie = (movieId, jwt) => {
        return fetch(`${this._url}/movies/${movieId}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error ${res.status}`);
            })
            .catch((error) => {
                console.log(error);
            })
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
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error ${res.status}`);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    logout = (req, res) =>
        res.status(200).clearCookie('jwt').send({ message: 'Выход из приложенения выполнен' });

}

const mainApi = new MainApi(
    // url: "https://api.movies-kolenhen.students.nomoredomains.icu",
    'http://localhost:3001',

);

export default mainApi;