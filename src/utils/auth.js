export const BASE_URL = 'https://api.kolenmov.students.nomoredomains.icu';
// export const BASE_URL = 'http://localhost:3001';

export const tokenCheck = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
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

export const register = (data) => {
    console.log(data);
    return fetch(`${BASE_URL}/signup`, {
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

export const login = (data) => {
    return fetch(`${BASE_URL}/signin`, {
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



export const update = (data, jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
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

export const delMovie = (movieId, jwt) => {
    return fetch(`${BASE_URL}/movies/${movieId}`, {
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

export const addMovie = (data, jwt) => {
    // console.log(
    //     typeof (data.country),
    //     typeof (data.director),
    //     typeof (+data.duration),
    //     typeof (+data.year),
    //     typeof (data.description),
    //     typeof (`https://api.nomoreparties.co${data.image.url}`),
    //     typeof (data.trailerLink),
    //     typeof (`https://api.nomoreparties.co${data.image.formats.thumbnail.url}`),
    //     typeof (userId),
    //     typeof (data.id),
    //     typeof (data.nameRU),
    //     typeof (data.nameEN));
    return fetch(`${BASE_URL}/movies`, {
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

export const logout = (req, res) =>
    res.status(200).clearCookie('jwt').send({ message: 'Выход из приложенения выполнен' });



//   const updateUser = (req, res, next) => {
//     const { name, email } = req.body;
//     user.findByIdAndUpdate(
//       req.user._id,
//       { name, email },
//       {
//         new: true,
//         runValidators: true,
//       },
//     )
//       .orFail(new NotFoundError('Нет пользователя с таким id'))
//       .then((userData) => res
//         .status(200)
//         .send(userData))
//       .catch(next);
//   };

// const getUser = (req, res, next) => {
//     const userId = req.user._id;
//     if (!userId || userId.length !== 24) throw new Error('Неправильный ID');
//     user.findById(userId)
//       .orFail(new NotFoundError('Нет пользователя с таким id'))
//       .then((userData) => res
//         .status(200)
//         .send(
//           {
//             email: userData.email,
//             name: userData.name,
//           },
//         ))
//       .catch(next);
//   };



//   const createUser = (req, res, next) => {
//     const { email, name, password } = req.body;
//     if (!password) throw new Unauthorized('Не правильный email и/или пароль');
//     bcrypt.hash(password, 10)
//       .then((hash) =>
//         user.create({ email, name, password: hash }))
//       .then((userData) => res
//         .status(200)
//         .send(userData))
//       .catch(next);
//   };

//   const loginUser = (req, res, next) => {
//     const { email, password } = req.body;
//     return user.findUserByCreds(email, password)
//       .then((userData) => {
//         const token =
//           jwt.sign({ _id: userData.userId },
//             NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
//             { expiresIn: '7d' })
//         res.status(200)
//           .send(token);
//       })
//       .catch(next);
//   };

//   const logoutUser = (req, res) =>
//     res.status(200).clearCookie('jwt').send({ message: 'Выход из приложенения выполнен' });

//   module.exports = { getUser, updateUser, createUser, loginUser, logoutUser };