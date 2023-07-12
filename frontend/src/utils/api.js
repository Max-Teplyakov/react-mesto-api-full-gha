export default class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  //получить список всех карточек в виде массива
  getInitialCards() {
    const jwt = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }).then((res) => this._getResponseData(res));
  }
  //добавить карточку
  addCard({ name, link }) {
    const jwt = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._getResponseData(res));
  }
  //удалить карточку
  deleteCard(_id) {
    const jwt = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }).then((res) => this._getResponseData(res));
  }
  //получить данные пользователя
  getUserData() {
    const jwt = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }).then((res) => this._getResponseData(res));
  }
  //заменить данные пользователя
  replaceUserData({ name, about }) {
    const jwt = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._getResponseData(res));
  }
  //заменить аватар
  repllaceAvatar(data) {
    const jwt = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._getResponseData(res));
  }

  //“залайкать” карточку (PUT)
  likeCard(_id) {
    const jwt = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }).then((res) => this._getResponseData(res));
  }
  //удалить лайк карточки (DELETE)
  deleteLikeCard(_id) {
    const jwt = localStorage.getItem('token');
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(_id, isLiked) {
    if (isLiked) {
      return this.deleteLikeCard(_id);
    }
    return this.likeCard(_id);
  }
}

export const api = new Api({
  baseUrl: "http://mestotmax.nomoredomains.work",
  });
