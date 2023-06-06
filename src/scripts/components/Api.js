export class Api {
  constructor(apiConfig){
    this._initUrlApi = apiConfig.initUrlApi;
    this._authorization = apiConfig.headers.authorization;
    this._contentType = apiConfig.headers['Content-Type'];
  }

_answerHandle(serverAnswer){
  if (serverAnswer.ok) {
    return serverAnswer.json();
  }
  return Promise.reject(`Error: ${serverAnswer.status}`);
}


  getInitialCards() {
    return fetch(`${this._initUrlApi}/cards`,
      {
        headers: {
          authorization: this._authorization
        }
      }
    )
    .then(this._answerHandle)
    .then((initialCardArray)=>{
      return initialCardArray.reverse();
    });
  }

  getUserInfo(){
    return fetch(`${this._initUrlApi}/users/me`, {
        headers: {
          authorization: this._authorization
        }
      }
    )
    .then(this._answerHandle);
  }

  setUserInfo(name, about){
    return fetch(`${this._initUrlApi}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
      }
    )
    .then(this._answerHandle);
  }


  getInitCardsAndUserInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  setLike(cardId){
    return fetch(`${this._initUrlApi}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        }
      }
    )
    .then(this._answerHandle);
  }

  deleteLike(cardId){
    return fetch(`${this._initUrlApi}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        }
      }
    )
    .then(this._answerHandle);
  }

//---------------------

  setCard(name, link){
    return fetch(`${this._initUrlApi}/cards`,
      {
        method: 'POST',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          name: name,
          link: link
          }
        )
      }
    )
    .then(this._answerHandle);
  }

  deleteCard(cardId){
    return fetch(`${this._initUrlApi}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        }
      }
    )
    .then(this._answerHandle);
  }


  setAvatar(link){
    return fetch(`${this._initUrlApi}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          avatar: link
          }
        )
      }
    )
    .then(this._answerHandle);
  }


//---- j 4 fun
// getHarryPotter(){
//   return fetch(`https://hp-api.onrender.com/api/characters`,
//     {
//       headers: {
//       }
//     }
//   )
//   .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Error: ${res.status}`);
//     }
//   )
// }

// getCard(){
//   return fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=30`,
//     {
//       headers: {
//       }
//     }
//   )
//   .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Error: ${res.status}`);
//     }
//   )
// }
}
