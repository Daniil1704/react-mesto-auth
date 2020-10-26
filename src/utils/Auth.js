import { apiUrlAuth } from './utils';

export const register = (email, password) => {
    return fetch(`${apiUrlAuth}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, email })
    })
      .then((res) => {
          if (res.ok) {
              return res.json();
          }
          else {
              return Promise.reject(`Произошла ошибка: ${res.status}`);
          }
      });
};

export const authorize = (email, password) => {
    return fetch(`${apiUrlAuth}/signin`, {
        method: 'POST',
        headers: { 
            Accept: 'application/json',
            'Content-Type': 'application/json' 
          },
        body: JSON.stringify({ password, email })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Произошла ошибка: ${res.status}`);
        }
    })
    .then((data) => {
        localStorage.setItem('jwt', data.token);
        return data;
    })
    .catch((err) => {
        console.log(err.message);
    })
};

export const saveToken = (token) => {
    return fetch(`${apiUrlAuth}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
        return data;
    })
    .catch((err) => {
        console.log(err);
        return Promise.reject(`Ошибка: ${err.status}`);
    })
};