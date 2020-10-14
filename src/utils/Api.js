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
            headers: this.headers
        })
    }

    sendUserInfo(newUserInfo) {
        return this._sendRequest(`/users/me`, {
            method: 'PATCH',
            headers: this.headers,
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
            headers: this.headers
        })
    }

    getCards() {
        return this._sendRequest(`/cards`, {
            method: 'GET',
            headers: this.headers
        })
    }

    addCard(card) {
        return this._sendRequest(`/cards`, {
            method: 'POST',
            body: JSON.stringify({
                name: card.name,
                link: card.link
            }),
            headers: this.headers
        })
    }

    changeLikeCardStatus(id, status) {
        return this._sendRequest(`/cards/likes/${id}`, {
            method: `${(status) ? `PUT` : `DELETE`}`,
            headers: this.headers
        })
    }

   

    deleteCard(id) {
        return this._sendRequest(`/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
    }
    
}

export const api = new Api(Option);