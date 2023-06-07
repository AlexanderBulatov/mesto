export class UserInfo {
  constructor({userNameSelector, userOccupationSelector, userAvatarSelector}){
    this._profileName = document.querySelector(userNameSelector);
    this._profileOccupation = document.querySelector(userOccupationSelector);
    this._avatar =  document.querySelector(userAvatarSelector)
  }

  getUserInfo(){
    const userInfo = {
      name: this._profileName.textContent,
      occupation: this._profileOccupation.textContent
    };
    return userInfo;
  }

  getAvatarLink(){
    return this._avatar.src;
  }

  setUserInfo(name, occupation){
    this._profileName.textContent = name;
    this._profileOccupation.textContent = occupation;
  }

  setAvatar(link){
    this._avatar.src = link;
  }
}
