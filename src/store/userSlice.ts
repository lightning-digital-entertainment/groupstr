import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Event } from "nostr-tools";

export interface UserState {
    users: { [key: string]: Event };
    loggedInPk: string | undefined;
}

const initialState: UserState = {
    users: {},
    loggedInPk: undefined,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<Event>) => {
            state.users[action.payload.pubkey] = action.payload;
        },
        login: (state, action: PayloadAction<string>) => {
            state.loggedInPk = action.payload;
        },
    },
});

export const { addUser, login } = userSlice.actions;

export default userSlice.reducer;
