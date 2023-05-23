export class UserInfo {
  constructor({userNameSelector, userOccupationSelector}){
    this._profileName = document.querySelector(userNameSelector);
    this._profileOccupation = document.querySelector(userOccupationSelector);
  }
  getUserInfo(){
    const userInfo = {
      name: this._profileName.textContent,
      occupation: this._profileOccupation.textContent
    };
    return userInfo;
  }

  setUserInfo(name, occupation){
     this._profileName.textContent = name;
    this._profileOccupation.textContent = occupation;
  }
}
