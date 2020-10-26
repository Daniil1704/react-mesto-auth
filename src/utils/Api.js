import { Option } from './utils.js';

export class Api {
    constructor(data) {
        this.apiUrl = data.apiUrl;
        this.headers = data.headers;
    }


    _sendRequest(path, parameter) {
        return fetch(`${this.apiUrl}${path}`, parameter)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else if (!res.ok) {
                    return Promise.reject(res.status);
                }
            })
    }

    getUserInfo() {
        return this._sendRequest(`/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
              },
        })
    }

    sendUserInfo(newUserInfo) {
        return this._sendRequest(`/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
              },
            body: JSON.stringify({
                name: newUserInfo.name,
                about: newUserInfo.about
            })
        })
    }

    sendUserAvatar(avatar) {
        return this._sendRequest(`/users/me/avatar`, {
            method: 'PATCH',
            body: JSON.stringify({ avatar: avatar.avatar }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
              },
        })
    }

    getCards() {
        return this._sendRequest(`/cards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
              },
        })
    }

    addCard(card) {
        return this._sendRequest(`/cards`, {
            method: 'POST',
            body: JSON.stringify({
                name: card.name,
                link: card.link
            }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
              },
        })
    }

    changeLikeCardStatus(id, status) {
        return this._sendRequest(`/cards/likes/${id}`, {
            method: `${(status) ? `PUT` : `DELETE`}`,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
              },
        })
    }

   

    deleteCard(id) {
        return this._sendRequest(`/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
              },
        })
    }
    
}

export const api = new Api(Option);