import { store } from "../store/store";
import { hydrateUserState } from "../store/userSlice";

export function hydrateStore() {
  const cachedUserState = localStorage.getItem('users');
  if (cachedUserState) {
    try {
      const parsedUserState = JSON.parse(cachedUserState);
      store.dispatch(hydrateUserState(parsedUserState))
    } catch(e) {
      console.log(e)
    }
  }
}