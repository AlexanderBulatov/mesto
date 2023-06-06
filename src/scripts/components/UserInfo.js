export class UserInfo {
  constructor({userNameSelector, userOccupationSelector, userAvatarSelector}){
    this._profileName = document.querySelector(userNameSelector);
    this._profileOccupation = document.querySelector(userOccupationSelector);
    this._avatar =  document.querySelector(userAvatarSelector)
  }

  // getUserInfo(){
  //   this._api.getUserInfo()
  //   .then((responseUserInfo) => {
  //         const userInfo = {
  //         name: responseUserInfo.name,
  //         occupation: responseUserInfo.about
  //       }
  //       console.log(userInfo);
  //       return userInfo;
  //     }
  //   );
  // }
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

  setAvatar(link){
    this._avatar.src = link;
  }
}
