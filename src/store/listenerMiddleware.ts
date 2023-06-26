import {
    TypedStartListening,
    createListenerMiddleware,
} from "@reduxjs/toolkit";
import { addUser } from "./userSlice";
import { AppDispatch, RootState } from "./store";

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startAppListening =
    listenerMiddleware.startListening as AppStartListening;


startAppListening({
    actionCreator: addUser,
    effect: (_action, listenerApi) => {
        const usersState = listenerApi.getState().user.users;
        localStorage.setItem('users', JSON.stringify(usersState));
    },
});
