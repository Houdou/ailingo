import { atom } from "recoil";
import { v4 as uuid } from "uuid";

const newUser = () => {
  return {
    id: uuid()
  }
}

const userState = atom({
  key: 'user',
  default: () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return newUser();
  }
})

export {
  userState
}